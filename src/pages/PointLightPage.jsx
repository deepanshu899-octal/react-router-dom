// src/Whiteboard.js
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const PointLightPage = () => {
  useEffect(() => {
    // Set up the scene
    let width = window.innerWidth;
    let height = window.innerHeight;
    const gui = new dat.GUI();

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x262626);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Add a Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5); // Position above and to the side
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(40, 80, 120);
    camera.lookAt(0, 0, 0);
    gui.add(camera.position, 'z', 10, 200, 1).name('camera-z');

    // Plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const plane = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    plane.rotateX(Math.PI / 2);
    plane.position.y = -1.75;
    plane.receiveShadow = true; // Allow plane to receive shadows
    scene.add(plane);

    // Create a group for the robot
    const robotGroup = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(4, 8, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Use MeshPhongMaterial
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 4; // Position the body above the plane
    robotGroup.add(body);

    // Head
    const headGeometry = new THREE.SphereGeometry(2);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00 }); // Use MeshPhongMaterial
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 10; // Position the head above the body
    robotGroup.add(head);

    // Arms
    const armGeometry = new THREE.BoxGeometry(1, 5, 1);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff }); // Use MeshPhongMaterial
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-3, 6, 0); // Position the left arm
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(3, 6, 0); // Position the right arm
    robotGroup.add(rightArm);

    // Add the robot group to the scene
    scene.add(robotGroup);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother controls
    controls.dampingFactor = 0.25;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      robotGroup.rotation.y += 0.11; // Rotate the robot group
      controls.update(); // Update controls
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onWindowResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (renderer.domElement) {
        document.body.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return null; // No buttons in this example
};

export default PointLightPage;
