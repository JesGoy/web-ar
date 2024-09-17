import { useEffect, useRef } from "react";
import "aframe";
import "aframe-extras";
import "mind-ar/dist/mindar-image-aframe.prod.js";

export default function ARScene() {
  const sceneRef = useRef(null);

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

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
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
          src="/3d/VolcanLlaima_LagoConguillio_V03_CON.glb"
        ></a-asset-item>
        <a-asset-item
          id="model1"
          src="/3d/ARAUCARIA_V08_CON.glb"
        ></a-asset-item>
        <a-asset-item
          id="model2"
          src="/3d/Carpintero_Negro_V04_CON.glb"
        ></a-asset-item>
        <a-asset-item
          id="model3"
          src="/3d/Monito_Del_Monte_V01.glb"
        ></a-asset-item>
        <a-asset-item
          id="model4"
          src="/3d/PUMA_V04.glb"
        ></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
          rotation="-135 90 90"
          position="0 0 0"
          scale="0.75 0.75 0.75"
          src="#model0"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 1">
        <a-gltf-model
          rotation="0 0 0"
          position="0 -0.7 0"
          scale="0.1 0.1 0.1"
          src="#model1"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 2">
        <a-gltf-model
          rotation="-90 90 90"
          position="0 0 0"
          scale="0.7 0.7 0.7"
          src="#model2"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 3">
        <a-gltf-model
          rotation="0 90 45"
          position="0.25 0 0"
          scale="1 1 1"
          src="#model3"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
      <a-entity mindar-image-target="targetIndex: 4">
        <a-gltf-model
          rotation="60 90 90"
          position="0 0 0"
          scale="1 1 1"
          src="#model4"
          animation-mixer
        >
        </a-gltf-model>
      </a-entity>
    </a-scene>
  );
}
