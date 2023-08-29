var roleCollector = {
    
    _determinateAttackTarget: function(creep){
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(enemy){
            return enemy;
        }
    },
    
    _determinateCollectTarget: function(creep){
        var resources = creep.room.find(FIND_DROPPED_RESOURCES, { filter: resource => resource.resourceType === RESOURCE_ENERGY});
        
        if(resources.length > 0){
            var mostEnergyResource = resources.sort((a, b) => b.amount - a.amount);
            if(mostEnergyResource){
                target = mostEnergyResource[0];
                return target;
            }
        }
    },
    
    _determinateDeliverTarget: function(creep){
        var structures = creep.room.find(FIND_STRUCTURES, {
            filter: structure => (
                (structure.structureType === STRUCTURE_SPAWN && structure.store.energy < structure.store.getCapacity(RESOURCE_ENERGY)) ||
                (structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ||
                (structure.structureType === STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
        )});
        
        structures.sort((a, b) => {
            if (a.structureType === STRUCTURE_SPAWN) return -1;
            if (b.structureType === STRUCTURE_SPAWN) return 1;
            if (a.structureType === STRUCTURE_EXTENSION) return -1;
            if (b.structureType === STRUCTURE_EXTENSION) return 1;
            return 0;
        });
        
        if(structures.length > 0){
            return structures[0];
        }
        
    },
    
    _decideNextAction: function(creep){
        
        if(creep.room.find(FIND_HOSTILE_CREEPS).length > 0){
            creep.memory.state = 'attacking';
        }
        if(creep.store.getFreeCapacity() == 0){
            creep.memory.state = 'delivering';
        }else{
            creep.memory.state = 'collecting';
        }
    },
    
    _determinateTarget: function(creep){
        switch(creep.memory.state){
            case 'collecting':
                return this._determinateCollectTarget(creep);
                break;
            case 'delivering':
                return this._determinateDeliverTarget(creep);
                break;
        }
    },
    
    run: function(creep){
        
        var target = Game.getObjectById(creep.memory.target);
        
        if(!target || (creep.memory.state != 'attacking' && creep.room.find(FIND_HOSTILE_CREEPS).length > 0)){
            this._decideNextAction(creep);
            target = this._determinateTarget(creep);
            if(target){
                creep.memory.target = target.id;
            }else{
                return;
            }
        }
        
        if(creep.pos.isNearTo(target)){
            switch(creep.memory.state){
                case 'collecting':
                    creep.pickup(target, RESOURCE_ENERGY);
                    break;
                case 'delivering':
                    creep.transfer(target, RESOURCE_ENERGY);
                    break;
                case 'attacking':
                    creep.attack(target);
                    break;
                }
                creep.memory.target = null;
        }else{
                creep.moveTo(target);
        }
    }
    
}

module.exports = roleCollector;