var roleConstructor = {
    
    _findBuildTarget: function(creep){
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(constructions.length > 0){
            return creep.pos.findClosestByPath(constructions);
        }
    },
    
    _findUpgradeTarget: function(creep){
        return creep.room.controller;
    },
    
    _findCollectTarget: function(creep){
        var collectorCreeps = creep.room.find(FIND_MY_CREEPS, {filter: creep => creep.memory.role === 'collector' && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0});
        if(collectorCreeps.length > 0){
            return creep.pos.findClosestByPath(collectorCreeps);
        }
    },
    
    _findTargetForState: function(creep){
        switch(creep.memory.state){
            case 'building':
                return this._findBuildTarget(creep);
                break;
            case 'upgrading':
                return this._findUpgradeTarget(creep);
                break;
            case 'collecting':
                return this._findCollectTarget(creep);
                break;
        }
    },
    
    _decideNextState: function(creep){
        if(creep.store[RESOURCE_ENERGY] == 0){
            return 'collecting';
        }else if (creep.room.find(FIND_CONSTRUCTION_SITES).length > 0){
            return 'building';
        }else{
            return 'upgrading';
        }
    },
    
    run: function(creep){
        var target = Game.getObjectById(creep.memory.target);
        
        if(!target || creep.store.getUsedCapacity() == 0){
            creep.memory.state = this._decideNextState(creep);
            target = this._findTargetForState(creep);
            if(target){
                creep.memory.target = target.id;
            }else{
                return;
            }
        }
        
        switch(creep.memory.state){
            case 'building':
                if(creep.build(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
                break;
            case 'upgrading':
                
                if(creep.upgradeController(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
                break;
            case 'collecting':
                creep.moveTo(target);
                if(creep.store.getFreeCapacity() == 0){
                    creep.memory.target = null;
                }
                break;
        }
    }
}

module.exports = roleConstructor