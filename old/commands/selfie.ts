import moment from "moment";
//
const start = moment().hour(9);
const end = moment().hour(23);

console.log(start.unix())
console.log(end.unix())
//
// export async function days() {
//     return `graduation ${graduation.fromNow()}`;
// }
//
// export async function hours() {
//     let number = graduation.diff(moment.now(), 'hours', false);
//     return `graduation in ${number} hours`;
// }
//
// addCommand(hours)
// addCommand(days)
