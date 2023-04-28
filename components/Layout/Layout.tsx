import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";
import { isServer } from "@/utils/isServer";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const theme = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dateTime = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(dateTime);
    };
  }, []);

  return (
    <header className="flex text-secondary text-[0.75vmax] font-mono font-semibold tracking-widest uppercase m-[1.25vmax] z-10">
      <div className="w-1/2 stripes relative">
        <div className="w-max px-[2vmax] bg-secondary text-primary absolute right-0 bottom-0 selection:bg-primary selection:text-secondary">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }) +
            " || " +
            date.toLocaleString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false,
            })}
        </div>
      </div>
      <div className="flex flex-col ml-[2vmax]">
        <Link
          href="/"
          className="text-transparent relative select-none link will-change-transform before:content-['Index'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Index'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-15%]"
        >
          Index
        </Link>
        <Link
          href="/projects"
          className="mt-[0.5vmax] text-transparent relative select-none link will-change-transform before:content-['Projects'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Projects'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-10%]"
        >
          Projects
        </Link>
      </div>
      <div className="flex flex-col ml-[2vmax]">
        <Link
          href="https://github.com/saddagada1"
          className="text-transparent relative select-none link will-change-transform before:content-['Github'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Github'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-15%]"
        >
          Github
        </Link>
        <Link
          href="https://linkedin.com"
          className="mt-[0.5vmax] text-transparent relative select-none link will-change-transform before:content-['LinkedIn'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['LinkedIn'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-10%]"
        >
          LinkedIn
        </Link>
      </div>
      <div className="flex flex-col justify-end ml-[2vmax]">
        <div
          onClick={(event) => {
            event.stopPropagation();
            document.documentElement.style.setProperty(
              "--primary-colour",
              theme.mode === "Light" ? "#161615" : "#d1d1d1"
            );
            document.documentElement.style.setProperty(
              "--secondary-colour",
              theme.mode === "Light" ? "#d1d1d1" : "#161615"
            );
            dispatch(
              setTheme({
                mode: theme.mode === "Light" ? "Dark" : "Light",
                primaryColour: theme.secondaryColour,
                secondaryColour: theme.primaryColour,
              })
            );
          }}
          className="cursor-pointer text-transparent relative select-none link will-change-transform before:content-['Theme'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Theme'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-15%]"
        >
          Theme
        </div>
      </div>
    </header>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [viewHeight, setViewHeight] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

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
          className="bg-primary flex flex-col relative grain"
          style={{
            height: viewHeight,
            width: viewWidth,
          }}
        >
          <Header />
          {children}
        </main>
      )}
    </>
  );
};
export default Layout;
