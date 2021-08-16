import {addCommand} from "../commands";

addCommand(content => content.toLowerCase() === "f", (msg) => {
    msg.channel.send(`${msg.member.displayName} has paid their respects <a:rip:765555262898700288>`)
})
