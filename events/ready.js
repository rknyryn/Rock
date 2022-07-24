module.exports = (client) => {
  console.log(`${client.getTime()} :: Logged in as ${client.user.tag}!`);
  client.user.setActivity(`/help | Fast-Music`, { type: "PLAYING" });
  setInterval(() => {
    client.user.setActivity(`/help | Fast-Music`, { type: "PLAYING" });
  }, 600_00);
};
