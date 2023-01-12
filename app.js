const express = require("express");
// const calculator = require("calculator")
const bodyparse = require("body-parser");
// const bodyParser = require("body-parser");
const app = express();

app.use(express.json())
// app.use(bodyParser)
const response = {
    failure: {
        status: "Failure",
        message: "Please give correct inputs"
    },
    invalidinputs: {
        status: "error",
        message: "Invalid inputs"
    },
    underflow: {
        status: "error",
        message: "underflow",
    },
    overflow: {
        status: "error",
        message: "Overflow",
    }
}

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("*", (req, res) => {
    res.status(404).json({
        status: "Failed",
        message: "API Not Found"
    })
})

function checkvalue(num1, num2) {
    if (num1 == "" || num2 == "") {
        return false
    }
    return true
}

function validinput(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return false
    }
    return true
}

app.post("/add", (req, res) => {
    // let num1 = + req.body.num1;
    let num1 = req.body.num1;
    // let num2 = + req.body.num2;
    let num2 = req.body.num2;
    // let sum = num1 + num2
    let sum = Number(num1) + Number(num2)
    // if (num1 == "" || num2 == "") {
    //     return res.json({
    //         status: "Failure",
    //         message: "Please give correct inputs"
    //     })
    // }
    if (!checkvalue(num1, num2)) {
        return res.status(400).json(response.failure)
    }
    // if (isNaN(num1) || isNaN(num2)) {
    //     return res.json({
    //         status: "error",
    //         message: "Invalid inputs"
    //     })
    // }
    if (!validinput(num1, num2)) {
        return res.status(400).json(response.invalidinputs)
    }
    
    if (Number(num1) < -1000000 || Number(num2) < -1000000 || sum < -1000000) {
        res.json(response.underflow)
    }
    if (Number(num1) > 1000000 || Number(num2) > 1000000 || sum > 1000000) {
        res.json(response.overflow)
    }
    // res.send(sum)
    res.json({
        status: "success",
        message: "the sum of given two numbers",
        // sum: num1+num2
        sum: sum
    })
})

app.post("/sub", (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let sub = Number(num1) - Number(num2)

    if (!checkvalue(num1, num2)) {
        return res.status(400).json(response.failure)
    }
    if (!validinput(num1, num2)) {
        return res.status(400).json(response.invalidinputs)
    }
    if (Number(num1) < -1000000 || Number(num2) < -1000000 || sub < -1000000) {
        res.json(response.underflow)
    }
    if (Number(num1) > 1000000 || Number(num2) > 1000000 || sub > 1000000) {
        res.json(response.overflow)
    }
    res.json({
        status: "success",
        message: "the diff of given two numbers",
        sub: sub
    })
})

app.post("/mul", (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let mul = Number(num1) * Number(num2)
    if (!checkvalue(num1, num2)) {
        return res.status(400).json(response.failure)
    }
    if (!validinput(num1, num2)) {
        return res.status(400).json(response.invalidinputs)
    }
    if (Number(num1) < -1000000 || Number(num2) < -1000000 || mul < -1000000) {
        res.json(response.underflow)
    }
    if (Number(num1) > 1000000 || Number(num2) > 1000000 || mul > 1000000) {
        res.json(response.overflow)
    }
    res.json({
        status: "success",
        message: "the mul of given two numbers",
        mul: mul
    })
})

app.post("/div", (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let div = Number(num1) / Number(num2)
    if (!checkvalue(num1, num2)) {
        return res.status(400).json(response.failure)
    }
    if (!validinput(num1, num2)) {
        return res.status(400).json(response.invalidinputs)
    }
    if (Number(num2) == 0) {
        res.status(404).json({
            status: "error",
            message: "Divide by zero"
        })
    }
    if (Number(num1) < -1000000 || Number(num2) < -1000000 || div < -1000000) {
        res.json(response.underflow)
    }
    if (Number(num1) > 1000000 || Number(num2) > 1000000 || div > 1000000) {
        res.json(response.overflow)
    }
    res.json({
        status: "success",
        message: "the div of given two numbers",
        div: div
    })
})

app.listen(9000, () => { console.log("Server is up at 9000") })

