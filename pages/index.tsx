import Scene from "@/components/Scene/Scene";
import { Canvas } from "@react-three/fiber";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <>
      <p className="absolute font-mono font-medium text-[0.7vmax] text-secondary top-4 right-6 z-30">
        {"// 01-INDEX"}
      </p>
      <div className="absolute top-0 w-[20%] h-full bg-gradient-to-r from-primary via-primary z-20 pointer-events-none" />
      <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
      <div className="absolute top-0 right-0 w-[20%] h-full bg-gradient-to-l from-primary via-primary z-20 pointer-events-none" />
    </>
  );
};

export default Index;
