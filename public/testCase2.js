const moment = require('moment')
const obj = require('./cleanData.js')

let data = obj.obj
let dataKeys = Object.keys(data);
let latestTime;
for (const key of dataKeys) {
  let timeKeys = Object.keys(data[key])

  for (i = 0; i < timeKeys.length; i++) {

    let finishTime = data[key][i].finishTime
    latestTime = data[key][i].startTime

    for (const loopKey of dataKeys) {

      let loopsTimeKeys = Object.keys(data[loopKey])
      for (a = 0; a < loopsTimeKeys.length; a++) {

          //times to loop through
          let loopFinishTime = data[loopKey][a].finishTime

          moment(finishTime).isAfter(loopFinishTime) || moment(finishTime).isSame(loopFinishTime) ?
              //latestTime is earlier or same
              latestTime = finishTime
            :
              finishTime = loopFinishTime
              latestTime = finishTime
            ;
      }
    }
  }
}

console.log(latestTime)








// // for each array removing content before the '/' and add to a new object
// let objectLastTime = {}
// for (const property in object) {
//   let array = []
//   let array2 = []
//   object[property].forEach(time => array.push(time.substring(time.lastIndexOf('/') + 1)))

//   array.forEach(time => array2.push(moment.utc(time).toISOString()))
//   objectLastTime[property] = array2

// }

// let latestTime = objectLastTime[0][0];
// for (const property in objectLastTime) {

// objectLastTime[property].map((time, index) => {
//   if (moment(time).isAfter(latestTime)){
//     latestTime = time
//   }
// })
// }

// console.log(latestTime)