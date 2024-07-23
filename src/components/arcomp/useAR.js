// useAR.js
import { useEffect } from 'react';

const useAR = () => {
    useEffect(() => {
        document.body.classList.add('hide-background');
        return () => {
            document.body.classList.remove('hide-background');
        };
    }, []);

    const startARCamera = () => {
        const arjsSystem = document.querySelector('a-scene')?.systems['arjs'];
        if (arjsSystem && arjsSystem.source) {
            arjsSystem.source.start();
        }
    };

    const stopARCamera = (callback) => {
        const scene = document.querySelector('a-scene');
        if (!scene) {
            callback();
            return;
        }

        const arjsSystem = scene.systems['arjs'];
        if (arjsSystem && arjsSystem.source) {
            arjsSystem.source.stop();

            const cameraEntity = scene.querySelector('[camera]');
            if (cameraEntity) {
                cameraEntity.parentNode.removeChild(cameraEntity);
            }

            arjsSystem.dispose();

            while (scene.firstChild) {
                scene.removeChild(scene.firstChild);
            }

            scene.parentNode.removeChild(scene);
            setTimeout(callback, 100);
        } else {
            callback();
        }
    };

    return { startARCamera, stopARCamera };
};

export default useAR;
