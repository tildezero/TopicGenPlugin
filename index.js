const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');

module.exports = class TopicGen extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: 'topic',
      description: 'Gets a random topic from conversationstarters.com',
      usage: '{c} [--send]',
      executor: (...args) => this.getTopic(...args)
    });
  } 

  async getTopic(args) {
    const data = await get("https://www.conversationstarters.com/random.php");
    let tosend;
    if (args.includes("--send")) {
      tosend = true
    } else {
      tosend = false
    }
    return {
      send: tosend,
      result: `${data.body.slice(39)}`
    };
  }
  
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('topic');
  }
};
