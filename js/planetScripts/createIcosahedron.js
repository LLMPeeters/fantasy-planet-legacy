import * as THREE from "./../three/build/three.module.js";

import { setFaceMaterialGroup } from "./setFaceMaterialGroup.js";

// Data.radius: the radius of the icosahedron
// Data.detail: The level of detail of the icosahedron
// Data.materialsData: array of objects where each key and value is parallel with three.js parameters
// Data.faceIds: the array of face ids, only faces with their id in this array will be given a material group
// Data.normal: boolean, if true then this is a normal icosahedron with no face material groups
function createIcosahedron( data ) {
    
    if( data.radius === undefined ) data.radius = data.diameter;
    
    const geometry = new THREE.IcosahedronGeometry( data.radius, data.detail );
    const materials = [];
    
    for( let i = 0; i < data.materialsData.length; i++ )
    {
        const materialsObject = {};
        
        for( const key in data.materialsData[i] )
            materialsObject[key] = data.materialsData[i][key];
        
        materials.push( new THREE.MeshStandardMaterial( materialsObject ) );
    }
    
    const icosahedron = new THREE.Mesh( geometry, materials );
    const count = icosahedron.geometry.attributes.normal.count;
    const groups = icosahedron.geometry.groups;
    
    if( data.normal !== true )
    {
        const newIds = data.faceIds.sort( (a, b)=> a > b ? 1 : (a < b ? -1 : 0) );
        
        for( let i = 0; i < newIds.length; i++ )
        {
            const a = newIds[i];
            const materialIndex = 0;
            
            let bingus = 1;
            
            while( newIds.includes( newIds[i] + 3 ) )
            {
                bingus++;
                i++;
            }
            
            setFaceMaterialGroup({
                a: a,
                groups: groups,
                materialIndex: materialIndex,
                count: 3 * bingus
            });
        }
        
        icosahedron.fakeTotal = newIds.length;
    }
    else
    {
        setFaceMaterialGroup({
            a: 0,
            groups: groups,
            materialIndex: 0,
            count: count
        })
    }
    
    // COLORS ARE DISABLED
    
    return icosahedron;
    
    // These variables are needed to allow the faces to have colors
    const positionAttribute = geometry.getAttribute( `position` );
    const colors = [];
    
    for( let i = 0; i < positionAttribute.count; i++ ) colors.push(1, 1, 1); 
    
    const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
    
    geometry.setAttribute('color', colorAttribute);
    
    return icosahedron;
    
}

export { createIcosahedron };