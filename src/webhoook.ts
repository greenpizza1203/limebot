import {Message, TextChannel, Webhook, WebhookClient} from "discord.js";

// console.log(envElement)
let hook: Webhook;
const bruh = new WebhookClient('777973609331163197', 'xScu0ri4YRHsXuNY4tBYjteC1DO20BY-YILjg1P-9W1SIN8b1Kl-auEwB0glorBIhZoW');

async function createWebhook(channel: TextChannel) {

    await channel.guild.members.fetch();
    const webhooks = await channel.guild.fetchWebhooks();
    hook = webhooks.find(webhook => {
        console.log(webhook.owner)
        return webhook.owner["id"] == "461710458907394060";
    })


}

export default async function webhook(msg: Message) {
    msg.content.substring("!webhook ".length)
    const [, name, ...text] = msg.content.split(' ')
    if (!hook) await createWebhook(msg.channel as TextChannel)
    let avatarURL = msg.guild.members.cache.find(user => user.displayName == name).user.displayAvatarURL();
    // console.log(avatar)
    await hook.edit({
        name,
        channel: msg.channel,
        avatar: avatarURL,
    })
    //
    // })
    // const webhook = webhookMap[msg.channel.id] ?? await createWebhook(msg.channel as TextChannel)
    // hook.send(text.join(' '))
    bruh.send(text.join(' '))


}
