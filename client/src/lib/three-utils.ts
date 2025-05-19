import * as THREE from 'three';

interface SceneResult {
  cleanup: () => void;
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
  
  // Create abstract geometries for the hero section
  const geometry1 = new THREE.IcosahedronGeometry(1, 0);
  const geometry2 = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
  const geometry3 = new THREE.TetrahedronGeometry(0.8, 0);
  
  // Create materials
  const material1 = new THREE.MeshBasicMaterial({ 
    color: 0x0066CC, 
    wireframe: true 
  });
  const material2 = new THREE.MeshBasicMaterial({ 
    color: 0xFFFFFF, 
    wireframe: true 
  });
  const material3 = new THREE.MeshBasicMaterial({ 
    color: 0x444444, 
    wireframe: true 
  });
  
  // Create meshes
  const shape1 = new THREE.Mesh(geometry1, material1);
  const shape2 = new THREE.Mesh(geometry2, material2);
  const shape3 = new THREE.Mesh(geometry3, material3);
  
  // Position the shapes
  shape1.position.set(-2, 0, 0);
  shape2.position.set(0, 0, -2);
  shape3.position.set(2, 0, 0);
  
  // Add to scene
  scene.add(shape1);
  scene.add(shape2);
  scene.add(shape3);
  
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
    
    // Rotate shapes based on time
    shape1.rotation.x += 0.003;
    shape1.rotation.y += 0.005;
    
    shape2.rotation.x += 0.005;
    shape2.rotation.y += 0.003;
    
    shape3.rotation.x += 0.004;
    shape3.rotation.y += 0.002;
    
    // Subtle movement based on mouse position
    shape1.position.x = -2 + mouseX * 0.3;
    shape1.position.y = mouseY * 0.3;
    
    shape2.position.y = mouseY * 0.2;
    
    shape3.position.x = 2 + mouseX * 0.3;
    shape3.position.y = mouseY * 0.3;
    
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
    
    // Dispose of geometries and materials
    [geometry1, geometry2, geometry3].forEach(geometry => geometry.dispose());
    [material1, material2, material3].forEach(material => material.dispose());
    
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
  
  // Create skill spheres with labels
  const spheres = [];
  const textLabels = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Excel', 'Design'];
  
  textLabels.forEach((label, index) => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: index % 2 === 0 ? 0x0066CC : 0x333333,
      transparent: true,
      opacity: 0.7
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    
    // Distribute spheres in a circle
    const angle = (index / textLabels.length) * Math.PI * 2;
    const radius = 3;
    sphere.position.x = Math.cos(angle) * radius;
    sphere.position.z = Math.sin(angle) * radius;
    
    scene.add(sphere);
    spheres.push({
      mesh: sphere,
      label,
      baseX: sphere.position.x,
      baseZ: sphere.position.z,
      amplitude: 0.1 + Math.random() * 0.1
    });
  });
  
  camera.position.z = 7;
  
  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;
  
  const handleMouseMove = (event: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };
  
  container.addEventListener('mousemove', handleMouseMove);
  
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
    
    // Animate spheres
    spheres.forEach((sphere: any, index: number) => {
      const time = Date.now() * 0.001;
      const mesh = sphere.mesh;
      
      // Base rotation
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      
      // Floating movement
      mesh.position.y = Math.sin(time + index) * sphere.amplitude;
      
      // Mouse interaction
      mesh.position.x = sphere.baseX + mouseX * 0.5;
      mesh.position.z = sphere.baseZ + mouseY * 0.5;
      
      // Scale effect on hover
      const distance = Math.sqrt(
        Math.pow(mesh.position.x - mouseX * 3, 2) + 
        Math.pow(mesh.position.y - mouseY * 3, 2)
      );
      
      if (distance < 1) {
        mesh.scale.set(1.2, 1.2, 1.2);
      } else {
        mesh.scale.set(1, 1, 1);
      }
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
    
    container.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    
    // Dispose of resources
    spheres.forEach((sphere: any) => {
      scene.remove(sphere.mesh);
      sphere.mesh.geometry.dispose();
      sphere.mesh.material.dispose();
    });
    
    // Clear the scene
    scene.clear();
  };
  
  return { cleanup };
}
