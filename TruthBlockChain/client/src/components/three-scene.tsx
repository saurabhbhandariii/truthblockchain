import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1)
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x0066FF, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.6 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x00FFFF, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.6 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x6366F1, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.6 
      })
    ];

    const meshes: THREE.Mesh[] = [];
    
    // Create multiple floating objects
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    camera.position.z = 8;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Rotate all meshes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + (index * 0.001);
        mesh.rotation.y += 0.005 + (index * 0.001);
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });
      
      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-10" />;
}
