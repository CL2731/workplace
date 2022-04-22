const inquirer = require('inquirer')
const fs = require("fs")
const manager = require("./modules/manager")
const engineer =  require("./modules/engineer")
const intern =  require("./modules/intern")
const newTeam = [];

function Start() {
    inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "Please enter manager name."
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "intput",
        name: "office",
        message: "What is the office number?"
    },   
    ])
    .then(responses => {
        var newManager = new manager(responses.username, responses.id, responses.email, responses.office)
        newTeam.push(newManager)
        next()
    })
}

function next() {
    inquirer.prompt([
        {
            type: "list",
            name: "continue",
            message: "Would you like to add people to your team?",
            choices: ["Engineer", "Intern", "No"]
        }
    ])
    .then(responses => {
        switch (responses.continue) {
            case "Engineer": eng;
            case "Intern": // add Intern function  ;
            default : // add function that will generate team
        }
    })
}

function eng() {
    inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "Please enter Engineer name."
    },
    {
        type: "input",
        name: "id",
        message: "What is their id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is their email?"
    },
    {
        type: "intput",
        name: "office",
        message: "What is their GitHub?"
    },   
    ])
    .then(responses => {
        var newEngineer = new engineer(responses.username, responses.id, responses.email, responses.github)
        newTeam.push(newEngineer)
        next()
    })
}

// fs writeFile that will create an html document