import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/slices/themeSlice";
import { isServer } from "@/utils/isServer";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition/PageTransition";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const theme = useAppSelector((store) => store.theme);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const dateTime = setInterval(() => setDate(new Date()), 1000);

    return () => {
      clearInterval(dateTime);
    };
  }, []);

  return (
    <header className="flex text-secondary text-[0.75vmax] font-mono font-semibold tracking-widest uppercase m-[1.25vmax] z-10">
      <div className="w-1/2 stripes relative">
        <div className="w-max px-[2vmax] bg-secondary text-primary absolute right-0 bottom-0 border-t-[0.2vmax] border-l-[0.2vmax] border-solid border-primary selection:bg-primary selection:text-secondary">
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
        <p
          onClick={() => (router.asPath !== "/" ? router.push("/") : null)}
          className="cursor-pointer text-transparent relative select-none link will-change-transform before:content-['Index'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Index'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-15%]"
        >
          Index
        </p>
        <p
          onClick={() => (router.asPath !== "/projects" ? router.push("/projects") : null)}
          className="cursor-pointer mt-[0.5vmax] text-transparent relative select-none link will-change-transform before:content-['Projects'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Projects'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-10%]"
        >
          Projects
        </p>
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
      <div className="flex flex-col ml-[2vmax]">
        <Link
          href="mailto:saddagada1@gmail.com"
          className="text-transparent relative select-none link will-change-transform before:content-['Email'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Email'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-15%]"
        >
          Email
        </Link>
        <a
          href="/books/poe-1.txt"
          download
          className="mt-[0.5vmax] text-transparent relative select-none link will-change-transform before:content-['Resume'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Resume'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary hover:before:translate-x-[-10%]"
        >
          Resume
        </a>
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
          className="bg-primary flex flex-col relative"
          style={{
            height: viewHeight,
            width: viewWidth,
          }}
        >
          <Header />
          {children}
          <PageTransition />
          <div className="grain z-50" />
        </main>
      )}
    </>
  );
};
export default Layout;
