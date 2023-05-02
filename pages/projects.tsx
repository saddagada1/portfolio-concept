import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { sleep } from "@/utils/sleep";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

const Project: React.FC = () => {
  return (
    <div className="w-full h-full cursor-pointer text-secondary relative">
      <h2 className="absolute left-[1vmax] font-black uppercase text-[3vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none">
        Project
      </h2>
      <p
        className="absolute -scale-100 bottom-[1vmax] right-[0.25vmax] font-bold text-[2vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none"
        style={{
          writingMode: "vertical-lr",
          textOrientation: "mixed",
        }}
      >
        2023
      </p>
      <div className="absolute bottom-[2vmax] left-[2.5vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] selection:bg-secondary selection:text-primary z-10 pointer-events-none">
        <p>Art Direction</p>
        <p>Motion Direction</p>
        <p>UI/UX Design</p>
        <p>Client Development</p>
        <p>Server Development</p>
      </div>
      <div className="arrow bg-secondary absolute w-1/6 aspect-square right-0 z-10 pointer-events-none" />
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
      <div className="w-full h-full pb-[3.5vmax] pr-[3.5vmax] pl-[2.75vmax]">
        <div className="w-full h-full flex flex-col relative rombus">
          <div className="flex-1 grid grid-rows-2 relative">
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
            <Vr style={{ right: 0 }} />
          </div>
          <div className="grid grid-cols-3">
            <div className="relative col-span-2">
              <Hr style={{ bottom: 0 }} />
              <Vr style={{ right: 0 }} />
            </div>
            <div className="bg-primary text-secondary text-right relative pt-[1vmax] pl-[0.5vmax]">
              <h1 className="font-black uppercase text-[2vmax] selection:bg-secondary selection:text-primary">
                Projects
              </h1>
              <p className="font-bold text-[1.25vmax] selection:bg-secondary selection:text-primary">
                [ Selected ]
              </p>
              <p className="font-mono font-semibold tracking-widest uppercase text-[0.75vmax] mt-[1vmax] selection:bg-secondary selection:text-primary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo
                iste ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti
                voluptatum maiores sunt culpa nulla. Velit!
              </p>
            </div>
          </div>
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
