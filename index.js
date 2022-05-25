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
    return {
      send: args.includes("--send"),
      result: `${data.body.slice(39)}`
    };
  }
  
  pluginWillUnload() {
    powercord.api.commands.unregisterCommand('topic');
  }
};
