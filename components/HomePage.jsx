/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-quotes */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
// import Link from 'next/link';
import _ from 'lodash';
import Aos from 'aos';
import { ArrowRightOutlined } from '@ant-design/icons';
import axios from 'axios';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';
import { logoIcon, releafLogo } from '../images';
import { routes } from '../route';
import { Button } from 'antd';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Image from 'next/image';


function HomePage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#d6ffe4", // Light green background
        },
      },
      fpsLimit: 60, // Smoother animations
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#009933", // White particles
        },
        links: {
          enable: true,
          color: "#ffffff",
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out", // Let the particles float out of the screen edges
          },
          random: true, // Random floating movement
          speed: 2, // Slow speed for gentle floating
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Adjust for particle density
          },
          value: 400, // Number of particles
        },
        opacity: {
          value: 0.7, // Slight transparency for a soft effect
        },
        shape: {
          type: "circle", // Circular shape for particles
        },
        size: {
          value: { min: 3, max: 6 }, // Slight size variation for particles
        },
      },
      detectRetina: true,
    }),
    []
  );
  
  



  return (
    <Layout>

      <div className="h-full w-full">
        {/* Particles Background */}
        {init &&   <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />}

        {/* Main Content */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-10">
          {/* Logo */}
          <div className="mb-10">
            <Image
              src={releafLogo} // Update this to your logo path
              alt="App Logo"
              className="w-60 h-60"
              width={150}
              height={200}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              type="primary"
              size="large"
              className="w-48 bg-green-500 hover:bg-green-600 rounded-full px-3 py-3 text-white"
              onClick={() => router.push('/dashboard')}
            >
             Start
            </Button>
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default HomePage;
