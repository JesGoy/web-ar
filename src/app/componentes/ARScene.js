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
  const target5 = useRef(null);
  const target6 = useRef(null);

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
      language == "es" ? "⁠Puma, felino grande" : "Puma, big feline"
    );
    addListenerTarget(
      target5,
      language == "es" ? "Güiña, felino pequeño" : "Güiña, small feline"
    );
    addListenerTarget(
      target6,
      language == "es" ? "Salto Truful Truful " : "Truful Truful waterfall"
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <a-scene
        mindar-image="maxTrack: 1; filterMinCF:0.0001; filterBeta: 0.001; imageTargetSrc: /target/targets.mind; uiScanning: #scanning-overlay; uiLoading: #custom-loading-overlay;"
        xr-mode-ui="enabled: false"
        loading-screen="enabled: false"
        device-orientation-permission-ui="enabled: false"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
      >
        <a-assets>
          <a-asset-item
            id="model0"
            src="/3d/1_VolcanLlaima.glb"
          ></a-asset-item>
          <a-asset-item
            id="model1"
            src="/3d/2_Araucaria.glb"
          ></a-asset-item>
          <a-asset-item
            id="model2"
            src="/3d/3_CarpinteroNegro.glb"
          ></a-asset-item>
          <a-asset-item
            id="model3"
            src="/3d/4_MonitoDelMonte.glb"
          ></a-asset-item>
          <a-asset-item id="model4" src="/3d/5_Puma.glb"></a-asset-item>
          <a-asset-item id="model5" src="/3d/6_Guina.glb"></a-asset-item>
          <a-asset-item
            id="model6"
            src="/3d/7_SaltoTrufulTruful.glb"
          ></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity id="target0"  ref={target0} mindar-image-target="targetIndex: 0">
        <a-gltf-model
          rotation="-140 75 115"
          position="0.1 0.15 0"
          scale="0.75 0.75 0.75"
          src="#model0"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target1"  ref={target1} mindar-image-target="targetIndex: 1">
        <a-gltf-model
          rotation="7 0 0"
          position="0 -0.7 0"
          scale="0.1 0.1 0.1"
          src="#model1"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target2" ref={target2}  mindar-image-target="targetIndex: 2">
        <a-gltf-model
          rotation="-100 0 150"
          position="0.1 0 0"
          scale="0.7 0.7 0.7"
          src="#model2"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target3"  ref={target3} mindar-image-target="targetIndex: 3">
        <a-gltf-model
          rotation="0 90 60"
          position="-0.1 0 0"
          scale="0.7 0.7 0.7"
          src="#model3"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target4"  ref={target4} mindar-image-target="targetIndex: 4">
        <a-gltf-model
          rotation="55 60 60"
          position="-0.05 0.1 0"
          scale="1 1 1"
          src="#model4"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target5"  ref={target5} mindar-image-target="targetIndex: 5">
        <a-gltf-model
          rotation="53 -68 -76"
          position="0.1 0.2 0"
          scale="2 2 2"
          src="#model5"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity id="target6"  ref={target6} mindar-image-target="targetIndex: 6">
        <a-gltf-model
          rotation="-80 195 160"
          position="-1 0.35 0"
          scale="0.04 0.04 0.04"
          src="#model6"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
       
      </a-scene>
      <b>
        <label className="" id="target-name" ref={targetName}></label>
      </b>
    </>
  );
}
