import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { useAppSelector } from "@/redux/hooks";
import { sleep } from "@/utils/sleep";
import { Html, useAspect, useCursor, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ColorAverage,
  EffectComposer,
  HueSaturation,
  Pixelation,
} from "@react-three/postprocessing";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MathUtils } from "three";

const Scene: React.FC = () => {
  const theme = useAppSelector((store) => store.theme);
  const [hover, setHover] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [anim, setAnim] = useState<string | null>(null);
  const [granularity, setGranularity] = useState(15);
  const scale = useAspect(16, 9);
  const imageTextures = useTexture([
    "/images/hendrix.jpg",
    "/images/king.jpg",
    "/images/mayer.jpg",
  ]);
  useCursor(hover, "pointer");

  useFrame(() => {
    if (hover && !anim) {
      if (granularity !== 0) {
        setGranularity((granularity) => MathUtils.lerp(granularity, 0, 0.05));
      }
    } else {
      if (granularity !== 15) {
        setGranularity((granularity) => MathUtils.lerp(granularity, 15, 0.05));
      }
    }

    if (anim !== null) {
      setGranularity((granularity) => MathUtils.lerp(granularity, 20, 0.05));
      if (granularity >= 15) {
        if (anim === "left") {
          setImageIndex((imageIndex) => {
            if (imageIndex === 0) {
              return imageTextures.length - 1;
            } else {
              return imageIndex - 1;
            }
          });
        } else {
          setImageIndex((imageIndex) => {
            if (imageIndex === imageTextures.length - 1) {
              return 0;
            } else {
              return imageIndex + 1;
            }
          });
        }
        setAnim(null);
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
        <meshBasicMaterial map={imageTextures[imageIndex]} />
      </mesh>
      <Html fullscreen>
        <div className="w-full h-full flex">
          <div onClick={() => setAnim("left")} className="w-1/2 h-full"></div>
          <div onClick={() => setAnim("right")} className="w-1/2 h-full"></div>
        </div>
      </Html>
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
      <div className="w-full h-full flex flex-col pb-[1.25vmax] pr-[2.75vmax] pl-[1.25vmax] text-secondary selection:bg-secondary selection:text-primary">
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
              <div className="row-span-2 relative checks">
                <Vr style={{ left: 0 }} />
                <Hr style={{ bottom: 0 }} />
              </div>
            </div>
            <div className="relative col-span-2 z-10">
              <Canvas style={{ position: "absolute" }} dpr={[1, 1]} legacy>
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
          <div className="w-2/3 h-1/2 absolute bottom-0 flex items-center">
            <div className="w-1/2 absolute top-0">
              <div
                onClick={() => router.push("/projects/void")}
                className="arrow will-change-transform bg-secondary absolute w-1/6 aspect-square right-0 cursor-pointer transition-transform duration-500 hover:rotate-45"
              />
            </div>
            <div className="w-full h-[90%] relative flex items-center pointer-events-none">
              <h1 className="absolute top-0 font-black uppercase text-[4vmax] mb-[2vmax] leading-none">
                Project
              </h1>
              <div className="absolute ml-[2.25vmax] flex font-mono tracking-widest uppercase text-[1vmax] mt-[0.25vmax]">
                <p>[stack]</p>
                <div className="ml-[1vmax] font-semibold">
                  <p>Art Direction</p>
                  <p>Motion Direction</p>
                  <p>UI/UX Design</p>
                  <p>Client Development</p>
                  <p>Server Development</p>
                </div>
              </div>
              <div className="absolute bottom-0 ml-[8vmax] flex w-3/4 font-mono tracking-widest uppercase text-[0.75vmax]">
                <p>[description]</p>
                <p className="ml-[1vmax] font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus
                  quo iste ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati
                  corrupti voluptatum maiores sunt culpa nulla. Velit!
                </p>
              </div>
            </div>
            <div className="w-full h-1/2 absolute bottom-0">
              <p
                className="absolute -scale-100 top-[1vmax] right-[0.25vmax] font-numeric text-[2vmax]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                }}
              >
                2023
              </p>
            </div>
            <div className="w-[2vmax] aspect-square absolute bottom-0 left-0">
              <Vr style={{ left: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
        </div>
      </div>
      <p
        className="absolute right-[1.25vmax] top-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 01 - Project"}
      </p>
    </>
  );
};

export default Project;
