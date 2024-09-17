import { useEffect, useRef } from "react";
import "aframe";
import "aframe-extras";
import "mind-ar/dist/mindar-image-aframe.prod.js";
import "../utils/globals.ts";
function getCurrentLanguage() {
  try {
    const language = navigator.language.startsWith("es") ? "es" : "en";
    return language;
  } catch (error) {
    return "es";
  }
}
export default function ARScene() {
  const language = getCurrentLanguage();
  const sceneRef = useRef(null);
  const targetName = useRef(null);
  const target0 = useRef(null);
  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);

  function addListenerTarget(target, name) {
    target.current.addEventListener("targetFound", () => {
      showTargetName(name);
    });

    target.current.addEventListener("targetLost", () => {
      hideTargetName();
    });
  }
  function showTargetName(name) {
    if (targetName.current) {
      targetName.current.textContent = name;
      targetName.current.className =
        "absolute bottom-[10%] bg-white text-xl text-[#31302c] p-3 px-5 text-center rounded-r-full animate-slideInFromLeft";
      targetName.current.style.display = "block";
    }
  }

  function hideTargetName() {
    if (targetName.current) {
      targetName.current.className =
        "absolute bottom-[10%] bg-white text-xl text-[#31302c] p-3 px-5 text-center rounded-r-full animate-slideOutToLeft";
    }
  }
  useEffect(() => {
    let resizeTimeout;

    const adjustSceneSize = () => {
      if (sceneRef.current) {
        const scene = sceneRef.current;
        scene.style.width = `${window.innerWidth}px`;
        scene.style.height = `${window.innerHeight}px`;

        // Usar un timeout para limitar la frecuencia de las actualizaciones
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          // Forzar a A-Frame a actualizar su tamaño
          if (scene.emit) {
            scene.emit("resize");
          }
        }, 250);
      }
    };

    // Ajustar inicialmente después de un breve retraso
    setTimeout(adjustSceneSize, 100);

    const handleResize = () => {
      requestAnimationFrame(adjustSceneSize);
    };

    window.addEventListener("resize", handleResize);

    addListenerTarget(
      target0,
      language == "es"
        ? "Parque Nacional Conguillío"
        : "Conguillío National Park"
    );
    addListenerTarget(
      target1,
      language == "es" ? "Araucaria, árbol nativo" : "Araucaria, native tree"
    );
    addListenerTarget(
      target2,
      language == "es"
        ? "Carpintero Negro, ave nativa"
        : "Black Woodpecker, native bird"
    );
    addListenerTarget(
      target3,
      language == "es"
        ? "Monito del Monte, marsupial"
        : "Monito del Monte, marsupial"
    );
    addListenerTarget(
      target4,
      language == "es" ? "⁠Puma, felino grande" : "Monito del Monte, marsupial"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <a-scene
        mindar-image="maxTrack: 1; filterMinCF:0.0001; filterBeta: 0.001; imageTargetSrc: /aecl24/webar/target/targets.mind; uiScanning: #scanning-overlay; uiLoading: #custom-loading-overlay;"
        xr-mode-ui="enabled: false"
        loading-screen="enabled: false"
        device-orientation-permission-ui="enabled: false"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
      >
        <a-assets>
          <a-asset-item
            id="model0"
            src="/aecl24/webar/3d/VolcanLlaima_LagoConguillio_V03_CON.glb"
          ></a-asset-item>
          <a-asset-item
            id="model1"
            src="/aecl24/webar/3d/ARAUCARIA_V08_CON.glb"
          ></a-asset-item>
          <a-asset-item
            id="model2"
            src="/aecl24/webar/3d/Carpintero_Negro_V04_CON.glb"
          ></a-asset-item>
          <a-asset-item
            id="model3"
            src="/aecl24/webar/3d/Monito_Del_Monte_V01.glb"
          ></a-asset-item>
          <a-asset-item
            id="model4"
            src="/aecl24/webar/3d/PUMA_V04.glb"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity
          id="target0"
          ref={target0}
          mindar-image-target="targetIndex: 0"
        >
          <a-gltf-model
            rotation="-135 90 90"
            position="0 0 0"
            scale="0.75 0.75 0.75"
            src="#model0"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
        <a-entity
          id="target1"
          ref={target1}
          mindar-image-target="targetIndex: 1"
        >
          <a-gltf-model
            rotation="0 0 0"
            position="0 -0.7 0"
            scale="0.1 0.1 0.1"
            src="#model1"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
        <a-entity
          id="target2"
          ref={target2}
          mindar-image-target="targetIndex: 2"
        >
          <a-gltf-model
            rotation="-90 90 90"
            position="0 0 0"
            scale="0.7 0.7 0.7"
            src="#model2"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
        <a-entity
          id="target3"
          ref={target3}
          mindar-image-target="targetIndex: 3"
        >
          <a-gltf-model
            rotation="0 90 45"
            position="0.25 0 0"
            scale="1 1 1"
            src="#model3"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
        <a-entity
          id="target4"
          ref={target4}
          mindar-image-target="targetIndex: 4"
        >
          <a-gltf-model
            rotation="60 90 90"
            position="0 0 0"
            scale="1 1 1"
            src="#model4"
            animation-mixer
          ></a-gltf-model>
        </a-entity>
      </a-scene>
      <b>
        <label className="" id="target-name" ref={targetName}></label>
      </b>
    </>
  );
}
