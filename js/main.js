var timstamp = 0;

// -------- GUI --------
var gui = new dat.GUI();

var sunFolder = gui.addFolder("Sun");
sunFolder.add(ENVIRONMENT.pointLight, "intensity", 0, 2);
sunFolder.add(ENVIRONMENT.pointLight, "distance", 0, 500);
sunFolder.add(ENVIRONMENT.pointLight.position, "x", -180, 180);
sunFolder.add(ENVIRONMENT.pointLight.position, "y", -180, 180);
sunFolder.add(ENVIRONMENT.pointLight.position, "z", -180, 180);

var ambientLightFolder = gui.addFolder("Ambient Light");
ambientLightFolder.add(ENVIRONMENT.ambientLight, "intensity", 0, 2);

var mimasFolder = gui.addFolder("Mimas");
mimasFolder.add(ENVIRONMENT.mimas, "speed", 0, 50);
mimasFolder.add(ENVIRONMENT.mimas, "shouldOrbit");

var enceladusFolder = gui.addFolder("Enceladus");
enceladusFolder.add(ENVIRONMENT.enceladus, "speed", 0, 50);
enceladusFolder.add(ENVIRONMENT.enceladus, "shouldOrbit");

// -------- SCENE --------
var scene = new THREE.Scene();

// -------- CAMERA --------
var camera = new THREE.PerspectiveCamera(
  ENVIRONMENT.camera.fov,
  window.innerWidth / window.innerHeight,
  ENVIRONMENT.camera.near,
  ENVIRONMENT.camera.far
);
camera.position.set(
  ENVIRONMENT.camera.position.x,
  ENVIRONMENT.camera.position.y,
  ENVIRONMENT.camera.position.z
);

// -------- RENDERER --------
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// -------- CAMERA CONTROLS --------
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// -------- HELPERS --------
var helpers = new THREE.Group();
helpers.add(new THREE.AxesHelper(100));
// scene.add(helpers);

// -------- POINT LIGHT --------
var pointLight = new THREE.PointLight(
  ENVIRONMENT.pointLight.color,
  ENVIRONMENT.pointLight.intensity,
  ENVIRONMENT.pointLight.distance
);
pointLight.position.set(
  ENVIRONMENT.pointLight.position.x,
  ENVIRONMENT.pointLight.position.y,
  ENVIRONMENT.pointLight.position.z
);
scene.add(pointLight);

// -------- AMBIENT LIGHT --------
var ambientLight = new THREE.AmbientLight(
  ENVIRONMENT.ambientLight.color,
  ENVIRONMENT.ambientLight.intensity
);
scene.add(ambientLight);

var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
var textureLoader = new THREE.TextureLoader();

// -------- SATURN --------
var saturnTexture = textureLoader.load(ENVIRONMENT.saturn.texturePath);
var saturnBumpTexture = textureLoader.load(ENVIRONMENT.saturn.bumpPath);
var saturnGeometry = new THREE.SphereGeometry(
  ENVIRONMENT.saturn.radius,
  ENVIRONMENT.saturn.segments,
  ENVIRONMENT.saturn.segments
);
var saturnMaterial = new THREE.MeshPhongMaterial({
  color: 0xafafaf,
  map: saturnTexture,
  bumpMap: saturnBumpTexture,
  bumpScale: ENVIRONMENT.saturn.bumpScale
});
var saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.set(
  ENVIRONMENT.saturn.position.x,
  ENVIRONMENT.saturn.position.y,
  ENVIRONMENT.saturn.position.z
);
scene.add(saturn);

// -------- SATURN RING --------
var saturnRingTexture = textureLoader.load(ENVIRONMENT.saturnRings.texturePath);
var saturnRingGeometry = new THREE.XRingGeometry(
  1.2 * ENVIRONMENT.saturnRings.radius,
  2 * ENVIRONMENT.saturnRings.radius,
  2 * ENVIRONMENT.saturnRings.segments,
  5,
  0,
  Math.PI * 2
);
var saturnRingMaterial = new THREE.MeshBasicMaterial({
  map: saturnRingTexture,
  alphaMap: saturnRingTexture,
  side: THREE.DoubleSide,
  transparent: true
});
var saturnRings = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
scene.add(saturnRings);

// --------MIMAS --------
var mimasTexture = textureLoader.load(ENVIRONMENT.mimas.texurePath);
var mimasBumpTexture = textureLoader.load(ENVIRONMENT.mimas.bumpPath);
var mimasGeometry = new THREE.SphereGeometry(
  ENVIRONMENT.mimas.radius,
  ENVIRONMENT.mimas.segments,
  ENVIRONMENT.mimas.segments
);
var mimasMaterial = new THREE.MeshPhongMaterial({
  color: 0xafafaf,
  map: mimasTexture,
  bumpMap: mimasBumpTexture,
  bumpScale: ENVIRONMENT.mimas.bumpScale
});
var mimas = new THREE.Mesh(mimasGeometry, mimasMaterial);
mimas.position.set(
  ENVIRONMENT.mimas.position.x,
  ENVIRONMENT.mimas.position.y,
  ENVIRONMENT.mimas.position.z
);
scene.add(mimas);

// -------- ENCELADUS --------
var enceladusTexture = textureLoader.load(ENVIRONMENT.enceladus.texurePath);
var enceladusBumpTexture = textureLoader.load(ENVIRONMENT.enceladus.bumpPath);
var enceladusGeometry = new THREE.SphereGeometry(
  ENVIRONMENT.enceladus.radius,
  ENVIRONMENT.enceladus.segments,
  ENVIRONMENT.enceladus.segments
);
var enceladusMaterial = new THREE.MeshPhongMaterial({
  color: 0xafafaf,
  map: enceladusTexture,
  bumpMap: enceladusBumpTexture,
  bumpScale: ENVIRONMENT.enceladus.bumpScale
});
var enceladus = new THREE.Mesh(enceladusGeometry, enceladusMaterial);
enceladus.position.set(
  ENVIRONMENT.enceladus.position.x,
  ENVIRONMENT.enceladus.position.y,
  ENVIRONMENT.enceladus.position.z
);
scene.add(enceladus);

// -------- STARFIELD --------
var starfieldTexture = textureLoader.load(ENVIRONMENT.starfield.texturePath);
var starfieldMaterial = new THREE.MeshBasicMaterial({
  map: starfieldTexture,
  side: THREE.BackSide
});
var starfieldGeometry = new THREE.SphereGeometry(
  ENVIRONMENT.starfield.radius,
  ENVIRONMENT.starfield.segments,
  ENVIRONMENT.starfield.segments
);
var starfield = new THREE.Mesh(starfieldGeometry, starfieldMaterial);
scene.add(starfield);

// -------- LIGHT VISUALIZATION --------
var geometry = new THREE.SphereGeometry(2, 32, 32);
var material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff
});
var bulb = new THREE.Mesh(geometry, material);
bulb.position.set(
  ENVIRONMENT.pointLight.position.x,
  ENVIRONMENT.pointLight.position.y,
  ENVIRONMENT.pointLight.position.z
);
scene.add(bulb);

document.body.appendChild(renderer.domElement);

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// -------- MAIN LOOP --------
function render() {
  timestamp = Date.now() * 0.0001;
  requestAnimationFrame(render);

  saturn.rotation.y -= 0.001;

  camera.fov = ENVIRONMENT.camera.fov;

  pointLight.intensity = ENVIRONMENT.pointLight.intensity;
  pointLight.distance = ENVIRONMENT.pointLight.distance;
  pointLight.position.set(
    ENVIRONMENT.pointLight.position.x,
    ENVIRONMENT.pointLight.position.y,
    ENVIRONMENT.pointLight.position.z
  );

  bulb.position.set(
    ENVIRONMENT.pointLight.position.x,
    ENVIRONMENT.pointLight.position.y,
    ENVIRONMENT.pointLight.position.z
  );

  ambientLight.intensity = ENVIRONMENT.ambientLight.intensity;

  if (ENVIRONMENT.mimas.shouldOrbit) {
    mimas.position.x =
      Math.cos(timestamp * ENVIRONMENT.mimas.speed) *
      ENVIRONMENT.mimas.orbitRadius;
    mimas.position.z =
      Math.sin(timestamp * ENVIRONMENT.mimas.speed) *
      ENVIRONMENT.mimas.orbitRadius;
  }

  if (ENVIRONMENT.enceladus.shouldOrbit) {
    enceladus.position.x =
      Math.cos(timestamp * ENVIRONMENT.enceladus.speed) *
      ENVIRONMENT.enceladus.orbitRadius;
    enceladus.position.z =
      Math.sin(timestamp * ENVIRONMENT.enceladus.speed) *
      ENVIRONMENT.enceladus.orbitRadius;
  }

  renderer.render(scene, camera);
}
render();
