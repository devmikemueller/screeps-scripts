var roleHarvester = {
    
    _determinateHarvestTarget: function(creep){
        
        var freeSources = creep.room.find(FIND_SOURCES, {
            filter: source => source.pos.findInRange(FIND_MY_CREEPS, 1, {
                filter: creep => creep.memory.role === 'harvester'
            }).length === 0
        });
        
        if(freeSources.length > 0){
           return freeSources[0];
        }
        
    },
    
    run: function(creep) {
        
        var target = Game.getObjectById(creep.memory.target);
        
        if(!target){
            target = this._determinateHarvestTarget(creep);
            if(target){
                creep.memory.target = target.id;
            }else{
                return;
            }
        }
        
        if(creep.harvest(target) === ERR_NOT_IN_RANGE){
            creep.moveTo(target, { visualizePathStyle: {stroke: '#ffffff'}});
        }
	}
};

module.exports = roleHarvester;