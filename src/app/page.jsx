"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import WelcomePage from "./componentes/welcompage";

const ARScene = dynamic(() => import("../app/componentes/ARScene"), {
  ssr: false,
});
const LoadAnimation = dynamic(
  () => import("@/app/componentes/load-animation"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.width = `${window.innerWidth}px`;
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    handleResize(); // Llamar inicialmente
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function adjustLogoSize() {
    const logo = document.getElementById("logo");
    if (!logo) return;
    if (window.innerWidth < window.innerHeight) {
      logo.style.width = "25vw";
      logo.style.height = "auto";
    } else {
      logo.style.width = "auto";
      logo.style.height = "25vh";
    }
  }

  useEffect(() => {
    if (isClient) {
      adjustLogoSize();
      window.addEventListener("resize", adjustLogoSize);
      return () => {
        window.removeEventListener("resize", adjustLogoSize);
      };
    }
  }, [isClient]);

  return start ? (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <img
        id="logo"
        src="images/logo.svg"
        alt="Logo"
        style={{ position: "absolute", zIndex: 2 }}
      />
      <div
        id="custom-loading-overlay"
        className="mindar-ui-overlay mindar-ui-loading bg-white p-8"
      >
        <LoadAnimation />
      </div>
      <div
        id="scanning-overlay"
        className="mindar-ui-overlay mindar-ui-scanning"
      >
        <div className="scanning">
          <div className="inner">
            <img
              src="images/logo-simple.svg"
              alt="Target"
              className="target-image"
              width={200}
              height={200}
            />
            <div className="bg-orangejw scanline"></div>
          </div>
        </div>
      </div>
      {isClient && <ARScene />}
    </div>
  ) : (
    <WelcomePage setStart={setStart} />
  );
}
