require('dotenv').config();
require('./terminal');
require('./database/Connection');
require('./listeners/process');

if (!process.argv.includes('--database')) {
  const { Logger } = require('./utils');
const { ShardingManager } = require('discord.js');

const Manager = new ShardingManager('./src/Unicron.js', {
    token: process.env.BOT_TOKEN,
    totalShards: 'auto',
    shardArgs: ['--shard'],
    respawn: true,
});
  
//Shard Handler
  
Manager.spawn();

Manager.on('shardCreate', (shard) => {
    Logger.info(`Shard[${shard.id}] has been created!`, 'Shard');
    shard.on('ready', () => {
        Logger.info(`Shard[${shard.id}] is now ready!`, 'Shard');
    });
    shard.on('death', (child) => {
        Logger.error(`Shard[${shard.id}][Process ${child.pid}] Death`, 'Shard');
    });
    shard.on('disconnect', () => {
        Logger.error(`Shard[${shard.id}] Disconnection`, 'Shard');
    });
    shard.on('error', (err) => {
        Logger.error(`Shard[${shard.id}] Error : ${err.name}`, 'Shard');
    });
    shard.on('reconnecting', () => {
        Logger.info(`Shard[${shard.id}] reconnecting...`, 'Shard');
    });
    shard.on('spawn', (child) => {
        Logger.info(`Shard[${shard.id}][Process ${child.pid}] has been spawned!`, 'Shard');
    });
});

require('./server/server')(Manager);
}
