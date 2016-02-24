#!/usr/bin/python

import os, sys, re, json, shutil, multiprocessing
from subprocess import Popen, PIPE, STDOUT

# Definitions

INCLUDES = []

# Startup

exec(open(os.path.expanduser('~/.emscripten'), 'r').read())

try:
  EMSCRIPTEN_ROOT
except:
  print "ERROR: Missing EMSCRIPTEN_ROOT (which should be equal to emscripten's root dir) in ~/.emscripten"
  sys.exit(1)

sys.path.append(EMSCRIPTEN_ROOT)
import tools.shared as emscripten


emcc_args = sys.argv[1:] or '-O3 --llvm-lto 1 -s DISABLE_EXCEPTION_CATCHING=0 -s ELIMINATE_DUPLICATE_FUNCTIONS=1 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 -s NO_DYNAMIC_EXECUTION=1 --memory-init-file 0 -s NO_FILESYSTEM=1 -s NO_BROWSER=1 -s EXPORTED_RUNTIME_METHODS=[]'.split(' ')

# emcc_args = sys.argv[1:] or '-O3 --llvm-lto 1 -s DEMANGLE_SUPPORT=1 -s DISABLE_EXCEPTION_CATCHING=0 -s LINKABLE=1 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 -s NO_DYNAMIC_EXECUTION=1 --memory-init-file 0 -s NO_FILESYSTEM=1 -s NO_BROWSER=1 -s EXPORTED_RUNTIME_METHODS=[]'.split(' ')
# ELIMINATE_DUPLICATE_FUNCTIONS=1
# -s ASSERTIONS=2 for details in assertions

emcc_args += ['-s', 'TOTAL_MEMORY=%d' % (256*1024*1024)]

# emcc_args += ['-s', 'ALLOW_MEMORY_GROWTH=1']

emcc_args += '-s EXPORT_NAME="idlLib" -s MODULARIZE=1'.split(' ')

print
print '--------------------------------------------------'
print 'Building idl, build type:', emcc_args
print '--------------------------------------------------'
print

# Main
print
print '-------------- generate glue binary --------------'
print

# modify Standard_Integer.hxx to solve 'redefinition' error
args = ['-include../oce/inc/BRepPrimAPI_MakeSphere.hxx',
        '-include../oce/inc/BRepGProp.hxx',
        '-include../oce/inc/GProp_GProps.hxx',
        '-include../oce/src/BRepMesh/BRepMesh_IncrementalMesh.hxx',
        '-include./Tesselator.h',
        '-include../oce/inc/BRepFilletAPI_LocalOperation.hxx',
        '-include../oce/inc/GC_MakeArcOfCircle.hxx',
        '-include../oce/inc/BRepBuilderAPI_MakeFace.hxx',
        '-include../oce/inc/TopExp_Explorer.hxx',
        '-include../oce/inc/GC_MakeSegment.hxx',
        '-include../oce/inc/TopoDS.hxx',
        '-include../oce/inc/BRepBuilderAPI_MakeEdge.hxx',
        '-include../oce/inc/BRepPrimAPI_MakePrism.hxx',
        '-include../oce/inc/BRepBuilderAPI_Transform.hxx',
        '-include../oce/inc/BRepBuilderAPI_MakeWire.hxx',
        '-include../oce/inc/BRepFilletAPI_MakeFillet.hxx',
        '-include../oce/inc/BRepPrimAPI_MakeCylinder.hxx',
        '-include../oce/inc/BRepAlgoAPI_Fuse.hxx',
        '-include../oce/inc/gp_Lin.hxx',
        '-include../oce/inc/gp_Circ.hxx',
        '-include../oce/inc/gp_Elips.hxx',
        '-include../oce/inc/gp_Hypr.hxx',
        # '-include../oce/inc/',
        # '-include../oce/inc/',
        # '-include../oce/inc/',
        # '-include../oce/inc/',

        '-I../oce/inc',
        '-I../oce/src/Standard',
        '-I../oce/src/TopoDS',
        '-I../oce/src/TCollection',
        '-I../oce/src/TopLoc',
        '-I../oce/src/Brep',
        '-I../oce/src/gp',
        '-I../oce/src/Precision',
        '-I../oce/src/BrepPrim',
        '-I../oce/src/GC',
        '-I../oce/src/TopExp',
        '-I../oce/src/BRepSweep',
        '-I../oce/src/Sweep',
        '-I../oce/src/BRepTools',
        '-I../oce/src/ChFiDS',
		'-I../oce/src/math',

        '-I../oce/src/BRepMesh',
        '-I../oce/src/Bnd',
        '-I../oce/src/NCollection',
        '-I../oce/src/TopTools',
        '-I../oce/src/GCPnts',
        '-I../oce/src/StdPrs',
        '-c']

emscripten.Building.emcc('glue.cpp', args, 'glue.bc')
assert(os.path.exists('glue.bc'))


print
print '---------------- linking binary ------------------'
print

oce_libs = [
			# OCE MODEL
            '../binary/libTKBO.so',
            '../binary/libTKBool.so',
            '../binary/libTKBRep.so',
            '../binary/libTKernel.so',
            '../binary/libTKFeat.so',
            '../binary/libTKFillet.so',
            '../binary/libTKG2d.so',
            '../binary/libTKG3d.so',
            '../binary/libTKGeomAlgo.so',
            '../binary/libTKGeomBase.so',
            '../binary/libTKHLR.so',
            '../binary/libTKMath.so',
            '../binary/libTKMesh.so',
            '../binary/libTKOffset.so',
            '../binary/libTKPrim.so',
            '../binary/libTKShHealing.so',
            '../binary/libTKTopAlgo.so',
            #OCE TKV3D
            '../binary/libTKV3D.so',
            '../binary/libTKService.so'
            ]            
emscripten.Building.link(['glue.bc'] + oce_libs,'idl_combined.bc')
assert os.path.exists('idl_combined.bc')


print
print '------------------- generate js ------------------'
print

emscripten.Building.emcc('idl_combined.bc', emcc_args+[ '-include../oce/inc/BRepPrimAPI_MakeSphere.hxx',
													    '-include../oce/inc/BRepGProp.hxx',
													    '-include../oce/inc/GProp_GProps.hxx',
													    '-include../oce/src/BRepMesh/BRepMesh_IncrementalMesh.hxx',
														'-I../oce/inc/',
                                                        '-I../oce/src/Standard',
                                                        '-I../oce/src/gp',
                                                        '-I../oce/src/TopLoc',
                                                        '-I../oce/src/TopoDS',
                                                        '-I../oce/src/TopExp',
                                                        '-I../oce/src/TCollection',
                                                        '-I../oce/src/Bnd',
                                                        '-I../oce/src/StdPrs',
                                                        '-I../oce/src/BRepMesh',
                                                        '-I../oce/src/NCollection',
                                                        '-I../oce/src/TopTools',
                                                        '-I../oce/src/Precision',
                                                        '-I../oce/src/GCPnts',
                                                        '-I../oce/src/Poly',
                                                        '-I../oce/src/Brep',
                                                        '-I../oce/src/BrepPrim',
                                                        'Tesselator.cpp',
                                                        # 'my_glue_wrapper.cpp',
                                                        '--post-js',
                                                        'glue.js',
                                                        '--js-transform',
                                                        'python %s' % os.path.join('bundle.py')
                                                        ],
                                                        'oce.js')
#,'--js-transform','python %s' % os.path.join('bundle.py')        
#assert os.path.exists('idl_combined.bc'), 'Failed to create script code'

print
print '----------------------- wrap ---------------------'
print
wrapped = '''
// This is oce.js, a port of oce to JavaScript.
''' + open('oce.js').read() + '''
oce = idlLib();
'''

open('oce.js','w').write(wrapped);

print
print '----------------------- done ---------------------'
print







