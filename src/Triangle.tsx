import React from "react";
import {Point} from "./Types";
import * as THREE from "three";
import {BufferAttribute, BufferGeometry} from "three";

interface Props {
  pointA: Point,
  pointB: Point,
  pointC: Point
}

const Triangle = ({pointA, pointB, pointC}: Props) => {
  const geometry = new BufferGeometry();
  const vertices = new Float32Array([
    pointA.coordinateX, pointA.coordinateY, pointA.coordinateZ,
    pointB.coordinateX, pointB.coordinateY, pointB.coordinateZ,
    pointC.coordinateX, pointC.coordinateY, pointC.coordinateZ,
  ]);
  const faces = new Uint16Array([0, 1, 2]);

  geometry.setAttribute("position", new BufferAttribute(vertices, 3));
  geometry.setIndex(new BufferAttribute(faces, 1));

  return (
      <mesh>
        <primitive object={geometry} attach="geometry"/>
        <meshBasicMaterial attach="material" color="red" side={THREE.DoubleSide}/>
      </mesh>
  );
};
export default Triangle