import * as THREE from "./../three/build/three.module.js";
import { OrbitControls, MapControls } from "./../three/examples/jsm/controls/OrbitControls.js";

import { createIcosahedron } from "./createIcosahedron.js";
import { createOrbitAroundSun } from "./createOrbit.js";

const makePlanetHandler = {
	
	animationData: {},
	icosahedrons: {},
	toggleRotation: false,
	centeredObject: null,
	centerableObjects: [],
	centeredObject: null,
	
	// options.data is the planet data as already-parsed JSON
	// options.textures is the object with analogous keys as data
		// each key has an array of materials
	init( options ) {
		
		let laptop = false;
		
		const data = options.data;
		const textures = options.textures;
		const scene = options.scene;
		
		// planetGroup is all the groups(pieces) together, without the core
		const planetGroup = new THREE.Group();
		
		// Creates an icosahedron for each piece,
		// Adds each piece to a group,
		// Adds each piece group to planetGroup
		if( laptop === false )
		{
			for( const key in data )
			{
				const planet = data[key];
				const planetTextures = textures[key];
				
				this.icosahedrons[key] = new Array();
				
				for( let i = 0; i < planet.length; i++ )
				{
					const piece = planet[i];
					const newIcosahedron = createIcosahedron({
						radius: piece.radius,
						detail: 50,
						faceIds: piece.faces,
						materialsData: [ { map: planetTextures[0] } ]
					});
					const pieceGroup = new THREE.Group();
					
					this.icosahedrons[key].push( newIcosahedron );
					
					newIcosahedron.customMaterials = options.textures[key];
					
					newIcosahedron.position.x = piece.position.x;
					newIcosahedron.position.y = piece.position.y;
					newIcosahedron.position.z = piece.position.z;
					
					newIcosahedron.rotation.x = piece.rotation.x;
					newIcosahedron.rotation.y = piece.rotation.y;
					newIcosahedron.rotation.z = piece.rotation.z;
					
					pieceGroup.position.x = piece.group.position.x;
					pieceGroup.position.y = piece.group.position.y;
					pieceGroup.position.z = piece.group.position.z;
					
					pieceGroup.rotation.x = piece.group.rotation.x;
					pieceGroup.rotation.y = piece.group.rotation.y;
					pieceGroup.rotation.z = piece.group.rotation.z;
					
					pieceGroup.scale.y = piece.group.scale.y;
					
					if( piece.hidden === true )
						newIcosahedron.visible = false;
					
					pieceGroup.add( newIcosahedron );
					planetGroup.add( pieceGroup );
				}
			}
			
			scene.add( planetGroup );
		}
		
		return true;
	}
	
};

export { makePlanetHandler };