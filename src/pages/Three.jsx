import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui';


function Three() {
  const refContainer = useRef(null);
  const rotation = useRef(0.01); // Use ref for rotation
  let mercuryRotationSpeed = 0.05; // Rotation speed for Mercury
  const earthRotationSpeed = 0.01; // Rotation speed for Earth

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();//creating instance of webGl
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Create a GUI instance
    const gui = new dat.GUI();
    let speed = 1;
    let speed1 = 1;
    const options = {
        speed: 1,
        speed1 : 1
    }
    gui.add(options, 'speed', 0, 20);
    gui.add(options, 'speed1', 0, 20);
    
    const scene = new THREE.Scene();

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100); // color, intensity, distance
    pointLight2.position.set(10, 10, 10);
    scene.add(pointLight2);
    
    
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    
    //orbit control ....to navigate
    const orbit = new OrbitControls(camera, renderer.domElement)
    
    camera.position.set(-90, 140, 140);
    orbit.update();
    
    //Creating ambient light
    const ambientLight = new THREE.AmbientLight(0x333333,0.8);
    scene.add(ambientLight);
    
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        'img/stars.jpg',
        'img/stars.jpg',
        'img/stars.jpg',
        'img/stars.jpg',
        'img/stars.jpg',
        'img/stars.jpg',
    ])
    
    const textureLoader = new THREE.TextureLoader();
    
    //creting sun sphere
    const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
    const sunMat = new THREE.MeshBasicMaterial({
        // color:"yellow",
        map: textureLoader.load('8k_sun.jpg')
    });
    const sun = new THREE.Mesh(sunGeometry, sunMat);
    scene.add(sun);
    
    function createPlanet(size, texture, position, ring) {
        //creting planet sphere
        const geo = new THREE.SphereGeometry(size, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(texture)
        });
        const mesh = new THREE.Mesh(geo, mat);
        const obj = new THREE.Object3D();
        obj.add(mesh);
        if (ring) {
            //creting planet ring
            const ringGeometry = new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32);
            const ringMat = new THREE.MeshBasicMaterial({
                map: textureLoader.load(ring.texture),
                side: THREE.DoubleSide
            });
            const ringMesh = new THREE.Mesh(ringGeometry, ringMat);
            obj.add(ringMesh);
            ringMesh.position.x = position;
            ringMesh.rotation.x = -0.5 * Math.PI
        }
        scene.add(obj);
        mesh.position.x = position;
        return { mesh, obj }
    }
    
    //planets
    const mercury = createPlanet(3.2, 'img/mercury.jpg', 28);
    mercury.obj.rotation.x = -0.1 * Math.PI
    
    const venus = createPlanet(5.8, 'img/venus.jpg', 44);
    
    const earth = createPlanet(3.2, 'img/venus.jpg', 62);
    
    const mars = createPlanet(4, 'img/mars.jpg', 78);
    
    const jupiter = createPlanet(12, 'img/jupiter.jpg', 100);
    
    //creting saturn with ring
    const saturn = createPlanet(10, 'img/saturn.jpg', 138, {
        innerRadius: 10,
        outerRadius: 20,
        texture: 'img/saturn ring.png'
    })
    
    const uranus = createPlanet(7, 'img/uranus.jpg', 176, {
        innerRadius: 7,
        outerRadius: 12,
        texture: 'img/uranus ring.png'
    });
    
    const neptune = createPlanet(7, 'img/neptune.jpg', 200);
    
    const pluto = createPlanet(2.8, 'img/pluto.jpg', 216);
    
    // Create a point light
    const pointLight = new THREE.PointLight(0xFFFFFF,1, 100000);
    pointLight.intensity = 10000
    // Add the point light to the scene
    pointLight.position.set(0, 0, 10); // Sun's position

    scene.add(pointLight);


//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color, Intensity
// directionalLight.position.set(0, 0, 1); // Position the light
// scene.add(directionalLight);

    
    
    function animate() {
        speed = options.speed;
        speed1 = options.speed1;
    
        //self-rotation
        sun.rotation.y += 0.01 * speed;//we can also use sun.rotateY(0.01)
        mercury.mesh.rotateY(0.004 * speed)
        venus.mesh.rotateY(0.002 * speed)
        earth.mesh.rotateY(0.02 * speed)
        mars.mesh.rotateY(0.018 * speed)
        jupiter.mesh.rotateY(0.04 * speed)
        saturn.mesh.rotateY(0.038 * speed)
        uranus.mesh.rotateY(0.03 * speed)
        neptune.mesh.rotateY(0.032 * speed)
        pluto.mesh.rotateY(0.008 * speed);
    
        //roatation around sun
        mercury.obj.rotateY(0.04 * speed1)
        venus.obj.rotateY(0.015* speed1)
        earth.obj.rotateY(0.01* speed1)
        mars.obj.rotateY(0.008* speed1)
        jupiter.obj.rotateY(0.002* speed1)
        saturn.obj.rotateY(0.0009* speed1)
        uranus.obj.rotateY(0.0004* speed1)
        neptune.obj.rotateY(0.0001* speed1)
        pluto.obj.rotateY(0.00007* speed1);
    
        renderer.render(scene, camera);
    
    }
    
    renderer.setAnimationLoop(animate);
    // window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      // window.removeEventListener('resize', handleResize);
      if (refContainer.current && refContainer.current.contains(renderer.domElement)) {
        refContainer.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Only run on mount

  // Handle rotation input change
  const handleRotationChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      rotation.current = newValue; // Update rotation ref without re-rendering
    }
  };

  return (
    <>
      <input
        type="number"
        defaultValue={rotation.current}
        onChange={handleRotationChange}
      />
      <div ref={refContainer} />
    </>
  );
}

export default Three;
