import { Text, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Group, Color, Vector2 } from "three";
import { rand } from "@/utils/rand";
import { useAppSelector } from "@/redux/hooks";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import { GlitchMode, OverrideMaterialManager } from "postprocessing";

interface SceneProps {
  data?: string[];
}

const Scene: React.FC<SceneProps> = ({ data }) => {
  const orb = useRef<Mesh>(null!);
  const text = useRef<Group>(null!);
  const theme = useAppSelector((store) => store.theme);
  const [orbDetail, setOrbDetail] = useState(rand(1, 5));
  const [shouldGlitch, setShouldGlitch] = useState(false);
  OverrideMaterialManager.workaroundEnabled = true;

  useFrame((state) => {
    const { camera, mouse, clock } = state;
    text.current.position.x -= 0.005;
    camera.rotation.x += (mouse.y * 0.1 - camera.rotation.x) * 0.005;
    camera.rotation.y += (mouse.x * 0.1 - camera.rotation.y) * 0.005;
    orb.current.rotation.x -= (mouse.y * 0.1 - camera.rotation.x) * 0.2;
    orb.current.rotation.y -= (mouse.x * 0.1 - camera.rotation.y) * 0.2;
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
  });

  return (
    <>
      <Environment
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
        blur={1}
      />
      <EffectComposer>
        <Glitch
          strength={new Vector2(0.1, 0.5)}
          duration={new Vector2(0.05, 0.1)}
          columns={0.0001}
          mode={GlitchMode.CONSTANT_MILD}
          active={shouldGlitch}
        />
      </EffectComposer>
      <mesh ref={orb}>
        <octahedronGeometry args={[3, orbDetail]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          backside
          ior={1.3}
          backsideThickness={0.5}
          roughness={0.3}
          chromaticAberration={0.3}
          distortion={1.0}
          distortionScale={1.0}
          temporalDistortion={0.3}
          background={new Color(theme.primaryColour + "80")}
        />
      </mesh>
      <group ref={text} position={[-13, 0, 0]}>
        <Text
          font="/fonts/Raleway-Bold.ttf"
          color={theme.secondaryColour}
          position={[0, 1.3, 0]}
          anchorX="left"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, id. Laudantium, et commodi
          totam quos vel mollitia recusandae laborum eveniet perferendis? Expedita, suscipit
          repudiandae fuga maxime velit commodi! Nostrum, dignissimos.
        </Text>
        <Text
          font="/fonts/Raleway-Bold.ttf"
          color={theme.secondaryColour}
          position={[0, 0, 0]}
          anchorX="left"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nulla, totam, hic,
          repudiandae eius velit rerum harum voluptatibus nemo quibusdam adipisci voluptates! Quos
          repellendus labore iusto necessitatibus. Aspernatur, enim? Atque.
        </Text>
        <Text
          font="/fonts/Raleway-Bold.ttf"
          color={theme.secondaryColour}
          position={[0, -1.3, 0]}
          anchorX="left"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit laboriosam quis,
          consequatur maxime blanditiis commodi dolorem, voluptatibus provident, sunt quam eveniet
          harum reiciendis corporis incidunt atque at deleniti ratione modi.
        </Text>
      </group>
    </>
  );
};

export default Scene;
