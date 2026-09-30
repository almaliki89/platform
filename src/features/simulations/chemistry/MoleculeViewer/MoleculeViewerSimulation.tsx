import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FlaskConical, RotateCcw, Eye, ZoomIn, ZoomOut, Sparkles, Info } from 'lucide-react';

interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
}

interface Bond {
  from: [number, number, number];
  to: [number, number, number];
}

interface MoleculeData {
  id: string;
  nameAr: string;
  formula: string;
  description: string;
  atoms: Atom[];
  bonds: Bond[];
}

const MOLECULES: Record<string, MoleculeData> = {
  h2o: {
    id: 'h2o',
    nameAr: 'جزيء الماء (H₂O)',
    formula: 'H₂O',
    description: 'يتكون جزيء الماء من ذرة أكسجين مركزية مرتبطة بذرتي هيدروجين برابطتين تساهميتين بزاوية تقارب 104.5 درجة.',
    atoms: [
      { element: 'O', x: 0, y: 0.2, z: 0, color: '#ef4444', radius: 0.7 }, // Oxygen
      { element: 'H', x: -1.2, y: -0.5, z: 0.3, color: '#f8fafc', radius: 0.4 }, // Hydrogen 1
      { element: 'H', x: 1.2, y: -0.5, z: 0.3, color: '#f8fafc', radius: 0.4 }, // Hydrogen 2
    ],
    bonds: [
      { from: [0, 0.2, 0], to: [-1.2, -0.5, 0.3] },
      { from: [0, 0.2, 0], to: [1.2, -0.5, 0.3] },
    ],
  },
  co2: {
    id: 'co2',
    nameAr: 'ثنائي أوكسيد الكربون (CO₂)',
    formula: 'CO₂',
    description: 'جزيء خطي يتكون من ذرة كربون مركزية مرتبطة بذرتي أكسجين بروابط تساهمية ثنائية.',
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: '#64748b', radius: 0.65 }, // Carbon
      { element: 'O', x: -1.8, y: 0, z: 0, color: '#ef4444', radius: 0.7 }, // Oxygen 1
      { element: 'O', x: 1.8, y: 0, z: 0, color: '#ef4444', radius: 0.7 }, // Oxygen 2
    ],
    bonds: [
      { from: [0, 0, 0], to: [-1.8, 0, 0] },
      { from: [0, 0, 0], to: [1.8, 0, 0] },
    ],
  },
  ch4: {
    id: 'ch4',
    nameAr: 'غاز الميثان (CH₄)',
    formula: 'CH₄',
    description: 'جزيء هيدروكربوني يأخذ شكلاً هندسياً رباعي الأوجه المنتظم (Tetrahedral) بزاوية 109.5 درجة.',
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: '#64748b', radius: 0.7 }, // Carbon
      { element: 'H', x: 0, y: 1.3, z: 0, color: '#f8fafc', radius: 0.4 },
      { element: 'H', x: -1.2, y: -0.5, z: 0.8, color: '#f8fafc', radius: 0.4 },
      { element: 'H', x: 1.2, y: -0.5, z: 0.8, color: '#f8fafc', radius: 0.4 },
      { element: 'H', x: 0, y: -0.5, z: -1.2, color: '#f8fafc', radius: 0.4 },
    ],
    bonds: [
      { from: [0, 0, 0], to: [0, 1.3, 0] },
      { from: [0, 0, 0], to: [-1.2, -0.5, 0.8] },
      { from: [0, 0, 0], to: [1.2, -0.5, 0.8] },
      { from: [0, 0, 0], to: [0, -0.5, -1.2] },
    ],
  },
};

export const MoleculeViewerSimulation: React.FC = () => {
  const [selectedMolecule, setSelectedMolecule] = useState<string>('h2o');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentMol = MOLECULES[selectedMolecule];

  useEffect(() => {
    if (!containerRef.current) return;
    const currentContainer = containerRef.current;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentContainer.clientWidth / currentContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Molecule Group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Render Atoms
    currentMol.atoms.forEach((atom) => {
      const geometry = new THREE.SphereGeometry(atom.radius, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: atom.color,
        roughness: 0.3,
        metalness: 0.2,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(atom.x, atom.y, atom.z);
      moleculeGroup.add(sphere);
    });

    // Render Bonds
    currentMol.bonds.forEach((bond) => {
      const start = new THREE.Vector3(...bond.from);
      const end = new THREE.Vector3(...bond.to);
      const direction = new THREE.Vector3().subVectors(end, start);
      const length = direction.length();

      const geometry = new THREE.CylinderGeometry(0.12, 0.12, length, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });
      const cylinder = new THREE.Mesh(geometry, material);

      cylinder.position.copy(start).add(end).multiplyScalar(0.5);
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      moleculeGroup.add(cylinder);
    });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isRotating) {
        moleculeGroup.rotation.y += 0.008;
        moleculeGroup.rotation.x += 0.003;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentContainer) return;
      camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentContainer && renderer.domElement) {
        currentContainer.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedMolecule, isRotating, currentMol]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>محاكاة كيميائية 3D • الكيمياء للمرحلة المتوسطة</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">عارض الجزيئات ثلاثي الأبعاد (3D Molecule Viewer)</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            استكشف البنية الفراغية والروابط التساهمية للـجزيئات الكيميائية المختلفة بصورة تفاعلية ثلاثية الأبعاد.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white transition-all shadow-md ${
              isRotating ? 'bg-amber-600 hover:bg-amber-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isRotating ? 'إيقاف الدوران' : 'تشغيل الدوران'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Molecule Selector & Info */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-6">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span>اختر الجزيء الكيميائي</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {Object.values(MOLECULES).map((mol) => (
              <button
                key={mol.id}
                onClick={() => setSelectedMolecule(mol.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-right ${
                  selectedMolecule === mol.id
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="font-bold text-sm">{mol.nameAr}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/20">{mol.formula}</span>
              </button>
            ))}
          </div>

          <div className="bg-rose-950/10 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-200 dark:border-rose-800/50 space-y-2">
            <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold">معلومات الجزيء:</div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentMol.description}
            </p>
          </div>
        </div>

        {/* 3D Canvas Container */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-slate-950 rounded-2xl p-6 relative overflow-hidden min-h-[380px]">
          {/* Top Badge */}
          <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-white font-mono text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>{currentMol.nameAr}</span>
          </div>

          {/* Three.js DOM Mount */}
          <div ref={containerRef} className="w-full h-[320px] my-auto cursor-grab active:cursor-grabbing"></div>

          {/* Bottom Info Footer */}
          <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <Info className="w-4 h-4 text-rose-400 shrink-0" />
            <span>الذرات الحمراء تثل الأكسجين، الرمادية الكربون، والبيضاء ذرات الهيدروجين المرتبطة بروابط تساهمية.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
