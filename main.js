var spawnManager = require('creep.spawnManager');
var shiftManager = require('creep.shiftManager');
var MainGui = require('main.gui');

const roomName = 'E48S33';
const spawnName = 'Spawn1';

module.exports.loop = function () {
    spawnManager.run(roomName);
    spawnManager.cleanup();
    shiftManager.run();
    
    MainGui.display();
    
    if(false){
        console.log("Overview:");
        console.log("Harvesters: " + _.sum(Game.creeps, creep => creep.memory.role === 'harvester' ? 1 : 0));
        console.log("Collectors: " + _.sum(Game.creeps, creep => creep.memory.role === 'collector' ? 1 : 0));
        console.log("Builder: " + _.sum(Game.creeps, creep => creep.memory.role === 'builder' ? 1 : 0));
        console.log("Upgrader: " + _.sum(Game.creeps, creep => creep.memory.role === 'upgrader' ? 1 : 0));   
    }
    
    for(const roomName in Game.rooms){
        const room = Game.rooms[roomName];
        if(!room.memory.resources){
            room.memory.resources = room.find(FIND_SOURCES);
        }
    }
    
	//TEST!!!!!!!!!!
    
    //const resourcePosition = new RoomPosition(33, 28, 'E48S33');

    //let availableSpaces = 0;

    //for (let dx = -1; dx <= 1; dx++) {
    //    for (let dy = -1; dy <= 1; dy++) {
     //       const terrain = Game.map.getTerrainAt(resourcePosition.x + dx, resourcePosition.y + dy, resourcePosition.roomName);
       //     console.log(terrain + "-" + "X: " + (resourcePosition.x + dx) + "/ Y: " + (resourcePosition.y + dy));
         //   if (terrain === 'plain' || terrain === 'swamp') {
           //     availableSpaces++;
            //}
        //}
    //}
    
    
    
    
    
    
    
    
}