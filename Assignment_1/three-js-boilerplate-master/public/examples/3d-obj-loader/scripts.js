var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var light = new THREE.AmbientLight(0x777777); // soft white light
scene.add(light);

var mtlLoader = new THREE.MTLLoader();
var robo;
mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
mtlLoader.setPath('/examples/3d-obj-loader/assets/');

var setRanodomPosiion = function (object) {
    object.position.set(THREE.Math.randFloatSpread(1000), THREE.Math.randFloatSpread(500), THREE.Math.randFloatSpread(500));
}

var getRandomPositon = function () {
    return new THREE.Vector3(THREE.Math.randFloatSpread(1000), THREE.Math.randFloatSpread(500), THREE.Math.randFloatSpread(500));
}

var target = getRandomPositon();

mtlLoader.load('r2-d2.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('r2-d2.obj', function (object) {

        scene.add(object);
        setRanodomPosiion(object);
        console.log("starting position:",object.getWorldPosition());
        robo = object;

    });



});



var move = function (object, TargetPosition) {
    var targetDirection = new THREE.Quaternion();
    var currentPosition=object.getWorldPosition();
    //targetDirection.setFromUnitVectors(TargetPosition.normalize(),currentPosition.normalize());
    var currentDirrection=object.getWorldQuaternion();
    object.lookAt ( TargetPosition );
    //currentDirrection.rotateTowards(currentDirrection,0.1);
    //object.setRotationFromQuaternion (targetDirection);

    object.translateZ(2);


}

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
   console.log(target.distanceTo(robo.getWorldPosition()));
   var currentPosition=robo.getWorldPosition();
    if (target.distanceTo(currentPosition) > 10) {
        move(robo, target);
    }
    else {
        target = getRandomPositon();
        
        console.log("target:",target);
         ///move(robo, target);
        console.log(target.distanceTo(currentPosition));
    }

    renderer.render(scene, camera);
};

animate();