var WIDTH = 640,
	HEIGHT = 360;
 
var FOV = 75,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 2000;
 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
 
camera.position.z = 5;
 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);
 
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var cube = new THREE.Mesh(geometry, material);
scene.add( cube );
 
var animate = function() {
	requestAnimationFrame(animate);
 
	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;
 
	renderer.render(scene, camera);
};
 
animate();