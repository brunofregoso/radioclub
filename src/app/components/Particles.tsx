import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBG = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const bgoptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      fpsLimit: 120,
      manualParticles: [
      {
        options: {
          size: {value: 10},
          move: {
            enable: true,
            direction: MoveDirection.top,
            center: true,
            outModes: OutMode.destroy,
            straight: true,
            distance: 200,
            random: true,
            speed: 100,
            warp: false,
          },
        },
        position: {
          mode: "percent",
          x: 50,
          y: 50,
        },
      },
      {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 55,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 45,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 40,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 60,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 65,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 35,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 70,
        y: 50,
      },
    },
    {
      options: {
        size: {value: 10},
      },
      position: {
        mode: "percent",
        x: 30,
        y: 50,
      },
    },
  ],
      
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={bgoptions}
      />
    );
  }

  return <></>;
};

export default ParticlesBG;
