 // tutorial from https://www.youtube.com/watch?v=cp-H_6VODko

 let renderer, scene, camera, controls;

 init()

 function init() {
     // Renderer
     renderer = new THREE.WebGLRenderer({
         antialias: true
     });
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.getElementById("skyBox").appendChild(renderer.domElement);

     // Scene
     scene = new THREE.Scene();

     // Camera
     camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 50000);

     // Controls
     controls = new THREE.OrbitControls(camera, renderer.domElement);

     camera.position.set(0, 0, 1000);
     controls.autorotate = true;
     controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
     controls.dampingFactor = 1;
     controls.minDistance = 10;
     controls.maxDistance = 200;
     controls.update();

     // Textures
     let texture_north = new THREE.TextureLoader().load('textures/north.png');
     let texture_sky = new THREE.TextureLoader().load('textures/top.png');
     let texture_west = new THREE.TextureLoader().load('textures/west.png');
     let texture_south = new THREE.TextureLoader().load('textures/south.png');
     let texture_ground = new THREE.TextureLoader().load('textures/ground.png');
     let texture_east = new THREE.TextureLoader().load('textures/east.png');

     let materials = [];
     // X+ EAST
     materials.push(new THREE.MeshBasicMaterial({
         map: texture_east
     }));
     // X- WEST
     materials.push(new THREE.MeshBasicMaterial({
         map: texture_west
     }));
     // Y+ SKY
     materials.push(new THREE.MeshBasicMaterial({
         map: texture_sky
     }));
     // Y- GROUND
     materials.push(new THREE.MeshBasicMaterial({
         map: texture_ground
     }));
     // Z- SOUTH
     materials.push(new THREE.MeshBasicMaterial({
         color: "#000000"
     }));
     // Z+ NORTH
     materials.push(new THREE.MeshBasicMaterial({
         map: texture_north
     }));


     materials.forEach(element => {
         element.side = THREE.BackSide;
     });



     // Geometry 
     let skyBoxGeo = new THREE.BoxGeometry(1344, 216, 288); // volumen in inches
     let skyBox = new THREE.Mesh(skyBoxGeo, materials);
     scene.add(skyBox);

     animate();
 }

 function animate() {
     requestAnimationFrame(animate)
     controls.update();
     renderer.render(scene, camera);
 }