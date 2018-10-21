const ENVIRONMENT = {
  pointLight: {
    color: 0xffffff,
    intensity: 1,
    distance: 300,
    position: { x: 90, y: 90, z: 0 }
  },
  ambientLight: {
    color: 0xffffff,
    intensity: 0.1
  },
  camera: {
    fov: 75,
    near: 0.1,
    far: 2000,
    position: { x: 0, y: 40, z: 100 }
  },
  starfield: {
    radius: 1000,
    texturePath: "textures/galaxy_starfield.jpg",
    segments: 16
  },
  saturn: {
    radius: 25,
    segments: 64,
    position: { x: 0, y: 0, z: 0 },
    texturePath: "textures/saturnSurface.jpg",
    bumpPath: "textures/saturnSurface_bump.jpg",
    bumpScale: 0.5
  },
  saturnRings: {
    radius: 25,
    segments: 64,
    texturePath: "textures/8k_saturn_ring_alpha.png"
  },
  mimas: {
    radius: 1,
    segments: 8,
    position: { x: 50, y: 0, z: 0 },
    orbitRadius: 50,
    speed: 10,
    texurePath: "textures/mimas.png",
    bumpPath: "textures/mimas-bump.png",
    bumpScale: 0.1,
    shouldOrbit: true
  },
  enceladus: {
    radius: 2,
    segments: 32,
    position: { x: -70, y: 0, z: 0 },
    orbitRadius: 70,
    speed: 5,
    texurePath: "textures/enceladus-2.jpg",
    bumpPath: "textures/enceladus-2-bump.jpg",
    bumpScale: 0.1,
    shouldOrbit: true
  }
};
