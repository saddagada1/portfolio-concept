import Scene from "@/components/Scene/Scene";
import { Canvas } from "@react-three/fiber";
import { promises as fs } from "fs";
import path from "path";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { rand } from "@/utils/rand";

export const getStaticProps: GetStaticProps<{
  data: string;
}> = async () => {
  const selector = rand(1, 3);
  let data: string;
  if (selector === 1) {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/poe-${rand(1, 4)}.txt`),
      "utf-8"
    );
  } else if (selector === 2) {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/a-study-in-emerald-${rand(1, 4)}.txt`),
      "utf-8"
    );
  } else {
    data = await fs.readFile(
      path.resolve(process.cwd(), `./public/books/the-double-${rand(1, 10)}.txt`),
      "utf-8"
    );
  }
  return { props: { data: data } };
};

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => {
  return (
    <>
      <div className="w-1/3 absolute bottom-0 left-0 m-[3.5vmax] z-10 text-secondary">
        <h1 className="w-max group font-black uppercase text-[1.5vmax] flex selection:bg-secondary selection:text-primary cursor-default">
          <span className="italic text-transparent relative link will-change-transform before:content-['Saivamsi'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Saivamsi'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary group-hover:before:translate-x-[-10%]">
            Saivamsi
          </span>
          &nbsp;Addagada
        </h1>
        <p className="font-bold text-[1vmax] selection:bg-secondary selection:text-primary">
          Portfolio
        </p>
        <p className="w-5/6 font-mono font-semibold tracking-widest uppercase text-[0.75vmax] mt-[1vmax] selection:bg-secondary selection:text-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo iste
          ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti voluptatum
          maiores sunt culpa nulla. Velit!
        </p>
      </div>
      <div className="w-full h-full fixed">
        <Canvas camera={{ position: [0, 0, 8] }} dpr={[1, 2]}>
          <Scene data={data} />
        </Canvas>
      </div>
      <p
        className="absolute right-[1vmax] bottom-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 01 - Index"}
      </p>
    </>
  );
};

export default Index;
