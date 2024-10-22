import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Video_1() {
  const mountRef = useRef(null);
  let mixer; // Declare the AnimationMixer

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 10);

    // Create a renderer and append it to the DOM
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Enable shadow in Three.js
    renderer.shadowMap.enabled = true;

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Create a sphere (ball)
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.castShadow = true;

    // Add AxesHelper and GridHelper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(5, 50);
    scene.add(gridHelper);

    // Create a PlaneGeometry and a MeshStandardMaterial, then combine them into a mesh (plane)
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.receiveShadow = true;
    plane.rotateX(-Math.PI / 2);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add DirectionalLight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load the GLTF model (doggo.glb)
    const loader = new GLTFLoader();
    loader.load(
      '/doggo.glb', // Replace with the actual path
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0); // Adjust the position of the model in the scene
        model.castShadow = true;
        scene.add(model);

        // Initialize the AnimationMixer for the loaded model
        mixer = new THREE.AnimationMixer(model);

        // Get the first animation from the loaded glTF model and play it
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Variables for bouncing effect (for the ball)
    let velocity = 0;
    let gravity = -0.01;
    let bounceFactor = 1;
    let positionY = 3;

    // Animation loop
    const clock = new THREE.Clock(); // Clock for keeping track of time

    const animate = function () {
      requestAnimationFrame(animate);

      const delta = clock.getDelta(); // Get the time between frames

      // Update the animation mixer if it exists
      if (mixer) {
        mixer.update(delta); // Advance the animation according to the clock's delta time
      }

      // Apply gravity to the ball's velocity
      velocity += gravity;
      positionY += velocity;

      // Collision detection with the plane
      if (positionY <= 1) {
        positionY = 1;
        velocity = -velocity * bounceFactor;
      }

      // Update sphere position
      sphere.position.y = positionY;

      // Update the controls
      controls.update();

      // Render the scene from the perspective of the camera
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef}></div>;
}
