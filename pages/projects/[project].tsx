import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { useAppSelector } from "@/redux/hooks";
import { sleep } from "@/utils/sleep";
import { useAspect, useCursor, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ColorAverage,
  EffectComposer,
  HueSaturation,
  Pixelation,
} from "@react-three/postprocessing";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { MathUtils } from "three";

const Scene: React.FC = () => {
  const theme = useAppSelector((store) => store.theme);
  const [hover, setHover] = useState(false);
  const [granularity, setGranularity] = useState(20);
  const scale = useAspect(16, 9);
  const imageTexture = useTexture("/images/hendrix.jpg");
  useCursor(hover, "pointer");

  useFrame((state) => {
    if (hover) {
      if (granularity !== 0) {
        setGranularity((granularity) => MathUtils.lerp(granularity, 0, 0.1));
      }
    } else {
      if (granularity !== 15) {
        setGranularity((granularity) => MathUtils.lerp(granularity, 15, 0.1));
      }
    }
  });

  return (
    <>
      <EffectComposer>
        <Pixelation granularity={granularity} />
        <HueSaturation saturation={-0.75} />
        {theme.mode === "Dark" ? <ColorAverage /> : <></>}
      </EffectComposer>
      <mesh
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        scale={scale}
      >
        <planeGeometry />
        <meshBasicMaterial map={imageTexture} />
      </mesh>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = {
    remaster: { name: "remaster" },
    void: { name: "void" },
  };
  const paths = Object.keys(data).map((project) => {
    return { params: { project: project } };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  await sleep(1000);

  return { props: {} };
};

const Project: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-full flex flex-col pb-[2.75vmax] pr-[2.75vmax] pl-[1.25vmax] text-secondary selection:bg-secondary selection:text-primary">
        <div className="overflow-hidden">
          <div className="w-fit mb-[0.5vmax] font-semibold font-mono tracking-widest uppercase text-[0.75vmax] whitespace-nowrap marquee">
            <span>
              <span> - View Source Code</span>
              <span> - Download from App Store</span>
              <span> - Download from Play Store</span>
            </span>
            <span>
              <span> - View Source Code</span>
              <span> - Download from App Store</span>
              <span> - Download from Play Store</span>
            </span>
            <span>
              <span> - View Source Code</span>
              <span> - Download from App Store</span>
              <span> - Download from Play Store</span>
            </span>
            <span>
              <span> - View Source Code</span>
              <span> - Download from App Store</span>
              <span> - Download from Play Store</span>
            </span>
          </div>
        </div>
        <div className="w-full h-full grid grid-rows-4 relative">
          <div className="row-span-3 grid grid-cols-3 relative">
            <div className="grid grid-rows-3 relative">
              <div className="row-span-2 relative rombus">
                <Vr style={{ left: 0 }} />
                <Hr style={{ bottom: 0 }} />
              </div>
            </div>
            <div className="relative col-span-2 z-10">
              {/* <Image src={"/images/hendrix.jpg"} alt="hendrix" fill className="slider-image" /> */}
              <Canvas style={{ position: "absolute" }} dpr={[1, 1]}>
                <Scene />
              </Canvas>
              <Vr style={{ left: 0 }} />
              <Vr style={{ right: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-start-3 relative stripes-thin">
              <Vr style={{ left: 0 }} />
              <Vr style={{ right: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
          <Hr style={{ top: 0 }} />
          <div className="w-2/3 h-1/2 absolute bottom-0 flex flex-col">
            <div
              onClick={() => router.push("/projects/void")}
              className="arrow will-change-transform bg-secondary absolute w-1/12 aspect-square left-[26.6vmax] cursor-pointer transition-transform duration-500 hover:rotate-45"
            />
            <h1 className="font-black uppercase text-[4vmax] mt-[2.5vmax] mb-[2vmax] leading-none">
              Project
            </h1>
            <div className="ml-[2.25vmax] flex font-mono tracking-widest uppercase text-[1vmax] mb-[2.25vmax]">
              <p>[stack]</p>
              <div className="ml-[1vmax] font-semibold">
                <p>Art Direction</p>
                <p>Motion Direction</p>
                <p>UI/UX Design</p>
                <p>Client Development</p>
                <p>Server Development</p>
              </div>
            </div>
            <div className="ml-[8vmax] flex w-3/4 font-mono tracking-widest uppercase text-[0.75vmax]">
              <p>[description]</p>
              <p className="ml-[1vmax] font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo
                iste ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti
                voluptatum maiores sunt culpa nulla. Velit!
              </p>
            </div>
            <p
              className="absolute -scale-100 bottom-[5.75vmax] right-[0.5vmax] font-numeric text-[2vmax]"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
              }}
            >
              2023
            </p>
            <div className="w-[2vmax] aspect-square absolute bottom-0 left-0">
              <Vr style={{ left: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
        </div>
      </div>
      <p
        className="absolute right-[1.25vmax] top-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 01 - Project"}
      </p>
    </>
  );
};

export default Project;
