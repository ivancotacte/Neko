const path = require("path");
const fs = require("fs");
const https = require("https");

module.exports = async ({ api, event }) => {
  if (event.logMessageType == "log:subscribe") {
    try {
      let joinMemberID = event.logMessageData.addedParticipants[0].userFbId;
      var imageUrl = `https://api-test.tapikej101.repl.co/api/fbimage/${joinMemberID}`;
      var imagePath = path.join(__dirname, `../cache/${joinMemberID}.jpg`);
      const imageStream = fs.createWriteStream(imagePath);
      https.get(imageUrl, (response) => {
        response.pipe(imageStream);
        imageStream.on("finish", () => {
          api.sendMessage(
            {
              body: `Welcome, ${event.logMessageData.addedParticipants[0].fullName} Enjoy your stay.`,
              attachment: fs.createReadStream(imagePath),
              mentions: [
                {
                  tag: event.logMessageData.addedParticipants[0].fullName,
                  id: joinMemberID,
                },
              ],
            },
            event.threadID,
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else if (event.logMessageType == "log:unsubscribe") {
  } else if (event.logMessageType == "log:link-status") {
    api.sendMessage(event.logMessageBody, event.threadID);
  } else if (event.logMessageType == "log:thread-approval-mode") {
    api.sendMessage(event.logMessageBody, event.threadID);
  } else if (event.logMessageType == "log:magic-words") {
    api.sendMessage(
      `Theme ${event.logMessageData.magic_word} added effect: ${
        event.logMessageData.theme_name
      }\nEmoij: ${event.logMessageData.emoji_effect || "No emoji "}\nTotal ${
        event.logMessageData.new_magic_word_count
      } word effect added`,
      event.threadID,
    );
  }
};
