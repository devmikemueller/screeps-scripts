/*
 * This module is used to display room information on the screen
 */

class MainGui {
    
    static display() {
        
        for(const roomName in Game.rooms){
            this._displayInfos(Game.rooms[roomName]);
        }
    }
    
    static _displayInfos(room) {
        
        var gui = this._getGuiSettings(room);
        var x = gui.roleInfoX;
        var y = gui.roleInfoY;
        
        var roomName = room.name;
        
        room.visual.text("🏠 Raum:      " + roomName, x , y+0.2, {align: 'left', opacity: gui.opacity});
        room.visual.text("🟡 Energy:    " + room.energyAvailable + '/' + room.energyCapacityAvailable, x , y+1.2, {align: 'left', opacity: gui.opacity});
        room.visual.text("🔄 Harvesters: " + room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'harvester'}).length, x , y+2.2, {align: 'left', opacity: gui.opacity});
        room.visual.text("🚚 Collectors: " + room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'collector'}).length, x , y+3.2, {align: 'left', opacity: gui.opacity});
        room.visual.text("🛠️ Constructors: " + room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'constructor'}).length, x , y+4.2, {align: 'left', opacity: gui.opacity});
        room.visual.text("🔧️ Repairers: " + room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role == 'repairer'}).length, x , y+5.2, {align: 'left', opacity: gui.opacity});
        
    }
    
    static _getGuiSettings(room){
        var guiSettings = {
            x: 30,
            y: 0,
            height: 49,
            roleInfoX: 0,
            roleInfoY: 0,
            opacity: 0.8
        };
        
        if(room.memory.gui){
            room.memory.gui = Object.assign(guiSettings, room.memory.gui);
        }else{
            room.memory.gui = guiSettings;
        }
        
        return room.memory.gui;
    }
}

module.exports = MainGui