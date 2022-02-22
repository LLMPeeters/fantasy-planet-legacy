import * as THREE from "./three/build/three.module.js";
import { OrbitControls, MapControls } from "./three/examples/jsm/controls/OrbitControls.js";

import { makePlanetHandler } from "./planetScripts/makePlanetHandler.js";
import { planetsJSON } from "./planetScripts/planetsJSON.js";
import { createIcosahedron } from "./planetScripts/createIcosahedron.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.01;
const far = 100000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();
const bgLight = new THREE.AmbientLight( 0xffffff, 1 );
const controls = new OrbitControls(camera, renderer.domElement );
const planetsData = JSON.parse( planetsJSON );

controls.enablePan = false;

scene.add( new THREE.AxesHelper(150) );

// Hidden piece
planetsData.Four[9].hidden = true;

const materials = [
	[
		loader.load( `images/mapsnew/planet1/planet.png` ),
		loader.load( `images/mapsnew/planet1/biomesArrows.png` )
	],
	[
		loader.load( `images/mapsnew/planet2/planet.png` ),
		loader.load( `images/mapsnew/planet2/biomesArrows.png` )
	],
	[
		loader.load( `images/mapsnew/planet3/planet.png` ),
		loader.load( `images/mapsnew/planet3/biomesArrows.png` )
	],
	[
		loader.load( `images/mapsnew/planet4/planet.png` ),
		loader.load( `images/mapsnew/planet4/biomesArrows.png` )
	]
];

const initialized = makePlanetHandler.init({
	
	data: planetsData,
	scene: scene,
	camera: camera,
	renderer: renderer,
	textures: {
		'One': materials[0],
		'Two': materials[1],
		'Three': materials[2],
		'Four': materials[3]
	}
	
});

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 10;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild(renderer.domElement);

scene.add( bgLight );

render();

function render() {
	
	requestAnimationFrame(render);
	
	controls.update();
	
	renderer.render(scene, camera);
	
}

window.onresize = function() {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	camera.aspect = window.innerWidth / window.innerHeight;
	
	camera.updateProjectionMatrix();
	
};

document.querySelector( `body` ).addEventListener( `keydown`, function(e) {
	
	if( e.key === `F2` )
	{
		e.preventDefault();
		
		for( const key in makePlanetHandler.icosahedrons )
		{
			const planet = makePlanetHandler.icosahedrons[key];
			
			for( let i = 0; i < planet.length; i++ )
			{
				const icosahedron = planet[i];
				const target = icosahedron.material[0];
				const oldTexture = target.map;
				const materialList = icosahedron.customMaterials;
				const currentIndex = materialList.indexOf( oldTexture );
				const nextIndex = currentIndex+1 > materialList.length-1 ? 0 : currentIndex + 1;
				const newTexture = materialList[ nextIndex ];
				
				target.map = newTexture;
				
				oldTexture.dispose();
			}
		}
	}
	
} );