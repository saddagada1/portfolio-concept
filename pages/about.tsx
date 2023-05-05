import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <div className="absolute top-[6vmax] left-[4vmax] text-secondary selection:bg-secondary selection:text-primary">
        <h1 className="group font-black uppercase text-[4vmax] flex">
          <span className="italic text-transparent relative link will-change-transform before:content-['Saivamsi'] before:absolute before:h-1/2 before:overflow-clip before:transition-transform before:duration-500 before:translate-x-[0%] before:text-secondary after:content-['Saivamsi'] after:absolute after:w-full after:h-full after:block after:top-0 after:transition-transform after:duration-500 after:text-secondary group-hover:before:translate-x-[-10%]">
            Saivamsi
          </span>
          &nbsp;Addagada
        </h1>
        <p className="font-bold text-[2vmax] mt-[1.5vmax] ml-[10vmax]">
          A creative full-stack developer
        </p>
        <p className="w-1/3 font-mono font-semibold tracking-widest uppercase text-[0.75vmax] mt-[3vmax] ml-[20vmax]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet unde temporibus quo iste
          ipsa suscipit sint facere, eos inventore adipisci non fugit obcaecati corrupti voluptatum
          maiores sunt culpa nulla. Velit!
        </p>
      </div>
      <p
        className="absolute right-[1.25vmax] bottom-[10vmax] font-mono font-semibold tracking-widest uppercase text-[0.75vmax] text-secondary selection:bg-secondary selection:text-primary"
        style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
      >
        {"// 03 - About"}
      </p>
    </>
  );
};
export default About;
