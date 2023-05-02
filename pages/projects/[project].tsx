import Hr from "@/components/Utils/Hr";
import Vr from "@/components/Utils/Vr";
import { sleep } from "@/utils/sleep";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

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
  return (
    <>
      <div className="w-full h-full flex flex-col pb-[2.75vmax] pr-[2.75vmax] pl-[1.25vmax] text-secondary selection:bg-secondary selection:text-primary">
        <p className="w-full font-semibold font-mono tracking-widest uppercase text-[0.75vmax] whitespace-nowrap overflow-hidden mb-[0.5vmax]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo iste
          ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti voluptatum
          maiores sunt culpa nulla. Velit! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Nobis porro, labore quaerat cumque at laboriosam, facilis officiis omnis tenetur
          distinctio qui placeat voluptatem consequuntur alias neque voluptas mollitia minima
          tempore.
        </p>
        <div className="w-full h-full flex flex-col relative">
          <div className="basis-3/4 grid grid-cols-3 relative">
            <div className="flex flex-col relative">
              <div className="basis-2/3 flex-shrink-0 relative rombus">
                <Vr style={{ left: 0 }} />
                <Hr style={{ bottom: 0 }} />
              </div>
              <div className="basis-1/3 relative">
                <h1 className=" font-black uppercase text-[4vmax] mt-[2vmax]">Project</h1>
                <div className="ml-[2.25vmax] flex font-mono tracking-widest uppercase text-[1vmax] mt-[1.25vmax]">
                  <p>[stack]</p>
                  <div className="ml-[1vmax] font-semibold">
                    <p>Art Direction</p>
                    <p>Motion Direction</p>
                    <p>UI/UX Design</p>
                    <p>Client Development</p>
                    <p>Server Development</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative col-span-2">
              <Vr style={{ left: 0 }} />
              <Vr style={{ right: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
          <div className="basis-1/4 grid grid-cols-3">
            <div className="relative col-span-2 flex justify-center items-end">
              <div className="flex w-3/4 font-mono tracking-widest uppercase text-[0.75vmax]">
                <p>[description]</p>
                <p className="ml-[1vmax] font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus
                  quo iste ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati
                  corrupti voluptatum maiores sunt culpa nulla. Velit!
                </p>
              </div>
              <p
                className="absolute -scale-100 top-[1vmax] right-[0.25vmax] font-bold text-[2vmax]"
                style={{
                  writingMode: "vertical-lr",
                  textOrientation: "mixed",
                }}
              >
                2022
              </p>
              <div className="w-[2vmax] aspect-square absolute bottom-0 left-0">
                <Vr style={{ left: 0 }} />
                <Hr style={{ bottom: 0 }} />
              </div>
            </div>
            <div className="relative stripes-thin">
              <Vr style={{ left: 0 }} />
              <Vr style={{ right: 0 }} />
              <Hr style={{ bottom: 0 }} />
            </div>
          </div>
          <Hr style={{ top: 0 }} />
        </div>
      </div>
      <p
        className="absolute right-[1.25vmax] top-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 02 - Projects"}
      </p>
    </>
  );
};

export default Project;
