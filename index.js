//Dependencies
const Net = require("net")

//Variables
const Self_Args = process.argv.slice(2)

var Self = {
    valid: false,
    max: 0
}

//Functions
function finished(){
    if(Self.max == Self_Args[1]){
        if(!Self.valid){
            console.log("No valid open ports found.")
        }

        return console.log("Finished.")
    }
}

function check(port){
    Net.connect({ host: Self_Args[0], port: port }, function(){
        if(!Self.valid){
            Self.valid = true
        }

        Self.max++
        console.log(`Open valid port: ${port}`)
        finished()
    }).on("error", function(){
        Self.max++
        finished()
    })
}

//Main
if(!Self_Args.length){
    return console.log("node index.js <host> <max>")
}

if(isNaN(Self_Args[1])){
    return console.log("max is not a number.")
}

for( let i = 0; i <= Self_Args[1]-1; i++ ){
    check(i)
}