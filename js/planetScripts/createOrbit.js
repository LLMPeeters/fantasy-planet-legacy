import * as THREE from "./../three/build/three.module.js";

// data.orbitAroundObject is the object that will be orbited around
// data.orbiterObject is the orbiting object
// data.orbitData is the information about the orbit
// returns an object with a custom orbit handler, name, and boolean as to whether or not the orbiterObject is selected/centered
function createOrbitAroundSun( data ) {
	
	const thing = data;
	const returnPackage = {
		object: data.orbiterObject,
		name: data.orbitData.name,
		centered: false,
		handler: null
	};
	const newGroup = new THREE.Group();
	
	data.orbiterObject.position.z = data.orbitData.distance.y;
	
	newGroup.add( data.orbiterObject );
	
	data.orbitAroundObject.add( newGroup );
	
	returnPackage.handler = function( centered ) {
		
		const data = thing;
		const realThis = returnPackage;
		const orbitGroup = newGroup;
		const orbiter = data.orbiterObject;
		const orbited = data.orbitAroundObject;
		const orbitedPos = data.orbitAroundObject.position;
		const orbiterPos = orbiter.position;
		const distance = orbiterPos.distanceTo( orbitedPos );
		
		const increment = 2 * Math.PI / data.orbitData.distance.y
		
		if( centered !== undefined )
		{
			const scene = centered.scene;
			
			scene.remove( orbited );
			
			orbitGroup.remove( orbiter );
			orbited.remove( orbitGroup );
			
			orbitGroup.add( orbited );
			orbiter.add( orbitGroup );
			
			scene.add( orbiter );
			
			newGroup.rotation.y -= increment;
			orbited.rotation.y += increment;
			console.log(`test`)
		}
		else
		{
			newGroup.rotation.y += increment;
			orbiter.rotation.y -= increment;
		}
		
	}
	
	
	
	return returnPackage;
	
}

export { createOrbitAroundSun };