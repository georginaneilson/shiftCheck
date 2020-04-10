const moment = require('moment')
const obj = require('./cleanData.js')
let data = obj.obj

function parseArray(objectToParse){
  let emptyObject = {}
  objectToParse.map((time, index) => {
    let intervalObject = {}
    intervalObject['startTime'] = moment.utc(time.substring(0, time.indexOf('/'))).toISOString()
    intervalObject['finishTime'] = moment.utc(time.substring(time.lastIndexOf('/') + 1)).toISOString()
    emptyObject[index] = intervalObject
  })
  return emptyObject
}

let dataKeys = Object.keys(data);
let tempArray = []

for (const key of dataKeys) {
  let timeKeys = Object.keys(data[key])

  for (i = 0; i < timeKeys.length; i++) {

    let startTime = data[key][i].startTime
    let finishTime =  data[key][i].finishTime
    
    for (const loopKey of dataKeys) {

      let loopsTimeKeys = Object.keys(data[loopKey])
      let interval;
      for (a = 0; a < loopsTimeKeys.length; a++) {

        let intervalStart;
        let intervalFinish;

            //times to loop through
            let loopStartTime = data[loopKey][a].startTime
            let loopFinishTime = data[loopKey][a].finishTime
        if (key === loopKey){
           // same worker, so don't run
        } else {
          if((moment(finishTime).isBefore(loopStartTime) || moment(finishTime).isSame(loopStartTime)) ||
            moment(startTime).isAfter(loopFinishTime) || moment(startTime).isSame(loopFinishTime)){
              //shift ends before the shift begins or starts after shift ends
            } 
            else {
              if(moment(startTime).isAfter(loopStartTime)){
                intervalStart = startTime
              } 
              else {
                intervalStart = loopStartTime
              }
              if(moment(finishTime).isBefore(loopFinishTime)){
                intervalFinish = finishTime
              } 
              else{
                intervalFinish = loopFinishTime
              }  
              interval = intervalStart + '/' +  intervalFinish
               if (!tempArray.includes(interval)){
              tempArray.push(interval)
                }
            }
          }
      }
    }
  }
}


let shifts = parseArray(tempArray)

function parseShifts(shiftsToParse){
let shiftKeys = Object.keys(shiftsToParse)
let emptyArray = []
for (const key of shiftKeys) {
let checkShiftStart = shifts[key].startTime
let checkShiftFinish = shifts[key].finishTime
let shiftStart
let shiftFinish
let startLoopInterval = 0
let endLoopInterval = 1

// could add function to check array for start/finish times to make faster

while (startLoopInterval != endLoopInterval){  

startLoopInterval =  shiftStart + '/' + shiftFinish

  for (i = 0; i < shiftKeys.length; i++) {

    let loopShiftStart = shifts[i].startTime
    let loopShiftFinish = shifts[i].finishTime

    if (key == i){
      //dont check on same shift
    } else {
          // begin function
          if ((moment(checkShiftStart).isBetween(loopShiftStart, loopShiftFinish) ||
              moment(checkShiftStart).isSame(loopShiftStart)) 
              && (moment(checkShiftFinish).isBetween(loopShiftStart, loopShiftFinish) ||
              moment(checkShiftFinish).isSame(loopShiftFinish))){
            //between a double shift 2 workers or more - do nout - add 1 to the array
            checkShiftFinish = loopShiftFinish 
            checkShiftStart = loopShiftStart 
            shiftFinish = loopShiftFinish 
            shiftStart = loopShiftStart 
            
          } 
          else{ 
            if((moment(checkShiftFinish).isBefore(loopShiftStart)) 
            || (moment(checkShiftStart).isAfter(loopShiftFinish))){
              //finishes before or starts after - they dont overlap
              shiftStart = checkShiftStart
              shiftFinish = checkShiftFinish

              

            } else {
              if(moment(checkShiftStart).isBefore(loopShiftStart)){
                shiftStart = checkShiftStart
              } else if (moment(checkShiftStart).isSame(loopShiftStart) || moment(checkShiftStart).isAfter(loopShiftStart)) {
                checkShiftStart = loopShiftStart
                shiftStart = loopShiftStart
              }
              if(moment(checkShiftFinish).isAfter(loopShiftFinish)){
                shiftFinish = checkShiftFinish
              } else if (moment(checkShiftFinish).isSame(loopShiftFinish) || moment(checkShiftFinish).isBefore(loopShiftFinish)) {
                checkShiftFinish = loopShiftFinish
                shiftFinish = loopShiftFinish
              } 
          }
        }     
  }
}

endLoopInterval =  shiftStart + '/' + shiftFinish
}
if (shiftStart != undefined && shiftFinish != undefined){
            let interval = shiftStart + '/' + shiftFinish
            if (!emptyArray.includes(interval)){
              emptyArray.push(interval)
  }        
          
           }
}
 return emptyArray
}

let array = parseShifts(shifts)

array.forEach(interval => console.log(interval));
