const express = require("express");
const cors = require("cors");
const EventEmitter = require("events");

const app = express();
const eventEmitter = new EventEmitter();

const maxTime = 5 * 1000

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("api is working");
});

app.get("/waitTillMoveMade", (_req, res) => {
    let responseSent = false

    // needs to be an anonymous function to later remove the listener
    const handleMoveMade = (eventObj) => {
        responseSent = true
        res.json({text: `a move was made, random number is ${eventObj.randomNumber}`});
    }

    eventEmitter.once("moveMade", handleMoveMade)

    setTimeout(() => {
        if(!responseSent){
            eventEmitter.removeListener("moveMade", handleMoveMade);
            res.json({text: `no move was made in ${maxTime}ms`});
        }
    }, maxTime);
});

app.post("/makeMove", (_req, res) => {
    const randomNumber = Math.trunc(Math.random() * 1000)

    eventEmitter.emit("moveMade", {randomNumber})
    res.json({text: "move was made"})
})

app.listen(3000, () => {
    console.log("running on 3000");
});
