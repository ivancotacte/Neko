const { listen } = require("./login");

listen(async (api, event) => {
  if (event.type === "message") {
  } else if (event.type === "message_reply") {
  } else if (event.type === "event") {
  }
});
