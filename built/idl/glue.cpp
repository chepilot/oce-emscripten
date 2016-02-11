#include <emscripten.h>
#include "Tesselator.h"

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM_INT({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// BRepBuilderAPI_MakeShape

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeShape_Shape_0(BRepBuilderAPI_MakeShape* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeShape___destroy___0(BRepBuilderAPI_MakeShape* self) {
  delete self;
}

// BRepPrimAPI_MakeOneAxis

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeOneAxis_Build_0(BRepPrimAPI_MakeOneAxis* self) {
  self->Build();
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeOneAxis_Shape_0(BRepPrimAPI_MakeOneAxis* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeOneAxis___destroy___0(BRepPrimAPI_MakeOneAxis* self) {
  delete self;
}

// BRepPrim_Sphere

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrim_Sphere___destroy___0(BRepPrim_Sphere* self) {
  delete self;
}

// BRepPrimAPI_MakeSphere

BRepPrimAPI_MakeSphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_1(double arg0) {
  return new BRepPrimAPI_MakeSphere(arg0);
}

BRepPrimAPI_MakeSphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_2(double arg0, double arg1) {
  return new BRepPrimAPI_MakeSphere(arg0, arg1);
}

BRepPrimAPI_MakeSphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_3(double arg0, double arg1, double arg2) {
  return new BRepPrimAPI_MakeSphere(arg0, arg1, arg2);
}

BRepPrimAPI_MakeSphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_BRepPrimAPI_MakeSphere_4(double arg0, double arg1, double arg2, double arg3) {
  return new BRepPrimAPI_MakeSphere(arg0, arg1, arg2, arg3);
}

BRepPrim_Sphere* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_Sphere_0(BRepPrimAPI_MakeSphere* self) {
  return &self->Sphere();
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_Shape_0(BRepPrimAPI_MakeSphere* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere_Build_0(BRepPrimAPI_MakeSphere* self) {
  self->Build();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSphere___destroy___0(BRepPrimAPI_MakeSphere* self) {
  delete self;
}

// BRepGProp

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepGProp_VolumeProperties_2(BRepGProp* self, TopoDS_Shape* arg0, GProp_GProps* arg1) {
  self->VolumeProperties(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepGProp___destroy___0(BRepGProp* self) {
  delete self;
}

// TopoDS_Shape

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Shape___destroy___0(TopoDS_Shape* self) {
  delete self;
}

// Tesselator

Tesselator* EMSCRIPTEN_KEEPALIVE emscripten_bind_Tesselator_Tesselator_1(TopoDS_Shape* arg0) {
  return new Tesselator(*arg0);
}

char* EMSCRIPTEN_KEEPALIVE emscripten_bind_Tesselator_ExportShapeToThreejs_0(Tesselator* self) {
  return self->ExportShapeToThreejs();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_Tesselator___destroy___0(Tesselator* self) {
  delete self;
}

// GProp_GProps

GProp_GProps* EMSCRIPTEN_KEEPALIVE emscripten_bind_GProp_GProps_GProp_GProps_0() {
  return new GProp_GProps();
}

double EMSCRIPTEN_KEEPALIVE emscripten_bind_GProp_GProps_Mass_0(GProp_GProps* self) {
  return self->Mass();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GProp_GProps___destroy___0(GProp_GProps* self) {
  delete self;
}

// BRepMesh_IncrementalMesh

BRepMesh_IncrementalMesh* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepMesh_IncrementalMesh_BRepMesh_IncrementalMesh_2(TopoDS_Shape* arg0, double arg1) {
  return new BRepMesh_IncrementalMesh(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepMesh_IncrementalMesh___destroy___0(BRepMesh_IncrementalMesh* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

}

