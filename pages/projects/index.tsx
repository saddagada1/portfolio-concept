import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { sleep } from "@/utils/sleep";
import { motion } from "framer-motion";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const projectTransitionRootVariants = {
  reveal: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
  hide: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
};

const projectTransitionSpanVariants = {
  reveal: {
    height: "105%",
  },
  hide: {
    height: "0%",
  },
};

const projectTransitionTextVariants = {
  reveal: {
    opacity: 1,
    transition: {
      opacity: { delay: 0.25 },
    },
  },
  hide: {
    opacity: 0,
  },
};

const Project: React.FC = () => {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => router.push("/projects/remaster")}
      className="w-full h-full cursor-pointer text-secondary selection:bg-secondary selection:text-primary relative"
    >
      <h2 className="absolute left-[1vmax] font-black uppercase text-[3vmax]">Project</h2>
      <p
        className="absolute -scale-100 bottom-[1vmax] right-[0.25vmax] font-numeric text-[2vmax]"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "mixed",
        }}
      >
        2023
      </p>
      <div className="absolute bottom-[2vmax] left-[2.5vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax]">
        <p>Art Direction</p>
        <p>Motion Direction</p>
        <p>UI/UX Design</p>
        <p>Client Development</p>
        <p>Server Development</p>
      </div>
      <div className="arrow bg-secondary absolute w-1/6 aspect-square right-0" />
      <motion.div
        animate={hover ? "reveal" : "hide"}
        variants={projectTransitionRootVariants}
        className="w-full h-full -scale-y-100 absolute overflow-hidden flex"
      >
        {Array(20)
          .fill(null)
          .map((_, index) => (
            <motion.span
              key={index}
              className="w-[5%] bg-secondary"
              variants={projectTransitionSpanVariants}
            />
          ))}
        <div className="w-full h-full absolute -scale-y-100 p-[5vmax] flex justify-center items-center font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-primary selection:bg-primary selection:text-secondary">
          <motion.p variants={projectTransitionTextVariants}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi fuga et dolor mollitia
            quaerat quam a repellendus ea iure aperiam. Officiis labore delectus iure, hic facilis
            consectetur cum nostrum nisi?
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{}> = async () => {
  await sleep(1000);

  return { props: {} };
};

const Projects: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({}) => {
  return (
    <>
      <div className="w-full h-full pb-[1.25vmax] pr-[1.25vmax] pl-[2.75vmax]">
        <div className="w-full h-full grid grid-rows-4 relative checks">
          <div className="row-span-3 grid grid-rows-2 relative">
            <div className="bg-primary grid grid-cols-3 relative">
              <div className="relative">
                <Vr style={{ right: 0 }} />
                <Project />
              </div>
              <div className="relative">
                <Vr style={{ right: 0 }} />
                <Project />
              </div>
              <div className="relative">
                <Project />
              </div>
              <Hr style={{ bottom: 0 }} />
            </div>
            <div className="grid grid-cols-3">
              <div className="bg-primary relative col-start-2 col-span-2 grid grid-cols-2">
                <div className="relative">
                  <Vr style={{ right: "100%" }} />
                  <Project />
                </div>
                <div className="relative">
                  <Vr style={{ right: "100%" }} />
                  <Project />
                </div>
                <Hr style={{ bottom: 0 }} />
              </div>
            </div>
          </div>
          <Hr style={{ bottom: 0 }} />
          <Vr style={{ right: 0 }} />
          <Hr style={{ top: 0 }} />
          <Vr style={{ left: 0 }} />
        </div>
      </div>
      <p
        className="absolute -scale-100 left-[1.25vmax] top-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 02 - Projects"}
      </p>
    </>
  );
};

export default Projects;
