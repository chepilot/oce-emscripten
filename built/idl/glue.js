
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
// BRepBuilderAPI_ModifyShape
function BRepBuilderAPI_ModifyShape() { throw "cannot construct a BRepBuilderAPI_ModifyShape, no constructor in IDL" }
BRepBuilderAPI_ModifyShape.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepBuilderAPI_ModifyShape.prototype.constructor = BRepBuilderAPI_ModifyShape;
BRepBuilderAPI_ModifyShape.prototype.__class__ = BRepBuilderAPI_ModifyShape;
BRepBuilderAPI_ModifyShape.__cache__ = {};
Module['BRepBuilderAPI_ModifyShape'] = BRepBuilderAPI_ModifyShape;

BRepBuilderAPI_ModifyShape.prototype['Shape'] = BRepBuilderAPI_ModifyShape.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_ModifyShape_Shape_0(self), TopoDS_Shape);
};;

  BRepBuilderAPI_ModifyShape.prototype['__destroy__'] = BRepBuilderAPI_ModifyShape.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_ModifyShape___destroy___0(self);
};
// BRepAlgoAPI_BooleanOperation
function BRepAlgoAPI_BooleanOperation() { throw "cannot construct a BRepAlgoAPI_BooleanOperation, no constructor in IDL" }
BRepAlgoAPI_BooleanOperation.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepAlgoAPI_BooleanOperation.prototype.constructor = BRepAlgoAPI_BooleanOperation;
BRepAlgoAPI_BooleanOperation.prototype.__class__ = BRepAlgoAPI_BooleanOperation;
BRepAlgoAPI_BooleanOperation.__cache__ = {};
Module['BRepAlgoAPI_BooleanOperation'] = BRepAlgoAPI_BooleanOperation;

BRepAlgoAPI_BooleanOperation.prototype['Shape'] = BRepAlgoAPI_BooleanOperation.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepAlgoAPI_BooleanOperation_Shape_0(self), TopoDS_Shape);
};;

  BRepAlgoAPI_BooleanOperation.prototype['__destroy__'] = BRepAlgoAPI_BooleanOperation.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepAlgoAPI_BooleanOperation___destroy___0(self);
};
// BRepPrimAPI_MakeSweep
function BRepPrimAPI_MakeSweep() { throw "cannot construct a BRepPrimAPI_MakeSweep, no constructor in IDL" }
BRepPrimAPI_MakeSweep.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepPrimAPI_MakeSweep.prototype.constructor = BRepPrimAPI_MakeSweep;
BRepPrimAPI_MakeSweep.prototype.__class__ = BRepPrimAPI_MakeSweep;
BRepPrimAPI_MakeSweep.__cache__ = {};
Module['BRepPrimAPI_MakeSweep'] = BRepPrimAPI_MakeSweep;

BRepPrimAPI_MakeSweep.prototype['Shape'] = BRepPrimAPI_MakeSweep.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakeSweep_Shape_0(self), TopoDS_Shape);
};;

  BRepPrimAPI_MakeSweep.prototype['__destroy__'] = BRepPrimAPI_MakeSweep.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeSweep___destroy___0(self);
};
// BRepFilletAPI_LocalOperation
function BRepFilletAPI_LocalOperation() { throw "cannot construct a BRepFilletAPI_LocalOperation, no constructor in IDL" }
BRepFilletAPI_LocalOperation.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepFilletAPI_LocalOperation.prototype.constructor = BRepFilletAPI_LocalOperation;
BRepFilletAPI_LocalOperation.prototype.__class__ = BRepFilletAPI_LocalOperation;
BRepFilletAPI_LocalOperation.__cache__ = {};
Module['BRepFilletAPI_LocalOperation'] = BRepFilletAPI_LocalOperation;

BRepFilletAPI_LocalOperation.prototype['Shape'] = BRepFilletAPI_LocalOperation.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepFilletAPI_LocalOperation_Shape_0(self), TopoDS_Shape);
};;

  BRepFilletAPI_LocalOperation.prototype['__destroy__'] = BRepFilletAPI_LocalOperation.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepFilletAPI_LocalOperation___destroy___0(self);
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
// GC_MakeArcOfCircle
function GC_MakeArcOfCircle(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_GC_MakeArcOfCircle_GC_MakeArcOfCircle_3(arg0, arg1, arg2);
  getCache(GC_MakeArcOfCircle)[this.ptr] = this;
};;
GC_MakeArcOfCircle.prototype = Object.create(WrapperObject.prototype);
GC_MakeArcOfCircle.prototype.constructor = GC_MakeArcOfCircle;
GC_MakeArcOfCircle.prototype.__class__ = GC_MakeArcOfCircle;
GC_MakeArcOfCircle.__cache__ = {};
Module['GC_MakeArcOfCircle'] = GC_MakeArcOfCircle;

  GC_MakeArcOfCircle.prototype['__destroy__'] = GC_MakeArcOfCircle.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GC_MakeArcOfCircle___destroy___0(self);
};
// gp_Circ
function gp_Circ() { throw "cannot construct a gp_Circ, no constructor in IDL" }
gp_Circ.prototype = Object.create(WrapperObject.prototype);
gp_Circ.prototype.constructor = gp_Circ;
gp_Circ.prototype.__class__ = gp_Circ;
gp_Circ.__cache__ = {};
Module['gp_Circ'] = gp_Circ;

  gp_Circ.prototype['__destroy__'] = gp_Circ.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Circ___destroy___0(self);
};
// gp
function gp() { throw "cannot construct a gp, no constructor in IDL" }
gp.prototype = Object.create(WrapperObject.prototype);
gp.prototype.constructor = gp;
gp.prototype.__class__ = gp;
gp.__cache__ = {};
Module['gp'] = gp;

gp.prototype['OX'] = gp.prototype.OX = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gp_OX_0(self), gp_Ax1);
};;

gp.prototype['DZ'] = gp.prototype.DZ = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_gp_DZ_0(self), gp_Dir);
};;

  gp.prototype['__destroy__'] = gp.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp___destroy___0(self);
};
// BRepBuilderAPI_MakeFace
function BRepBuilderAPI_MakeFace(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_BRepBuilderAPI_MakeFace_BRepBuilderAPI_MakeFace_1(arg0);
  getCache(BRepBuilderAPI_MakeFace)[this.ptr] = this;
};;
BRepBuilderAPI_MakeFace.prototype = Object.create(WrapperObject.prototype);
BRepBuilderAPI_MakeFace.prototype.constructor = BRepBuilderAPI_MakeFace;
BRepBuilderAPI_MakeFace.prototype.__class__ = BRepBuilderAPI_MakeFace;
BRepBuilderAPI_MakeFace.__cache__ = {};
Module['BRepBuilderAPI_MakeFace'] = BRepBuilderAPI_MakeFace;

BRepBuilderAPI_MakeFace.prototype['Face'] = BRepBuilderAPI_MakeFace.prototype.Face = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_MakeFace_Face_0(self), TopoDS_Face);
};;

  BRepBuilderAPI_MakeFace.prototype['__destroy__'] = BRepBuilderAPI_MakeFace.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_MakeFace___destroy___0(self);
};
// TopoDS_Face
function TopoDS_Face() {
  this.ptr = _emscripten_bind_TopoDS_Face_TopoDS_Face_0();
  getCache(TopoDS_Face)[this.ptr] = this;
};;
TopoDS_Face.prototype = Object.create(WrapperObject.prototype);
TopoDS_Face.prototype.constructor = TopoDS_Face;
TopoDS_Face.prototype.__class__ = TopoDS_Face;
TopoDS_Face.__cache__ = {};
Module['TopoDS_Face'] = TopoDS_Face;

  TopoDS_Face.prototype['__destroy__'] = TopoDS_Face.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS_Face___destroy___0(self);
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
// gp_Pnt
function gp_Pnt(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_gp_Pnt_gp_Pnt_3(arg0, arg1, arg2);
  getCache(gp_Pnt)[this.ptr] = this;
};;
gp_Pnt.prototype = Object.create(WrapperObject.prototype);
gp_Pnt.prototype.constructor = gp_Pnt;
gp_Pnt.prototype.__class__ = gp_Pnt;
gp_Pnt.__cache__ = {};
Module['gp_Pnt'] = gp_Pnt;

  gp_Pnt.prototype['__destroy__'] = gp_Pnt.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Pnt___destroy___0(self);
};
// gp_Trsf
function gp_Trsf() {
  this.ptr = _emscripten_bind_gp_Trsf_gp_Trsf_0();
  getCache(gp_Trsf)[this.ptr] = this;
};;
gp_Trsf.prototype = Object.create(WrapperObject.prototype);
gp_Trsf.prototype.constructor = gp_Trsf;
gp_Trsf.prototype.__class__ = gp_Trsf;
gp_Trsf.__cache__ = {};
Module['gp_Trsf'] = gp_Trsf;

gp_Trsf.prototype['SetMirror'] = gp_Trsf.prototype.SetMirror = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_gp_Trsf_SetMirror_1(self, arg0);
};;

  gp_Trsf.prototype['__destroy__'] = gp_Trsf.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Trsf___destroy___0(self);
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
// gp_Vec
function gp_Vec(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_gp_Vec_gp_Vec_3(arg0, arg1, arg2);
  getCache(gp_Vec)[this.ptr] = this;
};;
gp_Vec.prototype = Object.create(WrapperObject.prototype);
gp_Vec.prototype.constructor = gp_Vec;
gp_Vec.prototype.__class__ = gp_Vec;
gp_Vec.__cache__ = {};
Module['gp_Vec'] = gp_Vec;

  gp_Vec.prototype['__destroy__'] = gp_Vec.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Vec___destroy___0(self);
};
// gp_Elips
function gp_Elips() { throw "cannot construct a gp_Elips, no constructor in IDL" }
gp_Elips.prototype = Object.create(WrapperObject.prototype);
gp_Elips.prototype.constructor = gp_Elips;
gp_Elips.prototype.__class__ = gp_Elips;
gp_Elips.__cache__ = {};
Module['gp_Elips'] = gp_Elips;

  gp_Elips.prototype['__destroy__'] = gp_Elips.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Elips___destroy___0(self);
};
// TopExp_Explorer
function TopExp_Explorer(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_TopExp_Explorer_TopExp_Explorer_2(arg0, arg1);
  getCache(TopExp_Explorer)[this.ptr] = this;
};;
TopExp_Explorer.prototype = Object.create(WrapperObject.prototype);
TopExp_Explorer.prototype.constructor = TopExp_Explorer;
TopExp_Explorer.prototype.__class__ = TopExp_Explorer;
TopExp_Explorer.__cache__ = {};
Module['TopExp_Explorer'] = TopExp_Explorer;

TopExp_Explorer.prototype['More'] = TopExp_Explorer.prototype.More = function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TopExp_Explorer_More_0(self));
};;

TopExp_Explorer.prototype['Next'] = TopExp_Explorer.prototype.Next = function() {
  var self = this.ptr;
  _emscripten_bind_TopExp_Explorer_Next_0(self);
};;

TopExp_Explorer.prototype['Current'] = TopExp_Explorer.prototype.Current = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_TopExp_Explorer_Current_0(self), TopoDS_Shape);
};;

  TopExp_Explorer.prototype['__destroy__'] = TopExp_Explorer.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopExp_Explorer___destroy___0(self);
};
// gp_Dir
function gp_Dir() {
  this.ptr = _emscripten_bind_gp_Dir_gp_Dir_0();
  getCache(gp_Dir)[this.ptr] = this;
};;
gp_Dir.prototype = Object.create(WrapperObject.prototype);
gp_Dir.prototype.constructor = gp_Dir;
gp_Dir.prototype.__class__ = gp_Dir;
gp_Dir.__cache__ = {};
Module['gp_Dir'] = gp_Dir;

  gp_Dir.prototype['__destroy__'] = gp_Dir.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Dir___destroy___0(self);
};
// GC_MakeSegment
function GC_MakeSegment(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_GC_MakeSegment_GC_MakeSegment_2(arg0, arg1);
  getCache(GC_MakeSegment)[this.ptr] = this;
};;
GC_MakeSegment.prototype = Object.create(WrapperObject.prototype);
GC_MakeSegment.prototype.constructor = GC_MakeSegment;
GC_MakeSegment.prototype.__class__ = GC_MakeSegment;
GC_MakeSegment.__cache__ = {};
Module['GC_MakeSegment'] = GC_MakeSegment;

  GC_MakeSegment.prototype['__destroy__'] = GC_MakeSegment.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_GC_MakeSegment___destroy___0(self);
};
// TopoDS
function TopoDS() { throw "cannot construct a TopoDS, no constructor in IDL" }
TopoDS.prototype = Object.create(WrapperObject.prototype);
TopoDS.prototype.constructor = TopoDS;
TopoDS.prototype.__class__ = TopoDS;
TopoDS.__cache__ = {};
Module['TopoDS'] = TopoDS;

TopoDS.prototype['Wire'] = TopoDS.prototype.Wire = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TopoDS_Wire_1(self, arg0), TopoDS_Wire);
};;

TopoDS.prototype['Edge'] = TopoDS.prototype.Edge = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  return wrapPointer(_emscripten_bind_TopoDS_Edge_1(self, arg0), TopoDS_Edge);
};;

  TopoDS.prototype['__destroy__'] = TopoDS.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS___destroy___0(self);
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
function TopoDS_Shape() {
  this.ptr = _emscripten_bind_TopoDS_Shape_TopoDS_Shape_0();
  getCache(TopoDS_Shape)[this.ptr] = this;
};;
TopoDS_Shape.prototype = Object.create(WrapperObject.prototype);
TopoDS_Shape.prototype.constructor = TopoDS_Shape;
TopoDS_Shape.prototype.__class__ = TopoDS_Shape;
TopoDS_Shape.__cache__ = {};
Module['TopoDS_Shape'] = TopoDS_Shape;

  TopoDS_Shape.prototype['__destroy__'] = TopoDS_Shape.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS_Shape___destroy___0(self);
};
// gp_Ax2
function gp_Ax2(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_gp_Ax2_gp_Ax2_0(); getCache(gp_Ax2)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_gp_Ax2_gp_Ax2_1(arg0); getCache(gp_Ax2)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_gp_Ax2_gp_Ax2_2(arg0, arg1);
  getCache(gp_Ax2)[this.ptr] = this;
};;
gp_Ax2.prototype = Object.create(WrapperObject.prototype);
gp_Ax2.prototype.constructor = gp_Ax2;
gp_Ax2.prototype.__class__ = gp_Ax2;
gp_Ax2.__cache__ = {};
Module['gp_Ax2'] = gp_Ax2;

  gp_Ax2.prototype['__destroy__'] = gp_Ax2.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Ax2___destroy___0(self);
};
// gp_Ax1
function gp_Ax1() {
  this.ptr = _emscripten_bind_gp_Ax1_gp_Ax1_0();
  getCache(gp_Ax1)[this.ptr] = this;
};;
gp_Ax1.prototype = Object.create(WrapperObject.prototype);
gp_Ax1.prototype.constructor = gp_Ax1;
gp_Ax1.prototype.__class__ = gp_Ax1;
gp_Ax1.__cache__ = {};
Module['gp_Ax1'] = gp_Ax1;

  gp_Ax1.prototype['__destroy__'] = gp_Ax1.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Ax1___destroy___0(self);
};
// TopoDS_Edge
function TopoDS_Edge() {
  this.ptr = _emscripten_bind_TopoDS_Edge_TopoDS_Edge_0();
  getCache(TopoDS_Edge)[this.ptr] = this;
};;
TopoDS_Edge.prototype = Object.create(WrapperObject.prototype);
TopoDS_Edge.prototype.constructor = TopoDS_Edge;
TopoDS_Edge.prototype.__class__ = TopoDS_Edge;
TopoDS_Edge.__cache__ = {};
Module['TopoDS_Edge'] = TopoDS_Edge;

  TopoDS_Edge.prototype['__destroy__'] = TopoDS_Edge.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS_Edge___destroy___0(self);
};
// gp_Hypr
function gp_Hypr() { throw "cannot construct a gp_Hypr, no constructor in IDL" }
gp_Hypr.prototype = Object.create(WrapperObject.prototype);
gp_Hypr.prototype.constructor = gp_Hypr;
gp_Hypr.prototype.__class__ = gp_Hypr;
gp_Hypr.__cache__ = {};
Module['gp_Hypr'] = gp_Hypr;

  gp_Hypr.prototype['__destroy__'] = gp_Hypr.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Hypr___destroy___0(self);
};
// BRepBuilderAPI_MakeEdge
function BRepBuilderAPI_MakeEdge(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_BRepBuilderAPI_MakeEdge_BRepBuilderAPI_MakeEdge_2(arg0, arg1);
  getCache(BRepBuilderAPI_MakeEdge)[this.ptr] = this;
};;
BRepBuilderAPI_MakeEdge.prototype = Object.create(WrapperObject.prototype);
BRepBuilderAPI_MakeEdge.prototype.constructor = BRepBuilderAPI_MakeEdge;
BRepBuilderAPI_MakeEdge.prototype.__class__ = BRepBuilderAPI_MakeEdge;
BRepBuilderAPI_MakeEdge.__cache__ = {};
Module['BRepBuilderAPI_MakeEdge'] = BRepBuilderAPI_MakeEdge;

BRepBuilderAPI_MakeEdge.prototype['Edge'] = BRepBuilderAPI_MakeEdge.prototype.Edge = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_MakeEdge_Edge_0(self), TopoDS_Edge);
};;

  BRepBuilderAPI_MakeEdge.prototype['__destroy__'] = BRepBuilderAPI_MakeEdge.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_MakeEdge___destroy___0(self);
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
// BRepPrimAPI_MakePrism
function BRepPrimAPI_MakePrism(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_BRepPrimAPI_MakePrism_BRepPrimAPI_MakePrism_2(arg0, arg1);
  getCache(BRepPrimAPI_MakePrism)[this.ptr] = this;
};;
BRepPrimAPI_MakePrism.prototype = Object.create(BRepPrimAPI_MakeSweep.prototype);
BRepPrimAPI_MakePrism.prototype.constructor = BRepPrimAPI_MakePrism;
BRepPrimAPI_MakePrism.prototype.__class__ = BRepPrimAPI_MakePrism;
BRepPrimAPI_MakePrism.__cache__ = {};
Module['BRepPrimAPI_MakePrism'] = BRepPrimAPI_MakePrism;

BRepPrimAPI_MakePrism.prototype['Shape'] = BRepPrimAPI_MakePrism.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakePrism_Shape_0(self), TopoDS_Shape);
};;

  BRepPrimAPI_MakePrism.prototype['__destroy__'] = BRepPrimAPI_MakePrism.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakePrism___destroy___0(self);
};
// BRepBuilderAPI_Transform
function BRepBuilderAPI_Transform(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_BRepBuilderAPI_Transform_BRepBuilderAPI_Transform_2(arg0, arg1);
  getCache(BRepBuilderAPI_Transform)[this.ptr] = this;
};;
BRepBuilderAPI_Transform.prototype = Object.create(BRepBuilderAPI_ModifyShape.prototype);
BRepBuilderAPI_Transform.prototype.constructor = BRepBuilderAPI_Transform;
BRepBuilderAPI_Transform.prototype.__class__ = BRepBuilderAPI_Transform;
BRepBuilderAPI_Transform.__cache__ = {};
Module['BRepBuilderAPI_Transform'] = BRepBuilderAPI_Transform;

BRepBuilderAPI_Transform.prototype['Shape'] = BRepBuilderAPI_Transform.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_Transform_Shape_0(self), TopoDS_Shape);
};;

  BRepBuilderAPI_Transform.prototype['__destroy__'] = BRepBuilderAPI_Transform.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_Transform___destroy___0(self);
};
// BRepBuilderAPI_MakeWire
function BRepBuilderAPI_MakeWire(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_0(); getCache(BRepBuilderAPI_MakeWire)[this.ptr] = this;return }
  if (arg1 === undefined) { this.ptr = _emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_1(arg0); getCache(BRepBuilderAPI_MakeWire)[this.ptr] = this;return }
  if (arg2 === undefined) { this.ptr = _emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_2(arg0, arg1); getCache(BRepBuilderAPI_MakeWire)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_3(arg0, arg1, arg2);
  getCache(BRepBuilderAPI_MakeWire)[this.ptr] = this;
};;
BRepBuilderAPI_MakeWire.prototype = Object.create(BRepBuilderAPI_MakeShape.prototype);
BRepBuilderAPI_MakeWire.prototype.constructor = BRepBuilderAPI_MakeWire;
BRepBuilderAPI_MakeWire.prototype.__class__ = BRepBuilderAPI_MakeWire;
BRepBuilderAPI_MakeWire.__cache__ = {};
Module['BRepBuilderAPI_MakeWire'] = BRepBuilderAPI_MakeWire;

BRepBuilderAPI_MakeWire.prototype['Add'] = BRepBuilderAPI_MakeWire.prototype.Add = function(arg0) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  _emscripten_bind_BRepBuilderAPI_MakeWire_Add_1(self, arg0);
};;

BRepBuilderAPI_MakeWire.prototype['Wire'] = BRepBuilderAPI_MakeWire.prototype.Wire = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_MakeWire_Wire_0(self), TopoDS_Wire);
};;

BRepBuilderAPI_MakeWire.prototype['Shape'] = BRepBuilderAPI_MakeWire.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepBuilderAPI_MakeWire_Shape_0(self), TopoDS_Shape);
};;

  BRepBuilderAPI_MakeWire.prototype['__destroy__'] = BRepBuilderAPI_MakeWire.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepBuilderAPI_MakeWire___destroy___0(self);
};
// TopoDS_Wire
function TopoDS_Wire() {
  this.ptr = _emscripten_bind_TopoDS_Wire_TopoDS_Wire_0();
  getCache(TopoDS_Wire)[this.ptr] = this;
};;
TopoDS_Wire.prototype = Object.create(WrapperObject.prototype);
TopoDS_Wire.prototype.constructor = TopoDS_Wire;
TopoDS_Wire.prototype.__class__ = TopoDS_Wire;
TopoDS_Wire.__cache__ = {};
Module['TopoDS_Wire'] = TopoDS_Wire;

  TopoDS_Wire.prototype['__destroy__'] = TopoDS_Wire.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_TopoDS_Wire___destroy___0(self);
};
// BRepFilletAPI_MakeFillet
function BRepFilletAPI_MakeFillet(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  this.ptr = _emscripten_bind_BRepFilletAPI_MakeFillet_BRepFilletAPI_MakeFillet_1(arg0);
  getCache(BRepFilletAPI_MakeFillet)[this.ptr] = this;
};;
BRepFilletAPI_MakeFillet.prototype = Object.create(BRepFilletAPI_LocalOperation.prototype);
BRepFilletAPI_MakeFillet.prototype.constructor = BRepFilletAPI_MakeFillet;
BRepFilletAPI_MakeFillet.prototype.__class__ = BRepFilletAPI_MakeFillet;
BRepFilletAPI_MakeFillet.__cache__ = {};
Module['BRepFilletAPI_MakeFillet'] = BRepFilletAPI_MakeFillet;

BRepFilletAPI_MakeFillet.prototype['Add'] = BRepFilletAPI_MakeFillet.prototype.Add = function(arg0, arg1) {
  var self = this.ptr;
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  _emscripten_bind_BRepFilletAPI_MakeFillet_Add_2(self, arg0, arg1);
};;

BRepFilletAPI_MakeFillet.prototype['Shape'] = BRepFilletAPI_MakeFillet.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepFilletAPI_MakeFillet_Shape_0(self), TopoDS_Shape);
};;

  BRepFilletAPI_MakeFillet.prototype['__destroy__'] = BRepFilletAPI_MakeFillet.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepFilletAPI_MakeFillet___destroy___0(self);
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
// BRepPrimAPI_MakeCylinder
function BRepPrimAPI_MakeCylinder(arg0, arg1, arg2) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  if (arg2 && typeof arg2 === 'object') arg2 = arg2.ptr;
  this.ptr = _emscripten_bind_BRepPrimAPI_MakeCylinder_BRepPrimAPI_MakeCylinder_3(arg0, arg1, arg2);
  getCache(BRepPrimAPI_MakeCylinder)[this.ptr] = this;
};;
BRepPrimAPI_MakeCylinder.prototype = Object.create(BRepPrimAPI_MakeOneAxis.prototype);
BRepPrimAPI_MakeCylinder.prototype.constructor = BRepPrimAPI_MakeCylinder;
BRepPrimAPI_MakeCylinder.prototype.__class__ = BRepPrimAPI_MakeCylinder;
BRepPrimAPI_MakeCylinder.__cache__ = {};
Module['BRepPrimAPI_MakeCylinder'] = BRepPrimAPI_MakeCylinder;

BRepPrimAPI_MakeCylinder.prototype['Shape'] = BRepPrimAPI_MakeCylinder.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepPrimAPI_MakeCylinder_Shape_0(self), TopoDS_Shape);
};;

BRepPrimAPI_MakeCylinder.prototype['Build'] = BRepPrimAPI_MakeCylinder.prototype.Build = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeCylinder_Build_0(self);
};;

  BRepPrimAPI_MakeCylinder.prototype['__destroy__'] = BRepPrimAPI_MakeCylinder.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepPrimAPI_MakeCylinder___destroy___0(self);
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
// BRepAlgoAPI_Fuse
function BRepAlgoAPI_Fuse(arg0, arg1) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg1 && typeof arg1 === 'object') arg1 = arg1.ptr;
  this.ptr = _emscripten_bind_BRepAlgoAPI_Fuse_BRepAlgoAPI_Fuse_2(arg0, arg1);
  getCache(BRepAlgoAPI_Fuse)[this.ptr] = this;
};;
BRepAlgoAPI_Fuse.prototype = Object.create(BRepAlgoAPI_BooleanOperation.prototype);
BRepAlgoAPI_Fuse.prototype.constructor = BRepAlgoAPI_Fuse;
BRepAlgoAPI_Fuse.prototype.__class__ = BRepAlgoAPI_Fuse;
BRepAlgoAPI_Fuse.__cache__ = {};
Module['BRepAlgoAPI_Fuse'] = BRepAlgoAPI_Fuse;

BRepAlgoAPI_Fuse.prototype['Shape'] = BRepAlgoAPI_Fuse.prototype.Shape = function() {
  var self = this.ptr;
  return wrapPointer(_emscripten_bind_BRepAlgoAPI_Fuse_Shape_0(self), TopoDS_Shape);
};;

  BRepAlgoAPI_Fuse.prototype['__destroy__'] = BRepAlgoAPI_Fuse.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_BRepAlgoAPI_Fuse___destroy___0(self);
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
// gp_Lin
function gp_Lin(arg0) {
  if (arg0 && typeof arg0 === 'object') arg0 = arg0.ptr;
  if (arg0 === undefined) { this.ptr = _emscripten_bind_gp_Lin_gp_Lin_0(); getCache(gp_Lin)[this.ptr] = this;return }
  this.ptr = _emscripten_bind_gp_Lin_gp_Lin_1(arg0);
  getCache(gp_Lin)[this.ptr] = this;
};;
gp_Lin.prototype = Object.create(WrapperObject.prototype);
gp_Lin.prototype.constructor = gp_Lin;
gp_Lin.prototype.__class__ = gp_Lin;
gp_Lin.__cache__ = {};
Module['gp_Lin'] = gp_Lin;

  gp_Lin.prototype['__destroy__'] = gp_Lin.prototype.__destroy__ = function() {
  var self = this.ptr;
  _emscripten_bind_gp_Lin___destroy___0(self);
};
(function() {
  function setupEnums() {
    

    // TopAbs_ShapeEnum

    Module['TopAbs_COMPOUND'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_COMPOUND();

    Module['TopAbs_COMPSOLID'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_COMPSOLID();

    Module['TopAbs_SOLID'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_SOLID();

    Module['TopAbs_SHELL'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_SHELL();

    Module['TopAbs_FACE'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_FACE();

    Module['TopAbs_WIRE'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_WIRE();

    Module['TopAbs_EDGE'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_EDGE();

    Module['TopAbs_VERTEX'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_VERTEX();

    Module['TopAbs_SHAPE'] = _emscripten_enum_TopAbs_ShapeEnum_TopAbs_SHAPE();

  }
  if (Module['calledRun']) setupEnums();
  else addOnPreMain(setupEnums);
})();
