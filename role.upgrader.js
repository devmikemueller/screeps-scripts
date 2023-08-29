var roleUpgrader = {
    
    _collectFromContainers: function(creep, containers){
        const target = creep.pos.findClosestByPath(containers);
        if(!creep.pos.isNearTo(target)){
            creep.moveTo(target, { visualizePathStyle: {stroke: '#00ff5f'}});
        }else{
            creep.withdraw(target, RESOURCE_ENERGY);
        }   
    },
    
    run: function(creep){
        if(creep.memory.building){
            creep.memory.role = 'builder';
        }
        
        
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 Collecting');
	    }
	    
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ Upgrades,Leute,Upgrades!!');
	    }
        
        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: {stroke: '#ffffff'}});
            }
        }else{
            var containers = creep.room.find(FIND_STRUCTURES, { filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity() > 0 });
            if(containers.length > 0){
                this._collectFromContainers(creep, containers);
            }else{
                var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter: resource => resource.resourceType === RESOURCE_ENERGY});
                if(resource){
                    if(creep.pickup(resource) === ERR_NOT_IN_RANGE){
                        creep.moveTo(resource);
                    }
                }
            }
        }
    }
    
}

module.exports = roleUpgrader;