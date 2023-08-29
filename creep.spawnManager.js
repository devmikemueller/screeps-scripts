const ROLES = {
    harvester: {
        parts: [WORK, WORK, MOVE],
        minQuantity: 2,
        energyLimit: 600
    },
    collector: {
        parts: [MOVE, ATTACK, CARRY],
        minQuantity: 10,
        energyLimit: 600
    },
    builder: {
        parts: [WORK, CARRY, MOVE],
        minQuantity: 5,
        energyLimit: 300
    },
    upgrader: {
        parts: [WORK, CARRY, MOVE],
        minQuantity: 6,
        energyLimit: 600
    },
    repairer: {
        parts: [WORK, CARRY, MOVE],
        minQuantity: 1,
        energyLimit: 300
    }
};

const ENERGY_PER_PART = 100;

module.exports = { 
    
    _buildBody: function(energy, role){
        var usableEnergy = Math.min(energy, role.energyLimit);
        var usedEnergy = 0;
        var body = [];  
        
        while(usedEnergy < usableEnergy){
            for(var i = 0; i < role.parts.length; i++){
                if(usedEnergy < usableEnergy){
                    body.push(role.parts[i]);
                    usedEnergy += ENERGY_PER_PART;
                }
            }
        }
        
        return body;
    },
    
    _spawnCreep: function(roomName, roleName){
        const role = ROLES[roleName];
        const energyMinimum = role.parts.length * ENERGY_PER_PART
        
        var energy = Game.spawns['Spawn1'].room.energyAvailable;

        if(energy >= energyMinimum){
            
            var body = this._buildBody(energy, role);
            console.log(body);
            const name = roleName + Game.time.toString();
            const result = Game.spawns['Spawn1'].spawnCreep(body, name, { memory: { role: roleName, home: roomName }});
    
            if(result === OK){
                console.log("Creep " + name + " erfolgreich erstellt.")
            }else{
                console.log("Fehler beim erstellen des Creeps.", result)
            }
        }
    },
    
    cleanup: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
                
            }
        }
    },
    
    run: function(roomName){
        for(const roleName in ROLES){
            const role = ROLES[roleName];
            const existingCreeps = _.filter(Game.creeps, creep => creep.memory.role === roleName);
            
            if(existingCreeps.length < role.minQuantity){
                this._spawnCreep(roomName, roleName);
                break;
            }
            
        }
    }
};