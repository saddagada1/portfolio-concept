import { useFBO, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Mesh, Group, Vector2, Vector3, Color } from "three";
import { rand } from "@/utils/rand";
import { OverrideMaterialManager } from "postprocessing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

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

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.6 },
      uIorY: { value: 1.6 },
      uIorG: { value: 1.6 },
      uIorC: { value: 1.6 },
      uIorB: { value: 1.6 },
      uIorP: { value: 1.6 },
      uRefractPower: {
        value: 0.3,
      },
      uChromaticAberration: {
        value: 1.0,
      },
      uSaturation: { value: 1.08 },
      uShininess: { value: 40.0 },
      uDiffuseness: { value: 0.2 },
      uFresnelPower: { value: 6.0 },
      uLight: {
        value: new Vector3(-1.0, 1.0, 1.0),
      },
      winResolution: {
        value: new Vector2(window.innerWidth, window.innerHeight).multiplyScalar(
          Math.min(window.devicePixelRatio, 2)
        ),
      },
    }),
    []
  );

  useFrame((state) => {
    const { camera, mouse, clock } = state;
    text.current.position.x -= 0.005;
    camera.rotation.y += (mouse.x * 0.1 - camera.rotation.y) * 0.02;
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
      <mesh ref={orb}>
        <octahedronGeometry args={[3, orbDetail]} />
        <MeshTransmissionMaterial
          thickness={0.3}
          backside
          backsideThickness={0.3}
          roughness={0.3}
          chromaticAberration={0.3}
          distortionScale={0.5}
          temporalDistortion={0}
          background={new Color(theme.primaryColour)}
        />
      </mesh>
      <group ref={text} position={[-13, 0, 0]}>
        <Text
          font="/assets/fonts/Raleway-Bold.ttf"
          color={theme.secondaryColour}
          position={[0, 1.3, 0]}
          anchorX="left"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, id. Laudantium, et commodi
          totam quos vel mollitia recusandae laborum eveniet perferendis? Expedita, suscipit
          repudiandae fuga maxime velit commodi! Nostrum, dignissimos.
        </Text>
        <Text
          font="/assets/fonts/Raleway-Bold.ttf"
          color={theme.secondaryColour}
          position={[0, 0, 0]}
          anchorX="left"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nulla, totam, hic,
          repudiandae eius velit rerum harum voluptatibus nemo quibusdam adipisci voluptates! Quos
          repellendus labore iusto necessitatibus. Aspernatur, enim? Atque.
        </Text>
        <Text
          font="/assets/fonts/Raleway-Bold.ttf"
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
