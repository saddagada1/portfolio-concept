import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";
import { isServer } from "@/utils/isServer";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Scene from "@/components/Scene/Scene";

const Sidebar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-[12.5%] min-w-[200px] flex-shrink-0 h-full relative flex flex-col justify-between text-secondary">
      <Vr style={{ right: 0 }} />
      <div className="aspect-video stripes relative">
        <Hr style={{ bottom: 0 }} />
      </div>
      <div className="px-[1vmax]">
        <h1 className="font-bold text-[1vmax]">
          <span className="italic">Saivamsi</span>
          &nbsp;Addagada
        </h1>
        <p className="font-bold text-[0.8vmax]">Portfolio</p>
        <div className="flex items-center font-mono font-bold text-[0.7vmax] my-[1vmax]">
          <Link
            href="/"
            className="relative mr-2 flex justify-center before:w-0 before:h-full before:absolute before:bg-secondary before:transition-[width] before:left-0 after:content-['Index'] after:text-primary after:absolute after:hidden hover:after:block hover:before:w-full"
          >
            Index
          </Link>
          <Link
            href="/profile"
            className="relative mr-2 flex justify-center before:w-0 before:h-full before:absolute before:bg-secondary before:transition-[width] before:left-0 after:content-['Profile'] after:text-primary after:absolute after:hidden hover:after:block hover:before:w-full"
          >
            Profile
          </Link>
          <Link
            href="/works"
            className="relative flex justify-center before:w-0 before:h-full before:absolute before:bg-secondary before:transition-[width] before:left-0 after:content-['Works'] after:text-primary after:absolute after:hidden hover:after:block hover:before:w-full"
          >
            Works
          </Link>
        </div>
        <p className="font-mono font-bold text-[0.55vmax] mb-[1.5vmax]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo iste
          ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti voluptatum
          maiores sunt culpa nulla. Velit!
        </p>
      </div>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const container = useRef<HTMLElement>(null!);
  const tracking = useRef<HTMLDivElement>(null!);
  const theme = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const setViewport = () => {
      setViewHeight(window.innerHeight);
      setViewWidth(window.innerWidth);
    };

    if (!isServer()) {
      setViewport();
      window.addEventListener("resize", setViewport);
    }

    return () => {
      window.removeEventListener("resize", setViewport);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Saivamsi Addagada | Portfolio</title>
      </Head>
      {viewWidth && viewHeight && (
        <main
          ref={container}
          className="bg-primary p-6 relative"
          style={{
            height: viewHeight,
            width: viewWidth,
          }}
        >
          <div
            className="flex absolute z-10"
            style={{ width: viewWidth - 48, height: viewHeight - 48 }}
          >
            <Hr style={{ top: 0 }} />
            <Hr style={{ bottom: 0 }} />
            <Vr style={{ left: 0 }} />
            <Vr style={{ right: 0 }} />
            <Sidebar />
            {router.pathname === "/" ? (
              <div ref={tracking} className="w-full h-full">
                {children}
              </div>
            ) : (
              <div className="w-full h-full">{children}</div>
            )}
          </div>
          <Canvas
            style={{ width: viewWidth, height: viewHeight }}
            className="-m-6"
            camera={{ position: [0, 0, 8] }}
            dpr={[1, 2]}
            eventSource={container}
          >
            <color attach="background" args={[theme.primaryColour]} />
            <EffectComposer>
              {/* <Glitch
strength={new Vector2(0.1, 0.5)}
duration={new Vector2(0.05, 0.1)}
columns={0.0001}
mode={GlitchMode.CONSTANT_MILD}
active={shouldGlitch}
/> */}
              <Noise premultiply={true} opacity={0.5} />
            </EffectComposer>
            <View track={tracking}>
              <Scene />
            </View>
          </Canvas>
        </main>
      )}
    </>
  );
};
export default Layout;
