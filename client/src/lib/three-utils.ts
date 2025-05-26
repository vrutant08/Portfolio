import * as THREE from 'three';

interface SceneResult {
  cleanup: () => void;
}

interface Shape3D {
  mesh: any; // fallback to any due to type issues
  rotSpeed: {
    x: number;
    y: number;
    z: number;
  };
}

interface CustomShape3D {
  mesh: any; // fallback to any due to type issues
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
  animation: {
    amplitude: number;
    frequency: number;
    phase: number;
  };
  initialY: number;
}

export function createHeroScene(container: HTMLElement): SceneResult {
  // Basic Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Create various geometric shapes
  const geometries = [
    new THREE.IcosahedronGeometry(0.8, 0),
    new THREE.TetrahedronGeometry(0.8, 0),
    new THREE.OctahedronGeometry(0.7, 0),
    new THREE.DodecahedronGeometry(0.7, 0),
    new THREE.ConeGeometry(0.5, 1, 4),
  ];
  
  // Create materials with white wireframe for all shapes
  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true }),
    new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true })
  ];
  
  const shapes: Shape3D[] = [];
  
  // Create and position shapes randomly
  for (let i = 0; i < geometries.length; i++) {
    const shape = new THREE.Mesh(geometries[i], materials[i]);
    
    // Random position within a certain area
    shape.position.x = (Math.random() - 0.5) * 8;
    shape.position.y = (Math.random() - 0.5) * 6;
    shape.position.z = (Math.random() - 0.5) * 4 - 2; // Slightly negative to keep in front of camera
    
    // Random rotation
    shape.rotation.x = Math.random() * Math.PI;
    shape.rotation.y = Math.random() * Math.PI;
    shape.rotation.z = Math.random() * Math.PI;
    
    // Random rotation speeds
    const rotSpeed = {
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01
    };
    
    shapes.push({ mesh: shape, rotSpeed });
    scene.add(shape);
  }
  
  // Position camera
  camera.position.z = 5;
  
  // Mouse move effect
  let mouseX = 0;
  let mouseY = 0;
  
  // Track mouse position
  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  
  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Animation loop
  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    
    // Rotate and animate shapes
    shapes.forEach((shape, index) => {
      // Continuous rotation
      shape.mesh.rotation.x += shape.rotSpeed.x;
      shape.mesh.rotation.y += shape.rotSpeed.y;
      shape.mesh.rotation.z += shape.rotSpeed.z;
      
      // Subtle floating movement
      const time = Date.now() * 0.0005;
      shape.mesh.position.y += Math.sin(time + index) * 0.003;
    });
    
    // Subtle camera movement based on mouse
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
    
    // Store animation ID for cleanup
    (animate as any).id = animationId;
  };
  
  animate();
  
  // Cleanup function
  const cleanup = () => {
    if ((animate as any).id) {
      cancelAnimationFrame((animate as any).id);
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    
    // Dispose of resources
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    shapes.forEach(shape => scene.remove(shape.mesh));
    
    // Clear the scene
    scene.clear();
  };
  
  return { cleanup };
}

export function createSkillsScene(container: HTMLElement): SceneResult {
  // Basic Three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Create different geometric shapes
  const objects: CustomShape3D[] = [];
  const shapeConfigs = [
    // Code symbols (brackets, slashes, dots)
    { geometry: new THREE.BoxGeometry(0.6, 0.8, 0.1), position: { x: -2.5, y: 1.5, z: 0 }, color: 0xFFFFFF },
    { geometry: new THREE.BoxGeometry(0.3, 0.9, 0.1), position: { x: 2.2, y: -1.2, z: -1 }, color: 0xFFFFFF },
    { geometry: new THREE.CylinderGeometry(0.1, 0.1, 1, 6), position: { x: -1.8, y: -1.5, z: -2 }, color: 0xFFFFFF },
    { geometry: new THREE.TetrahedronGeometry(0.5, 0), position: { x: 1.2, y: 1.8, z: -3 }, color: 0xFFFFFF },
    { geometry: new THREE.IcosahedronGeometry(0.4, 0), position: { x: 3, y: 0.5, z: -2.5 }, color: 0xFFFFFF },
    { geometry: new THREE.OctahedronGeometry(0.4, 0), position: { x: -3, y: 0, z: -1.5 }, color: 0xFFFFFF },
    { geometry: new THREE.DodecahedronGeometry(0.35, 0), position: { x: 0, y: -2, z: -1 }, color: 0xFFFFFF },
    { geometry: new THREE.RingGeometry(0.3, 0.5, 8), position: { x: -1, y: 2, z: -2 }, color: 0xFFFFFF },
  ];
  
  // Create objects with random rotations and animations
  shapeConfigs.forEach(shape => {
    const material = new THREE.MeshBasicMaterial({ 
      color: shape.color,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    
    const mesh = new THREE.Mesh(shape.geometry, material);
    mesh.position.set(shape.position.x, shape.position.y, shape.position.z);
    
    // Random initial rotation
    mesh.rotation.x = Math.random() * Math.PI * 2;
    mesh.rotation.y = Math.random() * Math.PI * 2;
    mesh.rotation.z = Math.random() * Math.PI * 2;
    
    // Store rotation speeds
    const rotationSpeed = {
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01
    };
    
    // Store animation settings
    const animation = {
      amplitude: 0.05 + Math.random() * 0.1,
      frequency: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2
    };
    
    // Add to scene and objects array
    scene.add(mesh);
    objects.push({
      mesh,
      rotationSpeed,
      animation,
      initialY: mesh.position.y
    });
  });
  
  // Position camera
  camera.position.z = 6;
  
  // Add subtle camera movement
  let cameraMovementPhase = 0;
  
  // Handle container resize
  const handleResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Animation loop
  const animate = () => {
    const animationId = requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    
    // Subtle camera movement in a circular pattern
    cameraMovementPhase += 0.003;
    camera.position.x = Math.sin(cameraMovementPhase) * 0.5;
    camera.position.y = Math.cos(cameraMovementPhase) * 0.3;
    camera.lookAt(scene.position);
    
    // Animate each object
    objects.forEach((obj) => {
      // Rotation
      obj.mesh.rotation.x += obj.rotationSpeed.x;
      obj.mesh.rotation.y += obj.rotationSpeed.y;
      obj.mesh.rotation.z += obj.rotationSpeed.z;
      
      // Floating movement
      obj.mesh.position.y = obj.initialY + 
        Math.sin(time * obj.animation.frequency + obj.animation.phase) * 
        obj.animation.amplitude;
    });
    
    renderer.render(scene, camera);
    
    // Store animation ID for cleanup
    (animate as any).id = animationId;
  };
  
  animate();
  
  // Cleanup function
  const cleanup = () => {
    if ((animate as any).id) {
      cancelAnimationFrame((animate as any).id);
    }
    
    window.removeEventListener('resize', handleResize);
    
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    
    // Dispose of resources
    objects.forEach(obj => {
      scene.remove(obj.mesh);
      obj.mesh.geometry.dispose();
      obj.mesh.material.dispose();
    });
    
    // Clear the scene
    scene.clear();
  };
  
  return { cleanup };
}
