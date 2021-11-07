const vamedcenters = require('./vamedcenters')
const {stateAbbreviations,stateNames} = require('./states')


console.log(stateAbbreviations.length)
console.log(stateNames.length)

function convertStateAbbreviated(abbreviation){
    for (let i=0; i<stateAbbreviations.length;i++){
        if (stateAbbreviations[i]===abbreviation){
            return stateNames[i]
        }
    }
    return -1;
}

console.log(convertStateAbbreviated("MT"))