/*
 * This module is used to display room information on the screen
 */

class MainGui {
    
    static display() {
        
        for(const roomName in Game.rooms){
            this._displayRoleInfos(Game.rooms[roomName]);
        }
    }
    
    static _displayRoleInfos(room) {
        
        var gui = this._getGuiSettings(room);
        var x = gui.roleInfoX;
        var y = gui.roleInfoY;
        
        var roomName = room.name;
        
        room.visual.text(roomName + '    ' + room.energyAvailable + '/' + room.energyCapacityAvailable + '🟡', x , y+0.2, {align: 'left', opacity: gui.opacity});
        
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