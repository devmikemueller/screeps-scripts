var roleBuilder = {
    
    _getClosestConstruction: function(creep){
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(constructions.length > 0){
            return creep.pos.findClosestByPath(constructions);
        }
        return null;
    },
    
    _determinateBuildTarget: function(creep){
        var target;
        
        if(!creep.memory.targetId){
            target = this._getClosestConstruction(creep);
        }else{
            target = Game.getObjectById(creep.memory.targetId);
        }
        
        return target;
    },
    
    _determinateCollectTarget: function(creep){
        var target;
        
        if(!creep.memory.targetId){
            var containers = creep.room.find(FIND_STRUCTURES, { filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0 });
            if(containers.length > 0){
                target = creep.pos.findClosestByPath(containers);
            }else{
                var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, { filter: resource => resource.resourceType === RESOURCE_ENERGY});
                if(resource){
                    if(creep.pickup(resource) === ERR_NOT_IN_RANGE){
                        creep.moveTo(resource);
                    }
                }
            }
        }else{
            target = Game.getObjectById(creep.memory.targetId);
        }
        
        return target;
    },
    
    _buildTarget: function(creep, target){
        if(creep.build(target) === ERR_NOT_IN_RANGE){
            creep.moveTo(target);
        }
    },
    
    _collectFromTarget: function(creep, target){
        if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            creep.moveTo(target, { visualizePathStyle: {stroke: '#00ff5f'}});
        }
    },
    
    _goToStandby: function(creep){
        if(creep.store[RESOURCE_ENERGY] > 0){
            this._returnEnergy(creep);
            return;
        }
        
        creep.moveTo(Game.flags['StandBy']);
    },
    
    _returnEnergy: function(creep){
        
        const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => (
                (structure.structureType === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                (structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0))
        });
        
        if(target){
            if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    },
    
    run: function(creep){
        var target;
        
        if(creep.memory.upgrading){
            creep.memory.role = 'upgrader';
        }
        
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
            creep.say('🔄 collect');
        }
        
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
            creep.say('🚧 build');
        }
        
        if(creep.memory.building){
            target = this._determinateBuildTarget(creep);
            
            if(target){
                this._buildTarget(creep, target);
            }else{
                creep.memory.targetId = null;
            }
        }else{
            target = this._determinateCollectTarget(creep);
            if(target){
                this._collectFromTarget(creep, target);
            }else{
                creep.memory.targetId = null;    
            }
        }
    }
}

module.exports = roleBuilder;