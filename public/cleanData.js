const fs = require('fs')
const fileContents = fs.readFileSync('./testCase.txt').toString()
// const fileContents = fs.readFileSync('./input.txt').toString()
const moment = require('moment')

// Split string into array of strings
let x = fileContents.split("\n");

//Split array into object with key value pairs
let obj = {};
for (var i = 0; i < x.length; i++) {
    let split = x[i].split('@');
    if(split[1] !== undefined && split[1] !== null){
    obj[split[0].trim()] = split[1].trim();
    }
}

// Split ID's string value into array of strings and add to a new object| with for loop
for (const property in obj) {
  obj[property] = obj[property].replace('[', '').replace(']', '').split(',')
}

function parseTimes(objectToParse){
  let emptyObject = {}
  for (const property in objectToParse) {
    let workerIntervals = {}
    objectToParse[property].map((time, index ) =>  {
      let intervalObject = {}
      intervalObject['startTime'] = moment.utc(time.substring(0, time.indexOf('/'))).toISOString()
      intervalObject['finishTime'] = moment.utc(time.substring(time.lastIndexOf('/') + 1)).toISOString()
      workerIntervals[index] = intervalObject
    })
    emptyObject[`worker`+property] = workerIntervals
  }
  return emptyObject
}

obj = parseTimes(obj)

exports.obj = obj