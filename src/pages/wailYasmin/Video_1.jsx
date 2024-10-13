import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function Video_1() {
  const mountRef = useRef(null);

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

    //enabling shadow in threejs
    renderer.shadowMap.enabled = true;

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping (inertia) for smoother controls
    controls.dampingFactor = 0.25;

    // Create a sphere (ball)
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64); // radius: 1
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x0077ff,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphere.castShadow = true;

    // Add AxesHelper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Add GridHelper
    const gridHelper = new THREE.GridHelper(5, 50); // size: 5, divisions: 50
    scene.add(gridHelper);

    // Create a PlaneGeometry and a MeshBasicMaterial, then combine them into a mesh (plane)
    const planeGeometry = new THREE.PlaneGeometry(10, 10); // larger plane for a better effect
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.receiveShadow = true
    plane.rotateX(-Math.PI / 2); // Rotate to make it horizontal

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color: white, intensity: 0.5
    scene.add(ambientLight);

    // Add DirectionalLight
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2); // color: white, intensity: 1
    directionalLight.position.set(5, 10, 7); // Set the position of the light
    // scene.add(directionalLight);
    directionalLight.castShadow = true;

    // Optionally, add a helper to visualize the light's direction
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
    scene.add(directionalLightHelper);

    // Add SpotLight
    const spotLight = new THREE.SpotLight(0xffffff); // color: white
    spotLight.position.set(5, 10, 5); // Set the position of the spotlight
    spotLight.angle = Math.PI / 60; // Set the spotlight cone's spread angle
    spotLight.penumbra = 0.1; // Penumbra: smoothness of the spotlight's edges
    spotLight.intensity = 100; // Intensity of the light
    spotLight.castShadow = true
    
    scene.add(spotLight);

// // Optionally, add a helper to visualize the spotlight's direction and target
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);



    // Variables for bouncing effect
    let velocity = 0; // Velocity of the sphere (ball)
    let gravity = -0.01; // Simulating gravity
    let bounceFactor = 1; // Energy loss after bouncing
    let positionY = 3; // Initial height of the ball

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      // Apply gravity to the ball's velocity
      velocity += gravity;
      positionY += velocity;

      // Collision detection with the plane
      if (positionY <= 1) {
        positionY = 1; // Stop the ball at the surface
        velocity = -velocity * bounceFactor; // Reverse velocity and apply bounce factor
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
      // mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef}></div>;
}
