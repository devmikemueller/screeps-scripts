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
    
    for(const roomName in Game.rooms){
        const room = Game.rooms[roomName];
        if(!room.memory.resources){
            room.memory.resources = room.find(FIND_SOURCES);
        }
    }
    
    const resourcePosition = new RoomPosition(8, 32, 'E48S33');

    let availableSpaces = 0;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const terrain = Game.map.getTerrainAt(resourcePosition.x + dx, resourcePosition.y + dy, resourcePosition.roomName);
            console.log(terrain + "-" + "X: " + (resourcePosition.x + dx) + "/ Y: " + (resourcePosition.y + dy));
            if (terrain === 'plain' || terrain === 'swamp') {
                availableSpaces++;
            }
        }
    }
    
    
    
    
    
    
    
    
}