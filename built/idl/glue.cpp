
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

// BRepBuilderAPI_ModifyShape

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_ModifyShape_Shape_0(BRepBuilderAPI_ModifyShape* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_ModifyShape___destroy___0(BRepBuilderAPI_ModifyShape* self) {
  delete self;
}

// BRepAlgoAPI_BooleanOperation

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepAlgoAPI_BooleanOperation_Shape_0(BRepAlgoAPI_BooleanOperation* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepAlgoAPI_BooleanOperation___destroy___0(BRepAlgoAPI_BooleanOperation* self) {
  delete self;
}

// BRepPrimAPI_MakeSweep

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSweep_Shape_0(BRepPrimAPI_MakeSweep* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeSweep___destroy___0(BRepPrimAPI_MakeSweep* self) {
  delete self;
}

// BRepFilletAPI_LocalOperation

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_LocalOperation_Shape_0(BRepFilletAPI_LocalOperation* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_LocalOperation___destroy___0(BRepFilletAPI_LocalOperation* self) {
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

// GC_MakeArcOfCircle

GC_MakeArcOfCircle* EMSCRIPTEN_KEEPALIVE emscripten_bind_GC_MakeArcOfCircle_GC_MakeArcOfCircle_3(gp_Pnt* arg0, gp_Pnt* arg1, gp_Pnt* arg2) {
  return new GC_MakeArcOfCircle(*arg0, *arg1, *arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GC_MakeArcOfCircle___destroy___0(GC_MakeArcOfCircle* self) {
  delete self;
}

// gp_Circ

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Circ___destroy___0(gp_Circ* self) {
  delete self;
}

// gp

const gp_Ax1* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_OX_0(gp* self) {
  return &self->OX();
}

const gp_Dir* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_DZ_0(gp* self) {
  return &self->DZ();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp___destroy___0(gp* self) {
  delete self;
}

// BRepBuilderAPI_MakeFace

BRepBuilderAPI_MakeFace* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeFace_BRepBuilderAPI_MakeFace_1(TopoDS_Wire* arg0) {
  return new BRepBuilderAPI_MakeFace(*arg0);
}

const TopoDS_Face* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeFace_Face_0(BRepBuilderAPI_MakeFace* self) {
  return &self->Face();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeFace___destroy___0(BRepBuilderAPI_MakeFace* self) {
  delete self;
}

// TopoDS_Face

TopoDS_Face* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Face_TopoDS_Face_0() {
  return new TopoDS_Face();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Face___destroy___0(TopoDS_Face* self) {
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

// gp_Pnt

gp_Pnt* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Pnt_gp_Pnt_3(double arg0, double arg1, double arg2) {
  return new gp_Pnt(arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Pnt___destroy___0(gp_Pnt* self) {
  delete self;
}

// gp_Trsf

gp_Trsf* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Trsf_gp_Trsf_0() {
  return new gp_Trsf();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Trsf_SetMirror_1(gp_Trsf* self, gp_Ax1* arg0) {
  self->SetMirror(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Trsf___destroy___0(gp_Trsf* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// gp_Vec

gp_Vec* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Vec_gp_Vec_3(double arg0, double arg1, double arg2) {
  return new gp_Vec(arg0, arg1, arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Vec___destroy___0(gp_Vec* self) {
  delete self;
}

// gp_Elips

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Elips___destroy___0(gp_Elips* self) {
  delete self;
}

// TopExp_Explorer

TopExp_Explorer* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopExp_Explorer_TopExp_Explorer_2(TopoDS_Shape* arg0, TopAbs_ShapeEnum arg1) {
  return new TopExp_Explorer(*arg0, arg1);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TopExp_Explorer_More_0(TopExp_Explorer* self) {
  return self->More();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopExp_Explorer_Next_0(TopExp_Explorer* self) {
  self->Next();
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopExp_Explorer_Current_0(TopExp_Explorer* self) {
  return &self->Current();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopExp_Explorer___destroy___0(TopExp_Explorer* self) {
  delete self;
}

// gp_Dir

gp_Dir* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Dir_gp_Dir_0() {
  return new gp_Dir();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Dir___destroy___0(gp_Dir* self) {
  delete self;
}

// GC_MakeSegment

GC_MakeSegment* EMSCRIPTEN_KEEPALIVE emscripten_bind_GC_MakeSegment_GC_MakeSegment_2(gp_Pnt* arg0, gp_Pnt* arg1) {
  return new GC_MakeSegment(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_GC_MakeSegment___destroy___0(GC_MakeSegment* self) {
  delete self;
}

// TopoDS

const TopoDS_Wire* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Wire_1(TopoDS* self, TopoDS_Shape* arg0) {
  return &self->Wire(*arg0);
}

const TopoDS_Edge* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Edge_1(TopoDS* self, TopoDS_Shape* arg0) {
  return &self->Edge(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS___destroy___0(TopoDS* self) {
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

TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Shape_TopoDS_Shape_0() {
  return new TopoDS_Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Shape___destroy___0(TopoDS_Shape* self) {
  delete self;
}

// gp_Ax2

gp_Ax2* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Ax2_gp_Ax2_0() {
  return new gp_Ax2();
}

gp_Ax2* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Ax2_gp_Ax2_2(gp_Pnt* arg0, gp_Dir* arg1) {
  return new gp_Ax2(*arg0, *arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Ax2___destroy___0(gp_Ax2* self) {
  delete self;
}

// gp_Ax1

gp_Ax1* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Ax1_gp_Ax1_0() {
  return new gp_Ax1();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Ax1___destroy___0(gp_Ax1* self) {
  delete self;
}

// TopoDS_Edge

TopoDS_Edge* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Edge_TopoDS_Edge_0() {
  return new TopoDS_Edge();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Edge___destroy___0(TopoDS_Edge* self) {
  delete self;
}

// gp_Hypr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Hypr___destroy___0(gp_Hypr* self) {
  delete self;
}

// BRepBuilderAPI_MakeEdge

BRepBuilderAPI_MakeEdge* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeEdge_BRepBuilderAPI_MakeEdge_2(gp_Pnt* arg0, gp_Pnt* arg1) {
  return new BRepBuilderAPI_MakeEdge(*arg0, *arg1);
}

const TopoDS_Edge* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeEdge_Edge_0(BRepBuilderAPI_MakeEdge* self) {
  return &self->Edge();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeEdge___destroy___0(BRepBuilderAPI_MakeEdge* self) {
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

// BRepPrimAPI_MakePrism

BRepPrimAPI_MakePrism* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakePrism_BRepPrimAPI_MakePrism_2(TopoDS_Shape* arg0, gp_Vec* arg1) {
  return new BRepPrimAPI_MakePrism(*arg0, *arg1);
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakePrism_Shape_0(BRepPrimAPI_MakePrism* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakePrism___destroy___0(BRepPrimAPI_MakePrism* self) {
  delete self;
}

// BRepBuilderAPI_Transform

BRepBuilderAPI_Transform* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_Transform_BRepBuilderAPI_Transform_2(TopoDS_Shape* arg0, gp_Trsf* arg1) {
  return new BRepBuilderAPI_Transform(*arg0, *arg1);
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_Transform_Shape_0(BRepBuilderAPI_Transform* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_Transform___destroy___0(BRepBuilderAPI_Transform* self) {
  delete self;
}

// BRepBuilderAPI_MakeWire

BRepBuilderAPI_MakeWire* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_0() {
  return new BRepBuilderAPI_MakeWire();
}

BRepBuilderAPI_MakeWire* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire_BRepBuilderAPI_MakeWire_3(TopoDS_Edge* arg0, TopoDS_Edge* arg1, TopoDS_Edge* arg2) {
  return new BRepBuilderAPI_MakeWire(*arg0, *arg1, *arg2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire_Add_1(BRepBuilderAPI_MakeWire* self, TopoDS_Wire* arg0) {
  self->Add(*arg0);
}

const TopoDS_Wire* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire_Wire_0(BRepBuilderAPI_MakeWire* self) {
  return &self->Wire();
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire_Shape_0(BRepBuilderAPI_MakeWire* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepBuilderAPI_MakeWire___destroy___0(BRepBuilderAPI_MakeWire* self) {
  delete self;
}

// TopoDS_Wire

TopoDS_Wire* EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Wire_TopoDS_Wire_0() {
  return new TopoDS_Wire();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TopoDS_Wire___destroy___0(TopoDS_Wire* self) {
  delete self;
}

// BRepFilletAPI_MakeFillet

BRepFilletAPI_MakeFillet* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_MakeFillet_BRepFilletAPI_MakeFillet_1(TopoDS_Shape* arg0) {
  return new BRepFilletAPI_MakeFillet(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_MakeFillet_Add_2(BRepFilletAPI_MakeFillet* self, double arg0, TopoDS_Edge* arg1) {
  self->Add(arg0, *arg1);
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_MakeFillet_Shape_0(BRepFilletAPI_MakeFillet* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepFilletAPI_MakeFillet___destroy___0(BRepFilletAPI_MakeFillet* self) {
  delete self;
}

// BRepMesh_IncrementalMesh

BRepMesh_IncrementalMesh* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepMesh_IncrementalMesh_BRepMesh_IncrementalMesh_2(TopoDS_Shape* arg0, double arg1) {
  return new BRepMesh_IncrementalMesh(*arg0, arg1);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepMesh_IncrementalMesh___destroy___0(BRepMesh_IncrementalMesh* self) {
  delete self;
}

// BRepPrimAPI_MakeCylinder

BRepPrimAPI_MakeCylinder* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeCylinder_BRepPrimAPI_MakeCylinder_3(gp_Ax2* arg0, double arg1, double arg2) {
  return new BRepPrimAPI_MakeCylinder(*arg0, arg1, arg2);
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeCylinder_Shape_0(BRepPrimAPI_MakeCylinder* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeCylinder_Build_0(BRepPrimAPI_MakeCylinder* self) {
  self->Build();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrimAPI_MakeCylinder___destroy___0(BRepPrimAPI_MakeCylinder* self) {
  delete self;
}

// BRepPrim_Sphere

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepPrim_Sphere___destroy___0(BRepPrim_Sphere* self) {
  delete self;
}

// BRepAlgoAPI_Fuse

BRepAlgoAPI_Fuse* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepAlgoAPI_Fuse_BRepAlgoAPI_Fuse_2(TopoDS_Shape* arg0, TopoDS_Shape* arg1) {
  return new BRepAlgoAPI_Fuse(*arg0, *arg1);
}

const TopoDS_Shape* EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepAlgoAPI_Fuse_Shape_0(BRepAlgoAPI_Fuse* self) {
  return &self->Shape();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_BRepAlgoAPI_Fuse___destroy___0(BRepAlgoAPI_Fuse* self) {
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

// gp_Lin

gp_Lin* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Lin_gp_Lin_0() {
  return new gp_Lin();
}

gp_Lin* EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Lin_gp_Lin_1(gp_Ax1* arg0) {
  return new gp_Lin(*arg0);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_gp_Lin___destroy___0(gp_Lin* self) {
  delete self;
}

// TopAbs_ShapeEnum
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_COMPOUND() {
  return TopAbs_COMPOUND;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_COMPSOLID() {
  return TopAbs_COMPSOLID;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_SOLID() {
  return TopAbs_SOLID;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_SHELL() {
  return TopAbs_SHELL;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_FACE() {
  return TopAbs_FACE;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_WIRE() {
  return TopAbs_WIRE;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_EDGE() {
  return TopAbs_EDGE;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_VERTEX() {
  return TopAbs_VERTEX;
}
TopAbs_ShapeEnum EMSCRIPTEN_KEEPALIVE emscripten_enum_TopAbs_ShapeEnum_TopAbs_SHAPE() {
  return TopAbs_SHAPE;
}

}

