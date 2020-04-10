const moment = require('moment')
const obj = require('./cleanData.js')

let data = obj.obj
let dataKeys = Object.keys(data);
let earliestTime;
for (const key of dataKeys) {
  let timeKeys = Object.keys(data[key])

  for (i = 0; i < timeKeys.length; i++) {

    let startTime = data[key][i].startTime
    earliestTime = data[key][i].startTime

    for (const loopKey of dataKeys) {

      let loopsTimeKeys = Object.keys(data[loopKey])
      for (a = 0; a < loopsTimeKeys.length; a++) {

            //times to loop through
            let loopStartTime = data[loopKey][a].startTime

            moment(startTime).isBefore(loopStartTime) || moment(startTime).isSame(loopStartTime) ?
              //startTime is earlier or same
              earliestTime = startTime
            : 
              startTime = loopStartTime
              earliestTime = startTime
            ;
      }
    }
  }
}

console.log(earliestTime)