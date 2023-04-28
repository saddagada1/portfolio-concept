import { Text, MeshTransmissionMaterial, Environment, useFBO, Shadow } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Group, Vector2, MathUtils } from "three";
import { rand } from "@/utils/rand";
import { useAppSelector } from "@/redux/hooks";
import { ColorAverage, EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode, OverrideMaterialManager } from "postprocessing";

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
  const renderTarget = useFBO();
  OverrideMaterialManager.workaroundEnabled = true;

  useFrame((state) => {
    const { gl, scene, camera, mouse, clock } = state;
    text.current.visible = true;
    gl.setRenderTarget(renderTarget);
    gl.render(scene, camera);
    text.current.visible = false;
    orb.current.rotation.x -= (mouse.y * 0.1 - camera.rotation.x) * 0.2;
    orb.current.rotation.y -= (mouse.x * 0.1 - camera.rotation.y) * 0.2;
    orb.current.position.x = MathUtils.lerp(orb.current.position.x, 2 + mouse.x * 2, 0.02);
    orb.current.position.y = MathUtils.lerp(orb.current.position.y, mouse.y * 1.5, 0.02);
    shadow.current.position.x = MathUtils.lerp(shadow.current.position.x, 2.5 + mouse.x * 2, 0.02);
    shadow.current.scale.x = MathUtils.lerp(shadow.current.scale.x, 10 + mouse.y * 2, 0.02);
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
      <mesh ref={orb} position={[2, 0, 0]}>
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

export default Scene;
