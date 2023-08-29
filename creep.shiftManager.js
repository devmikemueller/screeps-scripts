var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCollector= require('role.collector');
var roleRepairer = require('role.repairer');

module.exports = {

    run: function(){
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'collector'){
                roleCollector.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);    
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);    
            }
            if(creep.memory.role == 'repairer'){
                roleRepairer.run(creep);
            }
            if(creep.memory.role == 'explorer'){
                roleExplorer.run(creep);
            }
        }
    }
};