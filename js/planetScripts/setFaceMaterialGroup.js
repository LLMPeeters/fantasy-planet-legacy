// Every face needs to be inside a material group to have its own material
// This function will set every given face to its own material group
// Data contains:
    // data.a (the faceIndex 'a' of the face to set),
    // data.groups (array of face material groups),
    // data.materialIndex (material index that gets set)
    // data.count (the amount of face IDs to include in the group in data.groups)
// The data.groups array is changed live
function setFaceMaterialGroup( data ) {
    
    data.groups.push({
        count: data.count,
        materialIndex: data.materialIndex,
        start: data.a
    });
    
}

export { setFaceMaterialGroup };