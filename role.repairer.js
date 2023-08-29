module.exports = {
    run: function(creep){
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 Sammeln');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
            creep.memory.repairing = true;
            creep.say('🚧 Reparieren');
        }
        
        if(creep.memory.repairing){
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL});
            if (target) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        
        if(!creep.memory.repairing){
            const containers = creep.room.find(FIND_STRUCTURES, { filter: s => s.structureType === STRUCTURE_CONTAINER });
	        if(containers.length > 0){
	            const target = creep.pos.findClosestByPath(containers);
	                if(!creep.pos.isNearTo(target)){
	                    creep.moveTo(target, { visualizePathStyle: {stroke: '#00ff5f'}});
	                }else{
	                    creep.withdraw(target, RESOURCE_ENERGY);
	                }
	        }else{
	            const collectors = _.filter(Game.creeps, c => c.memory.role === 'collector' && !c.memory.targetHarvesterId && c.store[RESOURCE_ENERGY] > 0);
	            if(collectors.length > 0){
	                const target = creep.pos.findClosestByPath(collectors);
	                if(!creep.pos.isNearTo(target)){
	                    creep.moveTo(target, { visualizePathStyle: {stroke: '#00ff5f'}});
	                }
	            }
	        }
        }
        
    }
};