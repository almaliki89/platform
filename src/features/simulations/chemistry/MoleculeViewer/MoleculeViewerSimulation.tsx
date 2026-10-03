import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SimulationShell } from '../../core/SimulationShell';
import { SimulationControls } from '../../core/SimulationControls';
import { SimulationHUD, HUDMetric } from '../../core/SimulationHUD';
import { supportsWebGL } from '../../core/webgl';
import { MOLECULES_CATALOG } from './moleculeData';
import { MoleculeData } from './types';
import { createMolecule3DScene, buildMoleculeMeshes } from './scene';
import {
  FlaskConical,
  RotateCcw,
  Eye,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Info,
  Layers,
  Compass,
  AlertCircle,
} from 'lucide-react';

export const MoleculeViewerSimulation: React.FC = () => {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('h2o');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showBonds, setShowBonds] = useState<boolean>(true);
  const [showAtomLabels, setShowAtomLabels] = useState<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  const mountRef = useRef<HTMLDivElement>(null);
  const sceneContextRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    moleculeGroup: THREE.Group;
    dispose: () => void;
  } | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  const currentMolecule =
    MOLECULES_CATALOG.find((m) => m.id === selectedMoleculeId) || MOLECULES_CATALOG[0];

  // Initialize Three.js scene
  useEffect(() => {
    if (!supportsWebGL()) {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = Math.min(380, Math.max(280, window.innerWidth < 640 ? 260 : 340));

    const ctx = createMolecule3DScene(container, width, height);
    sceneContextRef.current = ctx;

    // Build meshes
    let meshResources = buildMoleculeMeshes(ctx.moleculeGroup, currentMolecule, showBonds);

    // Pointer event listeners for orbit rotation
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !sceneContextRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevPointerRef.current.x;
      const deltaY = clientY - prevPointerRef.current.y;

      sceneContextRef.current.moleculeGroup.rotation.y += deltaX * 0.01;
      sceneContextRef.current.moleculeGroup.rotation.x += deltaY * 0.01;

      prevPointerRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!sceneContextRef.current) return;
      const cam = sceneContextRef.current.camera;
      cam.position.z = Math.max(3.5, Math.min(10, cam.position.z + e.deltaY * 0.005));
    };

    const dom = ctx.renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // Resize Handler
    const handleResize = () => {
      if (!container || !sceneContextRef.current) return;
      const newWidth = container.clientWidth || 600;
      const newHeight = Math.min(380, Math.max(280, window.innerWidth < 640 ? 260 : 340));
      ctx.camera.aspect = newWidth / newHeight;
      ctx.camera.updateProjectionMatrix();
      ctx.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDraggingRef.current && sceneContextRef.current) {
        sceneContextRef.current.moleculeGroup.rotation.y += 0.008;
      }

      ctx.renderer.render(ctx.scene, ctx.camera);
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);

      meshResources.geometries.forEach((g) => g.dispose());
      meshResources.materials.forEach((m) => m.dispose());
      ctx.dispose();
    };
  }, []);

  // Update molecule meshes when selectedMolecule or showBonds changes
  useEffect(() => {
    if (!sceneContextRef.current) return;
    const { moleculeGroup } = sceneContextRef.current;
    const resources = buildMoleculeMeshes(moleculeGroup, currentMolecule, showBonds);

    return () => {
      resources.geometries.forEach((g) => g.dispose());
      resources.materials.forEach((m) => m.dispose());
    };
  }, [currentMolecule, showBonds]);

  const handleResetCamera = () => {
    if (!sceneContextRef.current) return;
    const { camera, moleculeGroup } = sceneContextRef.current;
    camera.position.set(0, 0, 6.5);
    moleculeGroup.rotation.set(0, 0, 0);
  };

  const handleZoom = (delta: number) => {
    if (!sceneContextRef.current) return;
    const cam = sceneContextRef.current.camera;
    cam.position.z = Math.max(3.5, Math.min(10, cam.position.z + delta));
  };

  const metrics: HUDMetric[] = [
    {
      label: 'الشكل الهندسي للجزيء',
      value: currentMolecule.geometryType,
      color: 'text-rose-500 dark:text-rose-400',
    },
    {
      label: 'التهجين المداري للذرة المركزية',
      value: currentMolecule.hybridState,
      color: 'text-cyan-500 dark:text-cyan-400',
      formula: 'Hybridization',
    },
    {
      label: 'الزاوية بين الروابط',
      value: currentMolecule.bondAngle,
      color: 'text-amber-500 dark:text-amber-400',
      formula: 'Bond Angle',
    },
    {
      label: 'قطبية الجزيء',
      value: currentMolecule.polarity,
      color: 'text-emerald-500 dark:text-emerald-400',
    },
  ];

  return (
    <SimulationShell
      title="عارض الجزيئات والروابط الكيميائية 3D"
      subjectTitle="الكيمياء • الروابط والتناسق الجزيئي"
      topic="التهجين والتركيب الفراغي للجزيئات (VSEPR)"
      grade="الصف الثالث المتوسط والصف الخامس العلمي"
      description="مختبر ثلاثي الأبعاد تفاعلي لاستكشاف التوزيع الفراغي للذرات، ونظرية تنافر أزواج إلكترونات التكافؤ، وتأثير الأزواج الحرة على الزاوية بين الروابط."
      learningObjectives={[
        'استيعاب نظرية تنافر أزواج إلكترونات غلاف التكافؤ (VSEPR)',
        'فهم سبب انحراف زاوية الماء (104.5°) والميثان (109.5°) والأمونيا (107.3°)',
        'التمييز بين الروابط الأحادية (سيجما σ) والمزدوجة (سيجما σ + باي π)',
        'تحديد قطبية الجزيء بناء على تناظر وتوزيع الشحنات في الفضاء',
      ]}
      educationalNote={
        <div className="space-y-2 text-slate-700 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white">
            ملاحظة منهجية عن {currentMolecule.nameAr} ({currentMolecule.formula}):
          </p>
          <p className="leading-relaxed">{currentMolecule.descriptionAr}</p>
          <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">التهجين:</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {currentMolecule.hybridState}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">الزاوية المقاسة:</span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {currentMolecule.bondAngle}
              </span>
            </div>
          </div>
        </div>
      }
      visualization={
        <div className="space-y-3">
          {/* Molecule Quick Selection Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2.5 rounded-xl">
            <span className="text-xs text-slate-400 px-2 font-medium">اختر الجزيء:</span>
            {MOLECULES_CATALOG.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMoleculeId(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedMoleculeId === m.id
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {m.formula} • {m.nameAr}
              </button>
            ))}
          </div>

          {/* 3D Canvas Area */}
          {!webglSupported ? (
            <div className="bg-slate-950 text-white rounded-2xl p-8 text-center space-y-4 border border-slate-800">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold">تعذر تشغيل عارض WebGL ثلاثي الأبعاد</h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                يمكنك الاطلاع على الصيغة والبيانات الكيميائية أدناه بشكل كامل.
              </p>
              <div className="bg-slate-900 p-4 rounded-xl inline-block font-mono text-cyan-400 text-xl font-bold">
                {currentMolecule.formula} ({currentMolecule.geometryType})
              </div>
            </div>
          ) : (
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              <div
                ref={mountRef}
                className="w-full h-72 sm:h-84 cursor-grab active:cursor-grabbing"
              />

              {/* 3D Scene Controls Overlay */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 text-white">
                <button
                  type="button"
                  onClick={() => handleZoom(-0.8)}
                  title="تكبير"
                  aria-label="تكبير"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(0.8)}
                  title="تصغير"
                  aria-label="تصغير"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetCamera}
                  title="إعادة ضبط زاوية الكاميرا"
                  aria-label="إعادة ضبط زاوية الكاميرا"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-all"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>

              {/* Atom Label overlay chips */}
              {showAtomLabels && (
                <div className="absolute bottom-3 right-3 flex flex-wrap gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 pointer-events-none">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> O أكسجين
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> C كربون
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> N نيتروجين
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-white inline-block border border-slate-400" /> H هيدروجين
                  </span>
                </div>
              )}

              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-rose-400 pointer-events-none">
                {currentMolecule.nameAr} ({currentMolecule.formula})
              </div>
            </div>
          )}
        </div>
      }
      controls={
        <SimulationControls onReset={handleResetCamera}>
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              خيارات التحكم والتدوير الفراغي:
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  autoRotate
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{autoRotate ? 'إيقاف الدوران' : 'دوران تلقائي'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowBonds(!showBonds)}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  showBonds
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{showBonds ? 'إخفاء الروابط' : 'إظهار الروابط'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowAtomLabels(!showAtomLabels)}
              className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                showAtomLabels
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAtomLabels ? 'إخفاء دليل الذرات' : 'إظهار دليل الذرات'}</span>
            </button>
          </div>
        </SimulationControls>
      }
      outputs={<SimulationHUD metrics={metrics} />}
      onReset={handleResetCamera}
    />
  );
};
