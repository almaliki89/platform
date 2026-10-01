import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { supportsWebGL } from '../../core/webgl';
import { Zap, Eye, AlertCircle } from 'lucide-react';

interface NewtonSceneProps {
  position: number; // meters along track
  force: number; // N
  mass: number; // kg
  acceleration: number; // m/s^2
  velocity: number; // m/s
  trackLength?: number;
}

export const NewtonScene: React.FC<NewtonSceneProps> = ({
  position,
  force,
  mass,
  acceleration,
  velocity,
  trackLength = 50,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cartGroupRef = useRef<THREE.Group | null>(null);
  const forceArrowRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!supportsWebGL()) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = Math.min(360, Math.max(260, window.innerWidth < 640 ? 240 : 320));

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // dark slate background
    scene.fog = new THREE.Fog(0x0f172a, 35, 70);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 1.2, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLight.position.set(0, 4, 3);
    scene.add(pointLight);

    // Floor Track & Grid
    const trackWidth = 5;
    const trackGeo = new THREE.PlaneGeometry(trackLength * 2, trackWidth);
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.2,
    });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.rotation.x = -Math.PI / 2;
    track.receiveShadow = true;
    scene.add(track);

    // Track Rails
    const railGeo = new THREE.BoxGeometry(trackLength * 2, 0.12, 0.12);
    const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    
    const rail1 = new THREE.Mesh(railGeo, railMat);
    rail1.position.set(0, 0.06, 1.2);
    rail1.castShadow = true;
    scene.add(rail1);

    const rail2 = new THREE.Mesh(railGeo, railMat);
    rail2.position.set(0, 0.06, -1.2);
    rail2.castShadow = true;
    scene.add(rail2);

    // Meter Markers along track
    const markerGeo = new THREE.BoxGeometry(0.08, 0.02, 2.6);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    for (let x = -trackLength; x <= trackLength; x += 2) {
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(x, 0.01, 0);
      scene.add(marker);
    }

    // Cart Group
    const cartGroup = new THREE.Group();
    cartGroup.position.set(0, 0.5, 0);
    scene.add(cartGroup);
    cartGroupRef.current = cartGroup;

    // Cart Body
    const bodyGeo = new THREE.BoxGeometry(2.4, 0.8, 1.8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Cyan-blue cart
      roughness: 0.3,
      metalness: 0.4,
    });
    const cartBody = new THREE.Mesh(bodyGeo, bodyMat);
    cartBody.position.y = 0.3;
    cartBody.castShadow = true;
    cartGroup.add(cartBody);

    // Cart Mass Plate/Cargo (scales with mass)
    const cargoGeo = new THREE.BoxGeometry(1.6, 0.5, 1.2);
    const cargoMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      metalness: 0.6,
      roughness: 0.4,
    });
    const cargo = new THREE.Mesh(cargoGeo, cargoMat);
    cargo.position.y = 0.95;
    cargo.castShadow = true;
    cartGroup.add(cargo);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const wheelPositions = [
      [-0.8, -0.15, 0.95],
      [0.8, -0.15, 0.95],
      [-0.8, -0.15, -0.95],
      [0.8, -0.15, -0.95],
    ];

    const wheels: THREE.Mesh[] = [];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.castShadow = true;
      cartGroup.add(wheel);
      wheels.push(wheel);
    });
    wheelsRef.current = wheels;

    // Force Vector Arrow
    const forceArrowGroup = new THREE.Group();
    forceArrowGroup.position.set(1.2, 0.4, 0);

    const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 1, 16);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.rotation.z = -Math.PI / 2;
    shaft.position.x = 0.5;
    forceArrowGroup.add(shaft);

    const coneGeo = new THREE.ConeGeometry(0.24, 0.5, 16);
    const coneMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309 });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.z = -Math.PI / 2;
    cone.position.x = 1.25;
    forceArrowGroup.add(cone);

    cartGroup.add(forceArrowGroup);
    forceArrowRef.current = forceArrowGroup;

    // Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth || 600;
      const newHeight = Math.min(360, Math.max(260, window.innerWidth < 640 ? 240 : 320));
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let lastRenderTime = performance.now();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      lastRenderTime = now;

      // Update camera focus following cart smoothly
      if (cartGroupRef.current) {
        camera.position.x = cartGroupRef.current.position.x;
        camera.lookAt(cartGroupRef.current.position.x, 1.2, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup Three.js resources
      renderer.dispose();
      [trackGeo, railGeo, markerGeo, bodyGeo, cargoGeo, wheelGeo, shaftGeo, coneGeo].forEach((g) =>
        g.dispose()
      );
      [trackMat, railMat, markerMat, bodyMat, cargoMat, wheelMat, shaftMat, coneMat].forEach((m) =>
        m.dispose()
      );
    };
  }, [trackLength]);

  // Synchronize dynamic position and force vector scale with Three.js objects
  useEffect(() => {
    // Map position (0 to 50m) to 3D coordinate space with loop or clamp
    const x3d = (position % trackLength) - 10;
    if (cartGroupRef.current) {
      cartGroupRef.current.position.x = x3d;
    }

    // Rotate wheels based on position
    if (wheelsRef.current.length > 0) {
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.z = -position * 2.5;
      });
    }

    // Scale force vector length proportional to force (e.g. 0 to 100N -> 0.1 to 3.0 scale)
    if (forceArrowRef.current) {
      if (force <= 0.5) {
        forceArrowRef.current.visible = false;
      } else {
        forceArrowRef.current.visible = true;
        const scaleX = Math.max(0.3, Math.min(3.5, force / 20));
        forceArrowRef.current.scale.set(scaleX, 1, 1);
      }
    }
  }, [position, force, trackLength]);

  if (!webglSupported) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-4">
        <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
        <p className="text-sm font-semibold">
          متصفحك لا يدعم تسريع WebGL ثلاثي الأبعاد.
        </p>
        <div className="bg-slate-800 p-4 rounded-xl text-xs font-mono">
          الموضع: {position.toFixed(2)}m | القوة: {force}N | الكتلة: {mass}kg
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
      <div ref={mountRef} className="w-full h-64 sm:h-80 cursor-grab active:cursor-grabbing" />

      {/* 3D Scene HUD Overlay */}
      <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] font-medium text-slate-300 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>محاكاة فيزيائية ثلاثية الأبعاد 3D</span>
      </div>

      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-amber-400 pointer-events-none">
        سهم القوة F = {force} N {force > 0 ? '→' : ''}
      </div>

      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-cyan-300 pointer-events-none">
        المسافة x = {position.toFixed(2)} m
      </div>
    </div>
  );
};
