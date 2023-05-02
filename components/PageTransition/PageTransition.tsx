import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const pageTransitionRootVariants = {
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

const pageTransitionSpanVariants = {
  reveal: {
    width: "105%",
    transition: {
      width: { type: "spring", damping: 25, bounce: 0 },
    },
  },
  hide: {
    width: "0%",
    transition: {
      width: { type: "spring", bounce: 0 },
    },
  },
};

const pageTransitionTextVariants = {
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

const PageTransition: React.FC = () => {
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);
  const [transitionText, setTransitionText] = useState("");
  const [shouldTransition, setShouldTransition] = useState(true);
  const [isTyping, setIsTyping] = useState(true);

  const getCommonStringIndex = (text1: string, text2: string) => {
    let index = 0;
    while (text1[index] === text2[index]) {
      index++;
    }
    return index - 1;
  };

  const typeTransitionText = (text: string) => {
    setIsTyping(true);
    const commonIndex = getCommonStringIndex(transitionText, text);
    let i = commonIndex;
    let x = transitionText.length - 1;
    const typeInterval = setInterval(() => {
      if (x !== commonIndex) {
        x--;
        setTransitionText((transitionText) => transitionText.slice(0, -1));
      } else {
        if (i === text.length - 1) {
          setIsTyping(false);
          clearInterval(typeInterval);
        } else {
          i++;
          setTransitionText((transitionText) => transitionText + text[i]);
        }
      }
    }, 100);
  };

  useEffect(() => {
    if (!initialLoad) {
      if (router.asPath === "/") {
        typeTransitionText("/index");
      } else {
        typeTransitionText(router.asPath);
      }
    }
    // eslint-disable-next-line
  }, [router.asPath]);

  useEffect(() => {
    const routeChangeStart = () => {
      setShouldTransition(true);
    };

    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
    };
    // eslint-disable-next-line
  }, [router]);

  useEffect(() => {
    let delayTransitionEnd: NodeJS.Timer;
    if (!isTyping) {
      delayTransitionEnd = setTimeout(() => {
        setShouldTransition(false);
      }, 500);
    }

    return () => {
      clearTimeout(delayTransitionEnd);
    };
    // eslint-disable-next-line
  }, [isTyping]);

  useEffect(() => {
    let initialLoadTimer: NodeJS.Timer;
    if (initialLoad) {
      initialLoadTimer = setTimeout(() => {
        if (router.asPath === "/") {
          typeTransitionText("welcome");
        } else {
          typeTransitionText(router.asPath);
        }
        setInitialLoad(false);
      }, 1000);
    } else {
      initialLoadTimer = setTimeout(() => {
        setTransitionText(router.asPath === "/" ? "/index" : router.asPath);
      }, 2000);
    }
    return () => {
      clearInterval(initialLoadTimer);
    };
    // eslint-disable-next-line
  }, [initialLoad]);

  return (
    <motion.div
      animate={shouldTransition ? "reveal" : "hide"}
      variants={pageTransitionRootVariants}
      className="w-full h-full absolute overflow-hidden flex flex-col z-40 pointer-events-none"
    >
      {Array(25)
        .fill(null)
        .map((_, index) => (
          <motion.span
            key={index}
            className="h-[4%] bg-secondary"
            variants={pageTransitionSpanVariants}
          />
        ))}
      <div className="w-full h-full absolute flex justify-center items-center font-mono font-semibold tracking-widest uppercase text-[1vmax] text-primary selection:bg-primary selection:text-secondary">
        <motion.p variants={pageTransitionTextVariants}>
          {transitionText}
          <span className="cursor">&#9608;</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PageTransition;
