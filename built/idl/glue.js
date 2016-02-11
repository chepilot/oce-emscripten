
// Bindings utilities

function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare: function() {
    if (this.needed) {
      // clear the temps
      for (var i = 0; i < this.temps.length; i++) {
        Module['_free'](this.temps[i]);
      }
      this.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_free'](this.buffer);
      this.buffer = 0;
      this.size += this.needed;
      // clean up
      this.needed = 0;
    }
    if (!this.buffer) { // happens first time, or when we need to grow
      this.size += 128; // heuristic, avoid many small grow events
      this.buffer = Module['_malloc'](this.size);
      assert(this.buffer);
    }
    this.pos = 0;
  },
  alloc: function(array, view) {
    assert(this.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (this.pos + len >= this.size) {
      // we failed to allocate in the buffer, this time around :(
      assert(len > 0); // null terminator, at least
      this.needed += len;
      ret = Module['_malloc'](len);
      this.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = this.buffer + this.pos;
      this.pos += len;
    }
    var retShifted = ret;
    switch (bytes) {
      case 2: retShifted >>= 1; break;
      case 4: retShifted >>= 2; break;
      case 8: retShifted >>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[retShifted + i] = array[i];
    }
    return ret;
  },
};

function ensureString(value) {
  if (typeof value === 'string') return ensureCache.alloc(intArrayFromString(value), HEAP8);
  return value;
}
function ensureInt8(value) {
  if (typeof value === 'object') return ensureCache.alloc(value, HEAP8);
  return value;
}
function ensureInt16(value) {
  if (typeof value === 'object') return ensureCache.alloc(value, HEAP16);
  return value;
}
function ensureInt32(value) {
  if (typeof value === 'object') return ensureCache.alloc(value, HEAP32);
  return value;
}
function ensureFloat32(value) {
  if (typeof value === 'object') return ensureCache.alloc(value, HEAPF32);
  return value;
}
function ensureFloat64(value) {
  if (typeof value === 'object') return ensureCache.alloc(value, HEAPF64);
  return value;
}


// BRepBuilderAPI_MakeShape
function BRepBuilderAPI_MakeShape() { throw "cannot construct a BRepBuilderAPI_MakeShape, no constructor in IDL" }
BRepBuilderAPI_MakeShape.prototype = Object.create(WrapperObject.prototype);
BRepBuilderAPI_MakeShape.prototype.constructor = BRepBuilderAPI_MakeShape;
BRepBuilderAPI_MakeShape.prototype.__class__ = BRepBuilderAPI_MakeShape;
BRepBuilderAPI_MakeShape.__cache__ = {};
Module['BRepBuilderAPI_MakeShape'] = BRepBuilderAPI_MakeShape;

BRepBuilderAPI_MakeShape.prototype['Shape'] = BRepBuilderAPI_MakeShape.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_MakeShape_Shape_0(self), TopoDS_Shape);
};;

  BRepBuilderAPI_MakeShape.prototype['__destroy__'] = BRepBuilderAPI_MakeShape.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_MakeShape___destroy___0(self);
};
// BRepPrimAPI_MakeOneAxis
function BRepPrimAPI_MakeOneAxis() { throw "cannot construct a BRepPrimAPI_MakeOneAxis, no constructor in IDL" }
BRepPrimAPI_MakeOneAxis.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepPrimAPI_MakeOneAxis.prototype.constructor = BRepPrimAPI_MakeOneAxis;
BRepPrimAPI_MakeOneAxis.prototype.__class__ = BRepPrimAPI_MakeOneAxis;
BRepPrimAPI_MakeOneAxis.__cache__ = {};
Module['BRepPrimAPI_MakeOneAxis'] = BRepPrimAPI_MakeOneAxis;

BRepPrimAPI_MakeOneAxis.prototype['Build'] = BRepPrimAPI_MakeOneAxis.prototype.Build = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeOneAxis_Build_0(self);
};;

BRepPrimAPI_MakeOneAxis.prototype['Shape'] = BRepPrimAPI_MakeOneAxis.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakeOneAxis_Shape_0(self), TopoDS_Shape);
};;

  BRepPrimAPI_MakeOneAxis.prototype['__destroy__'] = BRepPrimAPI_MakeOneAxis.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeOneAxis___destroy___0(self);
};
// BRepPrim_Sphere
function BRepPrim_Sphere() { throw "cannot construct a BRepPrim_Sphere, no constructor in IDL" }
BRepPrim_Sphere.prototype = Object.create(WrapperObject.prototype);
BRepPrim_Sphere.prototype.constructor = BRepPrim_Sphere;
BRepPrim_Sphere.prototype.__class__ = BRepPrim_Sphere;
BRepPrim_Sphere.__cache__ = {};
Module['BRepPrim_Sphere'] = BRepPrim_Sphere;

  BRepPrim_Sphere.prototype['__destroy__'] = BRepPrim_Sphere.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrim_Sphere___destroy___0(self);
};
// BRepPrimAPI_MakeSphere
function BRepPrimAPI_MakeSphere(arg0, arg1, arg2, arg3) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg3 && typeof arg3 === 'object') arg3 = arg3.ptr;
  if (arg1 === undefined) { this.ptr = _emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_1(arg0); getCache(BRepPrimAPI_MakeSphere)[this.ptr] = this;return }
  if (arg2 === undefined) { this.ptr = _emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_2(arg0, arg1); getCache(BRepPrimAPI_MakeSphere)[this.ptr] = this;return }
  if (arg3 === undefined) { this.ptr = _emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_3(arg0, arg1, arg2); getCache(BRepPrimAPI_MakeSphere)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_4(arg0, arg1, arg2, arg3);
  getCache(BRepPrimAPI_MakeSphere)[this.ptr] = this;
};;
BRepPrimAPI_MakeSphere.prototype = Object.create(BRepPrimAPI_MakeOneAxis.prototype);
BRepPrimAPI_MakeSphere.prototype.constructor = BRepPrimAPI_MakeSphere;
BRepPrimAPI_MakeSphere.prototype.__class__ = BRepPrimAPI_MakeSphere;
BRepPrimAPI_MakeSphere.__cache__ = {};
Module['BRepPrimAPI_MakeSphere'] = BRepPrimAPI_MakeSphere;

BRepPrimAPI_MakeSphere.prototype['Sphere'] = BRepPrimAPI_MakeSphere.prototype.Sphere = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakeSphere_Sphere_0(self), BRepPrim_Sphere);
};;

BRepPrimAPI_MakeSphere.prototype['Shape'] = BRepPrimAPI_MakeSphere.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakeSphere_Shape_0(self), TopoDS_Shape);
};;

BRepPrimAPI_MakeSphere.prototype['Build'] = BRepPrimAPI_MakeSphere.prototype.Build = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeSphere_Build_0(self);
};;

  BRepPrimAPI_MakeSphere.prototype['__destroy__'] = BRepPrimAPI_MakeSphere.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeSphere___destroy___0(self);
};
// BRepGProp
function BRepGProp() { throw "cannot construct a BRepGProp, no constructor in IDL" }
BRepGProp.prototype = Object.create(WrapperObject.prototype);
BRepGProp.prototype.constructor = BRepGProp;
BRepGProp.prototype.__class__ = BRepGProp;
BRepGProp.__cache__ = {};
Module['BRepGProp'] = BRepGProp;

BRepGProp.prototype['VolumeProperties'] = BRepGProp.prototype.VolumeProperties = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_BRepGProp_VolumeProperties_2(self, arg0, arg1);
};;

  BRepGProp.prototype['__destroy__'] = BRepGProp.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepGProp___destroy___0(self);
};
// TopoDS_Shape
function TopoDS_Shape() { throw "cannot construct a TopoDS_Shape, no constructor in IDL" }
TopoDS_Shape.prototype = Object.create(WrapperObject.prototype);
TopoDS_Shape.prototype.constructor = TopoDS_Shape;
TopoDS_Shape.prototype.__class__ = TopoDS_Shape;
TopoDS_Shape.__cache__ = {};
Module['TopoDS_Shape'] = TopoDS_Shape;

  TopoDS_Shape.prototype['__destroy__'] = TopoDS_Shape.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS_Shape___destroy___0(self);
};
// Tesselator
function Tesselator(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_Tesselator_Tesselator_1(arg0);
  getCache(Tesselator)[this.ptr] = this;
};;
Tesselator.prototype = Object.create(WrapperObject.prototype);
Tesselator.prototype.constructor = Tesselator;
Tesselator.prototype.__class__ = Tesselator;
Tesselator.__cache__ = {};
Module['Tesselator'] = Tesselator;

Tesselator.prototype['ExportShapeToThreejs'] = Tesselator.prototype.ExportShapeToThreejs = function() {
  var self = this.ptr;
  return Pointer_stringify(_emscripten_bind_Tesselator_ExportShapeToThreejs_0(self));
};;

  Tesselator.prototype['__destroy__'] = Tesselator.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_Tesselator___destroy___0(self);
};
// GProp_GProps
function GProp_GProps() {
  this.ptr = _emscripten_bind_GProp_GProps_GProp_GProps_0();
  getCache(GProp_GProps)[this.ptr] = this;
};;
GProp_GProps.prototype = Object.create(WrapperObject.prototype);
GProp_GProps.prototype.constructor = GProp_GProps;
GProp_GProps.prototype.__class__ = GProp_GProps;
GProp_GProps.__cache__ = {};
Module['GProp_GProps'] = GProp_GProps;

GProp_GProps.prototype['Mass'] = GProp_GProps.prototype.Mass = function() {
  var self = this.ptr;
  return _emscripten_bind_GProp_GProps_Mass_0(self);
};;

  GProp_GProps.prototype['__destroy__'] = GProp_GProps.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GProp_GProps___destroy___0(self);
};
// BRepMesh_IncrementalMesh
function BRepMesh_IncrementalMesh(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_BRepMesh_IncrementalMesh_BRepMesh_IncrementalMesh_2(arg0, arg1);
  getCache(BRepMesh_IncrementalMesh)[this.ptr] = this;
};;
BRepMesh_IncrementalMesh.prototype = Object.create(WrapperObject.prototype);
BRepMesh_IncrementalMesh.prototype.constructor = BRepMesh_IncrementalMesh;
BRepMesh_IncrementalMesh.prototype.__class__ = BRepMesh_IncrementalMesh;
BRepMesh_IncrementalMesh.__cache__ = {};
Module['BRepMesh_IncrementalMesh'] = BRepMesh_IncrementalMesh;

  BRepMesh_IncrementalMesh.prototype['__destroy__'] = BRepMesh_IncrementalMesh.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepMesh_IncrementalMesh___destroy___0(self);
};
// VoidPtr
function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
(function() {
  function setupEnums() {
    
  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
