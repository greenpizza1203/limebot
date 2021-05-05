import moment from "moment";
import {addCommand} from "../commands";

const graduation = moment('May 22nd 2021, 10:00 am -0400', 'MMMM Do YYYY, h:mm a');

export async function days() {
    return `graduation ${graduation.fromNow()}`;
}

export async function hours() {
    let number = graduation.diff(moment.now(), 'hours', false);
    return `graduation in ${number} hours`;
}

addCommand(hours)
addCommand(days)
