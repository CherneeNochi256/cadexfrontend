import React, {useRef, useState} from 'react';
import Triangle from './Triangle';
import {ITriangle} from "./Types";
import {useFrame} from "@react-three/fiber";

interface Props {
  data: ITriangle[] | null
}

const Cone = ({data}: Props) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.z += delta))

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      meshRef.current.rotation.x += -0.01
    }
  });
  return (
      <mesh ref={meshRef}>
        {data?.map((triangle, index) => (
            <Triangle
                key={index}
                pointA={triangle.pointA}
                pointB={triangle.pointB}
                pointC={triangle.pointC}
            />
        ))}
      </mesh>
  );
};

export default Cone;