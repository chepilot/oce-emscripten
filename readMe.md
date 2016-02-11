## one.js [Ported by Emscripten]

### Requirement:
1. oce 0.17.1
2. emscripten 1.35.0

### Build
1. Install emscripten 
2. Either use `emcmake cmake` or emscripten cmake toolchain to configure oce. Note that emscripten will not look for your <i>includes </i> and <i> libs</i> installed in your system root, instead, it will search for them in the emscripten root, since emscripten is cross-compiling. So in order to let emscripten find required <i>includes</i> and <i>libs</i>, you need to locate those manually and link them with cmake. Other than the oce Model module, Data Exchange Module and Visualisation Module are also needed.
3. `emmake make` to build oce. 

### Visualisation Module
 `Tesselator.h` and `Tesselator.cxx` provides functionality to export three.js compatible data from oce.  They are based on the visualisation module of Python OCC.

### WebIDL
A webIDL file allows to use oce functions/classes directly from javascript. The idl example in this repo only contains the interface for functionalities to generate a sphere, to measure its volume and to generate three.js compatible data for visualisation.

### Generate Javascript 
``` python path-to-emscripten/webidl_binder.py sphere.idl glue ```
Then run `make.py` to generate the javascript file, this script is modified based on the one from ammo.js.

### Testing
built/idl/oce.js contains some functionalities of oce.
Open oce.html and the js code below in the console:
```
var sphere = new oce.BRepPrimAPI_MakeSphere(2);
var prop = new oce.GProp_GProps();
sphere.Build()
oce.BRepGProp.prototype.VolumeProperties(sphere.Shape(),prop)
prop.Mass()
var tess = new oce.Tesselator(sphere.Shape())
var data = tess.ExportShapeToThreejs()
```
variable data will contain the three.js compatible data.