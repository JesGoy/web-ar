"use client";
import { useEffect } from "react";
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

export default function Home() {
  function adjustLogoSize() {
    const logo = document.getElementById("logo");
    if (!logo) return;
    if (window.innerWidth < window.innerHeight) {
      // Pantalla vertical
      logo.style.width = "25vw";
      logo.style.height = "auto";
    } else {
      // Pantalla horizontal
      logo.style.width = "auto";
      logo.style.height = "25vh";
    }
  }
  useEffect(() => {
   
    window.addEventListener("load", adjustLogoSize);
    window.addEventListener("resize", adjustLogoSize);

    return () => {
      window.removeEventListener("load", adjustLogoSize);
      window.removeEventListener("resize", adjustLogoSize);
    };
  }, [adjustLogoSize]);

  return (
    <div>
      <img id="logo" src="images/logo.svg" alt="Logo" />

      <div
        id="custom-loading-overlay"
        className="mindar-ui-overlay mindar-ui-loading"
      >
        <div className="loading-text">Cargando...</div>
        <div className="loader"></div>
      </div>

      <div
        id="scanning-overlay"
        className="mindar-ui-overlay mindar-ui-scanning"
      >
        <div className="mindar-ui-overlay mindar-ui-scanning">
          <div className="scanning">
            <div className="inner">
              <img
                src="images/target.jpg"
                alt="Target"
                className="target-image"
              />
              <div className="scanline"></div>
            </div>
          </div>
        </div>
      </div>
      <a-scene
        mindar-image="filterMinCF:0.0001; filterBeta: 0.001; imageTargetSrc: /images/targets.mind; uiScanning: #scanning-overlay; uiLoading: #custom-loading-overlay;"
        xr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <a-asset-item
            id="model1"
            src="/images/scene.gltf"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            rotation="60 0 0 "
            position="0 0 0"
            scale="0.05 0.05 0.05"
            src="#model1"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </div>
  );
}
