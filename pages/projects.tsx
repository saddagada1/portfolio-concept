import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { useAppSelector } from "@/redux/hooks";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import { MathUtils, Mesh, ShaderMaterial, Scene as ThreeScene } from "three";
import { NextPage } from "next";
import { MutableRefObject, useRef } from "react";
import { useAspect, useFBO, useVideoTexture } from "@react-three/drei";
import { transitionVertexShader, transitionFragmentShader } from "@/utils/shaders";

interface SceneProps {
  reveal: MutableRefObject<boolean>;
}

const Scene: React.FC<SceneProps> = ({ reveal }) => {
  const screenMesh = useRef<Mesh>(null!);
  const videoScene = new ThreeScene();
  const videoSize = useAspect(1920, 1080);
  const video = useVideoTexture("/stock.mp4");
  const renderTargetA = useFBO();
  const renderTargetB = useFBO();
  const theme = useAppSelector((store) => store.theme);

  useFrame((state) => {
    const { gl, scene, camera } = state;
    gl.setRenderTarget(renderTargetA);
    gl.render(scene, camera);
    gl.setRenderTarget(renderTargetB);
    gl.render(videoScene, camera);
    const material = screenMesh.current.material as ShaderMaterial;
    material.uniforms.textureA.value = renderTargetA.texture;
    material.uniforms.textureB.value = renderTargetB.texture;
    material.uniforms.uProgress.value = MathUtils.lerp(
      material.uniforms.uProgress.value,
      reveal.current ? 1.0 : -1.0,
      0.05
    );
    gl.setRenderTarget(null);
  });

  return (
    <>
      <color attach="background" args={[theme.primaryColour]} />
      {createPortal(
        <>
          <color attach="background" args={[theme.secondaryColour]} />
          <mesh scale={videoSize}>
            <planeGeometry />
            <meshBasicMaterial transparent opacity={0.75} map={video} toneMapped={false} />
          </mesh>
        </>,
        videoScene
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

const Project: React.FC = () => {
  const reveal = useRef<boolean>(false);
  return (
    <div
      onMouseEnter={() => (reveal.current = true)}
      onMouseLeave={() => (reveal.current = false)}
      className="w-full h-full cursor-pointer text-secondary relative"
    >
      <h2 className="absolute left-[1vmax] font-black uppercase text-[3vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none">
        Project
      </h2>
      <p
        className="absolute -scale-100 bottom-[1vmax] right-[0.25vmax] font-bold text-[2vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "mixed",
        }}
      >
        2023
      </p>
      <div className="absolute bottom-[2vmax] left-[2.5vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none">
        <p>Art Direction</p>
        <p>Motion Direction</p>
        <p>UI/UX Design</p>
        <p>Client Development</p>
        <p>Server Development</p>
      </div>
      <div className="arrow bg-secondary absolute w-1/6 aspect-square right-0 z-10 pointer-events-none" />
      <Canvas style={{ position: "absolute" }} dpr={[1, 1]} legacy>
        <Scene reveal={reveal} />
      </Canvas>
    </div>
  );
};

const Projects: NextPage = () => {
  return (
    <>
      <div className="w-full h-full pb-[3.5vmax] pr-[3.5vmax] pl-[2.75vmax]">
        <div className="w-full h-full flex flex-col relative rombus">
          <div className="flex-1 grid grid-rows-2 relative">
            <div className="bg-primary grid grid-cols-3 relative">
              <div className="relative">
                <Vr style={{ right: 0 }} />
                <Project />
              </div>
              <div className="relative">
                <Vr style={{ right: 0 }} />
                <Project />
              </div>
              <div className="relative">
                <Project />
              </div>
              <Hr style={{ bottom: 0 }} />
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-primary relative col-start-2 col-span-2 grid grid-cols-2">
                <div className="relative">
                  <Vr style={{ right: "100%" }} />
                  <Project />
                </div>
                <div className="relative">
                  <Vr style={{ right: "100%" }} />
                  <Project />
                </div>
                <Hr style={{ bottom: 0 }} />
              </div>
            </div>
            <Vr style={{ right: 0 }} />
          </div>
          <div className="grid grid-cols-3">
            <div className="relative col-span-2">
              <Hr style={{ bottom: 0 }} />
              <Vr style={{ right: 0 }} />
            </div>
            <div className="bg-primary text-secondary text-right relative pt-[1vmax] pl-[0.5vmax]">
              <h1 className="font-black uppercase text-[2vmax] selection:bg-secondary selection:text-primary">
                Projects
              </h1>
              <p className="font-bold text-[1.25vmax] selection:bg-secondary selection:text-primary">
                [ Selected ]
              </p>
              <p className="font-mono font-semibold tracking-widest uppercase text-[0.75vmax] mt-[1vmax] selection:bg-secondary selection:text-primary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo
                iste ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti
                voluptatum maiores sunt culpa nulla. Velit!
              </p>
            </div>
          </div>
          <Hr style={{ top: 0 }} />
          <Vr style={{ left: 0 }} />
        </div>
      </div>
      <p
        className="absolute -scale-100 left-[1.25vmax] top-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 02 - Projects"}
      </p>
    </>
  );
};

export default Projects;
