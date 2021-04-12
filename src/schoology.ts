import axios from "axios";
import addOAuthInterceptor from "axios-oauth-1.0a";
import {Message} from "discord.js";
import moment from "moment";

// Create a client whose requests will be signed
const client = axios.create({
    baseURL: 'https://api.schoology.com/v1'
});

// Add interceptor that signs requests
addOAuthInterceptor(client, {
    // OAuth consumer key and secret
    key: "15f0231ecbb0d242e39438219812ef6f060073296",
    secret: "55ae1c0636236559e92e71dbafdd8735",

    // HMAC-SHA1 and HMAC-SHA256 are supported
    algorithm: "HMAC-SHA1",
});


export async function schoology(message: Message) {
    let args = message.content.substring("!schoology ".length);
    const [section, assignment] = args.split(' ');
    let argsAreNums = section === (+section).toString() && assignment === (+assignment).toString();
    let body = await (argsAreNums ? getAssignment(section, assignment) : findAssignment(args));
    if (!body) return
    const printData = {
        "Title:  ": body.title,
        "Points: ": body.max_points,
        "Due:    ": moment(body.due).calendar(),

    }
    if (body.weight) {
        printData["Weight: "] = body.weight
    }
    let total = "\n"
    Object.entries(printData).map(([key, value]) => total += `${key} ${value}\n`)
    message.reply(total)
}

async function getAssignment(section, assignment) {
    const response = await client.get(`/sections/${section}/assignments/${assignment}`)
    return await response.data
}

async function reloadAssignments() {
    console.log("reload")
    const {data} = await client.get("users/27296077/sections")
    let sections: number[] = data.section.map(it => it.id);
    for (const section of sections) {
        const {data} = await client.get(`sections/${section}/grading_categories`)
        for (const category of data.grading_category) {
            gradingSections[category.id] = category.title;
        }
        existingAssignments = []
        for (const section of sections) {
            const {data} = await client.get(`sections/${section}/assignments?limit=300`)
            for (const assignment of data.assignment) {
                let weight = gradingSections[assignment.grading_category];
                if (weight) assignment.weight = weight
                existingAssignments.push(assignment)
            }
        }

    }
}

let existingAssignments = [];
let gradingSections = {};

async function findAssignment(title: string) {
    title = title.toLowerCase()
    let assignment = existingAssignments.find(it => it.title.toLowerCase().includes(title));
    if (!assignment) {
        await reloadAssignments();
    }
    return existingAssignments.find(it => it.title.toLowerCase().includes(title));
}



