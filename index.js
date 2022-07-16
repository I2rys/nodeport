"use strict";

// Dependencies
const Net = require("net")

// Variables
const args = process.argv.slice(2)

var Self = {
    valid: false,
    max: 0
}

// Functions
function finished(){
    if(Self.max == args[1]){
        if(!Self.valid) console.log("No open ports found.")

        console.log("Finished.")
    }
}

function check(port){
    Net.connect({ host: args[0], port: port }, function(){
        if(!Self.valid) Self.valid = true

        Self.max++
        console.log(`Open port found: ${port}`)
        finished()
    }).on("error", function(){
        Self.max++
        finished()
    })
}

// Main
if(!args.length) return console.log("node index.js <host> <max>")
if(isNaN(args[1])) return console.log("max is not a number.")

for( let i = 0; i <= args[1]-1; i++ ) check(i)