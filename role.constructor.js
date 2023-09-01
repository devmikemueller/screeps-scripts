var roleConstructor = {
    
    _findBuildTarget: function(creep){
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(constructions.length > 0){
            return creep.pos.findClosestByPath(constructions);
        }
    },
    
    _findCollectTarget: function(creep){
        var collectorCreeps = creep.room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role === 'collector' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0});
        if(collectorCreeps.length > 0){
            return creep.pos.findClosestByPath(collectorCreeps);
        }
    },
    
    _assignNewTask: function(creep){
        var target;
        if(creep.store[RESOURCE_ENERGY] == 0){
            target = this._findCollectTarget(creep);
            creep.memory.currentTask = 'collecting';
        }else if (creep.room.find(FIND_CONSTRUCTION_SITES).length > 0){
            target = this._findBuildTarget(creep);
            creep.memory.currentTask = 'building';
        }else{
            target = creep.room.controller;
            creep.memory.currentTask = 'upgrading';
        }
        
        if(target){
            creep.memory.target = target.id;
        }
    },
    
    run: function(creep){
        
        if(!creep.memory.target){
            this._assignNewTask(creep);
        }
        
        var target = Game.getObjectById(creep.memory.target);
        
        if(target){
            switch(creep.memory.currentTask){
                case 'collecting':
                    creep.moveTo(target);
                    if(creep.store.getFreeCapacity() == 0){
                        creep.memory.target = null;
                    }
                    break;
                case 'building':
                    if(creep.build(target) === ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }else{
                        creep.memory.target = null;
                    }
                    break;
                case 'upgrading':
                    if(creep.upgradeController(target) === ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }else{
                        creep.memory.target = null;
                    }
                    break;
            }
        }else{
            creep.memory.target = null;
        }
        
    }
}
module.exports = roleConstructor;