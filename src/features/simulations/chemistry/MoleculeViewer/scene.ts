import * as THREE from 'three';
import { MoleculeData, AtomData, BondData } from './types';

export interface Molecule3DSceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  moleculeGroup: THREE.Group;
  dispose: () => void;
}

export function createMolecule3DScene(
  container: HTMLElement,
  width: number,
  height: number
): Molecule3DSceneContext {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f1d);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.replaceChildren(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
  mainLight.position.set(5, 10, 7);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
  fillLight.position.set(-5, -5, -3);
  scene.add(fillLight);

  const pointLight = new THREE.PointLight(0xf472b6, 1, 10);
  pointLight.position.set(0, 3, 2);
  scene.add(pointLight);

  // Molecule Parent Group
  const moleculeGroup = new THREE.Group();
  scene.add(moleculeGroup);

  const dispose = () => {
    renderer.dispose();
    renderer.forceContextLoss();
  };

  return {
    scene,
    camera,
    renderer,
    moleculeGroup,
    dispose,
  };
}

/**
 * Rebuilds the 3D meshes for a given molecule inside the moleculeGroup
 */
export function buildMoleculeMeshes(
  moleculeGroup: THREE.Group,
  molecule: MoleculeData,
  showBonds: boolean = true
): { geometries: THREE.BufferGeometry[]; materials: THREE.Material[] } {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  // Clear existing children
  while (moleculeGroup.children.length > 0) {
    const child = moleculeGroup.children[0];
    moleculeGroup.remove(child);
  }

  // 1. Render Atoms (Spheres)
  molecule.atoms.forEach((atom: AtomData) => {
    const sphereGeo = new THREE.SphereGeometry(atom.radius, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: atom.color,
      roughness: 0.25,
      metalness: 0.2,
    });
    const atomMesh = new THREE.Mesh(sphereGeo, sphereMat);
    atomMesh.position.set(...atom.position);
    moleculeGroup.add(atomMesh);

    geometries.push(sphereGeo);
    materials.push(sphereMat);
  });

  // 2. Render Bonds (Cylinders)
  if (showBonds) {
    molecule.bonds.forEach((bond: BondData) => {
      const atom1 = molecule.atoms[bond.from];
      const atom2 = molecule.atoms[bond.to];
      if (!atom1 || !atom2) return;

      const p1 = new THREE.Vector3(...atom1.position);
      const p2 = new THREE.Vector3(...atom2.position);
      const distance = p1.distanceTo(p2);
      const midPoint = p1.clone().add(p2).multiplyScalar(0.5);

      const radius = bond.order === 2 ? 0.07 : 0.09;
      const bondGeo = new THREE.CylinderGeometry(radius, radius, distance, 16);
      const bondMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.4,
        metalness: 0.5,
      });

      if (bond.order === 1) {
        const bondMesh = new THREE.Mesh(bondGeo, bondMat);
        bondMesh.position.copy(midPoint);
        bondMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p2.clone().sub(p1).normalize());
        moleculeGroup.add(bondMesh);

        geometries.push(bondGeo);
        materials.push(bondMat);
      } else if (bond.order === 2) {
        // Render dual bond cylinders
        const dir = p2.clone().sub(p1).normalize();
        const offsetAxis = new THREE.Vector3(0, 0, 1).cross(dir).normalize().multiplyScalar(0.12);

        [-1, 1].forEach((sign) => {
          const bMesh = new THREE.Mesh(bondGeo, bondMat);
          bMesh.position.copy(midPoint).add(offsetAxis.clone().multiplyScalar(sign));
          bMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          moleculeGroup.add(bMesh);
        });

        geometries.push(bondGeo);
        materials.push(bondMat);
      }
    });
  }

  return { geometries, materials };
}
