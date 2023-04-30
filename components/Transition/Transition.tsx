import { useAppSelector } from "@/redux/hooks";
import { transitionVertexShader, transitionFragmentShader } from "@/utils/shaders";
import { useFBO } from "@react-three/drei";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { Mesh, ShaderMaterial, MathUtils, Scene as ThreeScene } from "three";

interface SceneProps {
  transition: MutableRefObject<boolean>;
}

const Scene: React.FC<SceneProps> = ({ transition }) => {
  const screenMesh = useRef<Mesh>(null!);
  const coverScene = new ThreeScene();
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const theme = useAppSelector((store) => store.theme);

  useFrame((state) => {
    const { gl, scene, camera } = state;
    gl.setRenderTarget(renderTargetA);
    gl.render(scene, camera);
    gl.setRenderTarget(renderTargetB);
    gl.render(coverScene, camera);
    const material = screenMesh.current.material as ShaderMaterial;
    material.uniforms.textureA.value = renderTargetA.texture;
    material.uniforms.textureB.value = renderTargetB.texture;
    material.uniforms.uProgress.value = MathUtils.lerp(
      material.uniforms.uProgress.value,
      transition.current ? 1.0 : -1.0,
      0.02
    );
    gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(
        <>
          <color attach="background" args={[theme.primaryColour]} />
        </>,
        coverScene
      )}
      <mesh ref={screenMesh}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          uniforms={{
            textureA: {
              value: null,
            },
            textureB: {
              value: null,
            },
            uProgress: {
              value: -1.0,
            },
          }}
          vertexShader={transitionVertexShader}
          fragmentShader={transitionFragmentShader}
        />
      </mesh>
    </>
  );
};

interface TransitionProps {
  transition: MutableRefObject<boolean>;
}

const Transition: React.FC<TransitionProps> = ({ transition }) => {
  return (
    <div className="w-full h-full fixed pointer-events-none z-40">
      <Canvas style={{ pointerEvents: "none" }} dpr={[1, 1]}>
        <Scene transition={transition} />
      </Canvas>
    </div>
  );
};

export default Transition;
