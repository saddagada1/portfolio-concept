import { Canvas } from "@react-three/fiber";
import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import {
  Text,
  MeshTransmissionMaterial,
  Environment,
  useFBO,
  Shadow,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Group, Vector2, MathUtils } from "three";
import { rand } from "@/utils/rand";
import { useAppSelector } from "@/redux/hooks";
import { ColorAverage, EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode, OverrideMaterialManager } from "postprocessing";
import { sleep } from "@/utils/sleep";

interface SceneProps {
  data: string;
}

const Scene: React.FC<SceneProps> = ({ data }) => {
  const orb = useRef<Mesh>(null!);
  const shadow = useRef<Mesh>(null!);
  const text = useRef<Group>(null!);
  const theme = useAppSelector((store) => store.theme);
  const [orbDetail, setOrbDetail] = useState(rand(1, 5));
  const [shouldGlitch, setShouldGlitch] = useState(false);
  const [hover, setHover] = useState(false);
  useCursor(hover, "pointer");
  const renderTarget = useFBO();
  OverrideMaterialManager.workaroundEnabled = true;

  useFrame((state) => {
    const { gl, scene, camera, pointer, clock } = state;
    text.current.visible = true;
    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);
    text.current.visible = false;
    orb.current.rotation.x = MathUtils.lerp(orb.current.rotation.x, pointer.y * 1.5, 0.02);
    orb.current.rotation.y = MathUtils.lerp(orb.current.rotation.y, pointer.x * 1.5, 0.02);
    orb.current.position.x = MathUtils.lerp(orb.current.position.x, 2 + pointer.x * 2, 0.02);
    orb.current.position.y = MathUtils.lerp(orb.current.position.y, pointer.y * 1.5, 0.02);
    shadow.current.position.x = MathUtils.lerp(
      shadow.current.position.x,
      2.5 + pointer.x * 2,
      0.02
    );
    shadow.current.scale.x = MathUtils.lerp(shadow.current.scale.x, 10 + pointer.y * 2, 0.02);
    text.current.position.y += 0.005;
    if (clock.elapsedTime % 1 > 0.99 && Math.round(clock.elapsedTime) % rand(5, 7) === 0) {
      setShouldGlitch(true);
      setTimeout(() => {
        const smooth = rand(1, 20);
        if (smooth === 20) {
          setOrbDetail(20);
        } else {
          setOrbDetail(rand(1, 5));
        }
        setShouldGlitch(false);
      }, 100 * rand(2, 4));
    }
    gl.setRenderTarget(null);
  });

  return (
    <>
      <color attach="background" args={[theme.primaryColour]} />
      {theme.mode === "Light" ? (
        <Environment files="/dancing_hall_1k.hdr" blur={1} />
      ) : (
        <Environment preset="apartment" blur={1} />
      )}
      <EffectComposer>
        <Glitch
          strength={new Vector2(0.1, 0.5)}
          duration={new Vector2(0.05, 0.1)}
          columns={0.0001}
          mode={GlitchMode.CONSTANT_MILD}
          active={shouldGlitch}
        />
        {theme.mode === "Dark" ? <ColorAverage /> : <></>}
      </EffectComposer>
      <mesh
        ref={orb}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[2, 0, 0]}
      >
        <octahedronGeometry args={[3.25, orbDetail]} />
        <MeshTransmissionMaterial
          buffer={renderTarget.texture}
          thickness={0.5}
          backside
          ior={1.3}
          backsideThickness={0.5}
          roughness={0.3}
          chromaticAberration={0.3}
          distortion={1.0}
          distortionScale={1.0}
          temporalDistortion={0.3}
        />
      </mesh>
      <Text
        position={[4, 5, 0]}
        ref={text}
        font="/fonts/Raleway-Bold.ttf"
        color={theme.secondaryColour}
        maxWidth={15}
        fontSize={0.9}
        anchorY="top"
      >
        {data}
      </Text>
      <Shadow
        ref={shadow}
        scale={[10, 3, 3]}
        position={[2.5, -5, 0]}
        opacity={theme.mode === "Light" ? 0.3 : 0.01}
        color={theme.secondaryColour}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  data: string;
}> = async () => {
  await sleep(1000);
  const selector = rand(1, 3);
  let data: string;
  if (selector === 1) {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/poe-${rand(1, 4)}.txt`),
      "utf-8"
    );
  } else if (selector === 2) {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/a-study-in-emerald-${rand(1, 4)}.txt`),
      "utf-8"
    );
  } else {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/the-double-${rand(1, 10)}.txt`),
      "utf-8"
    );
  }
  return { props: { data: data } };
};

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  return (
    <>
      <div className="w-1/3 absolute bottom-0 left-0 m-[3.5vmax] z-10 text-secondary">
        <h1 className="w-max group font-black uppercase text-[2vmax] flex selection:bg-secondary selection:text-primary cursor-default">
          <span className="italic text-transparent relative link will-change-transform before:content-['Saivamsi'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Saivamsi'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary group-hover:before:translate-x-[-10%]">
            Saivamsi
          </span>
          &nbsp;Addagada
        </h1>
        <p className="font-bold text-[1.25vmax] selection:bg-secondary selection:text-primary">
          [ Portfolio ]
        </p>
        <p className="font-mono font-semibold tracking-widest uppercase text-[0.75vmax] mt-[1vmax] selection:bg-secondary selection:text-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo iste
          ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti voluptatum
          maiores sunt culpa nulla. Velit!
        </p>
      </div>
      <div className="w-full h-full fixed">
        <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 1]}>
          <Scene data={data} />
        </Canvas>
      </div>
      <p
        className="absolute right-[1.25vmax] bottom-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 01 - Index"}
      </p>
    </>
  );
};

export default Index;
