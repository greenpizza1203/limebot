import moment from "moment";
import {addCommand} from "../commands";

export async function days() {
    const a = moment('May 22nd 2021, 10:00 am', 'MMMM Do YYYY, h:mm a');
    return `graduation ${a.fromNow()}`;
}

export async function hours() {
    const a = moment('May 22nd 2021, 10:00 am', 'MMMM Do YYYY, h:mm a');
    let number = a.diff(moment.now(), 'hours', false);
    return `graduation in ${number} hours`;
}

addCommand(hours)
addCommand(days)
