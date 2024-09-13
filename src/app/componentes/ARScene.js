import { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

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
            scene.emit('resize');
          }
        }, 250);
      }
    };

    // Ajustar inicialmente después de un breve retraso
    setTimeout(adjustSceneSize, 100);

    const handleResize = () => {
      requestAnimationFrame(adjustSceneSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image="imageTargetSrc: /images/targets.mind; filterMinCF:0.0001; filterBeta: 0.001; uiScanning: #scanning-overlay; uiLoading: #custom-loading-overlay;"
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      xr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
      vr-mode-ui="enabled: false"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <a-assets>
        <a-asset-item id="model1" src="/images/scene.gltf"></a-asset-item>
      </a-assets>
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
      <a-entity mindar-image-target="targetIndex: 0">
        <a-gltf-model
          rotation="60 0 0"
          position="0 0 0"
          scale="0.05 0.05 0.05"
          src="#model1"
          animation-mixer
        ></a-gltf-model>
      </a-entity>
    </a-scene>
  );
}