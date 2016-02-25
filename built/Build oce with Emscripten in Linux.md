### Build OCE with Emscripten in Linux

A ugly way to build, if you have a better solution, please make a pull request or contact me @ liruizenus@gmail.com.

#### Required Packages
Update Package Lists: `sudo apt-get update`
Install Gcc: `sudo apt-get install build-essential`
Install Cmake & Cmake GUI: `sudo apt-get install cmake cmake-gui`
Install Python: `sudo apt-get install python2.7`
Install Git: `sudo apt-get install git-core`
Install NodeJS: `sudo apt-get install nodejs`
Install Java: `sudo apt-get install default-jre`

Install Freetype: `sudo apt-get install libfreetype6-dev`
Install X11: `sudo apt-get install libx11-dev`
Install OpenGL `sudo apt-get install freeglut3 freeglut3-dev`

#### Emscripten
After download Emscripten, configure:
```
# Fetch the latest registry of available tools.
./emsdk update

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active"
./emsdk activate latest
```

#### Build Configure 
In terminal use `cmake-gui` to invoke cmake guy and then set source code directory and build directory.
Configure use with unix makefile, and select cross-compile with make toolchain file and set the make toolchain in the location of `../emsdk/emscripten/emscripten-version/cmake/Modules/Plateform/Emscripten.cmake`

When configure shows error `Can’t find Freetype.` 
Manually set the include and lib path for freetype
```
Include path: /usr/include/freetype2
lib path: /usr/lib/x86_64-linux-gnu/
```
When configure shows error `Can’t find X11.` 
Manually set the include and lib path for X11

```
Set X11_X11_LIB to /usr/lib/x86_64-linux-gnu
```
When configure shows error Can’t find GLU. An ugly hack is to comment out the code below in cmakelist.txt of oce
```
	if (NOT APPLE OR OCE_OSX_USE_COCOA)
		find_package(OpenGL REQUIRED)
		if(NOT ${OPENGL_GLU_FOUND} STREQUAL "YES")
			message( FATAL_ERROR "GLU not found" )
		endif(NOT ${OPENGL_GLU_FOUND} STREQUAL "YES")
	else (NOT APPLE OR OCE_OSX_USE_COCOA)
		set(OPENGL_INCLUDE_DIR /usr/X11R6/include/)
		set(OPENGL_LIBRARIES /usr/X11R6/lib/libGL.dylib /usr/X11R6/lib/libGLU.dylib)
	endif (NOT APPLE OR OCE_OSX_USE_COCOA)
```
#### Make
Make sure emscripten is in the path, run: ` source ./emsdk_env.sh ` in emscripten.
Run `emmake make` to make oce, note -j8 option may result in build failure and note that you building may fail at 99% in the process of building `oce_test`. Since `oce_test` won’t be used in later process, hope it would matter.
The error could be:

```
Linking CXX executable OCAFExport_test.js
WARNING:root:emcc: cannot find library "nul"
error: Linking globals named 'PLUGINFACTORY': symbol multiply defined!
Traceback (most recent call last):
  File "/home/parallels/Desktop/emsdk/emscripten/master/em++", line 13, in <module>
    emcc.run()
  File "/home/parallels/Desktop/emsdk/emscripten/master/emcc.py", line 1364, in run
    final = shared.Building.llvm_opt(final, link_opts, DEFAULT_FINAL)
  File "/home/parallels/Desktop/emsdk/emscripten/master/tools/shared.py", line 1488, in llvm_opt
    assert os.path.exists(target), 'Failed to run llvm optimizations: ' + output
AssertionError: Failed to run llvm optimizations: 
make[2]: *** [test/OCAFExport_test/OCAFExport_test.js] Error 1
make[1]: *** [test/OCAFExport_test/CMakeFiles/OCAFExport_test.dir/all] Error 2
make: *** [all] Error 2
``` 


