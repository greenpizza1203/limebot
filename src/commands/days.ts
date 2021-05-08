import moment from "moment";
import {addCommand} from "../commands";

const graduation = moment('22 May 21 10:00 EDT');

export async function days() {
    return `graduation ${graduation.fromNow()}`;
}

export async function hours() {
    let number = graduation.diff(moment.now(), 'hours', false);
    return `graduation in ${number} hours`;
}

addCommand(hours)
addCommand(days)
