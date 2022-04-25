const inquirer = require('inquirer')
const fs = require("fs")
const manager = require("./modules/manager")
const engineer =  require("./modules/engineer")
const intern =  require("./modules/intern")
const path = require("path")
const render = require("./src/template.js")
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outPutPath = path.join(OUTPUT_DIR, "team.html")
const newTeam = [];
const idArray = [];

function appMenu () {
    function createManager(){
        inquirer.prompt([
    {
        type: "input",
        name: "Manager_name",
        message: "Please enter manager name.",
        validate: answer => {
            if (answer !== ""){
                return true;
            } 
            return "Please enter managers name."
        }
    },
    {
        type: "input",
        name: "Manager_id",
        message: "What is your id?",
        validate: answer => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass){
                return true;
            } 
            return "Please enter a valid id."}
    },
    {
        type: "input",
        name: "Manager_email",
        message: "What is your email?",
        validate: answer => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass){
                return true;
            } 
            return "Please enter a valid email address."}
    },
    {
        type: "intput",
        name: "Manager_office",
        message: "What is the office number?"
    },   
    ])
    .then(responses => {
        var newManager = new manager(responses.Manager_name, responses.Manager_id, responses.Manager_email, responses.Manager_office)
        newTeam.push(newManager);
        idArray.push(responses.Manager_id);
        next();
    })
    }
function next() {
    inquirer.prompt([
        {
            type: "list",
            name: "Member_choice",
            message: "Would you like to add people to your team?",
            choices: ["Engineer", "Intern", "No"]
        }
    ])
    .then(responses => {
        switch (responses.Member_choice) {
            case "Engineer": addEngineer();
            break;
            case "Intern": temp();
            break;
            default : buildTeam();
        }
    });
}
function addEngineer() {
    inquirer.prompt([
    {
        type: "input",
        name: "Engineer_name",
        message: "Please enter Engineer name."
        // add validation and return
    },
    {
        type: "input",
        name: "Engineer_id",
        message: "What is their id?"
    },
    {
        type: "input",
        name: "Engineer_email",
        message: "What is their email?"
    },
    {
        type: "intput",
        name: "Engineer_github",
        message: "What is their GitHub username?"
    },   
    ])
    .then(responses => {
        var newEngineer = new engineer(responses.Engineer_name, responses.Engineer_id, responses.Engineer_email, responses.Engineer_github)
        newTeam.push(newEngineer);
        idArray.push(responses.Engineer_id);
        next();
    });
}
function temp() {
    inquirer.prompt([
    {
        type: "input",
        name: "Intern_name",
        message: "Please enter Intern name."
        // add validation and return
    },
    {
        type: "input",
        name: "Intern_id",
        message: "What is their id?"
    },
    {
        type: "input",
        name: "Intern_email",
        message: "What is their email?"
    },
    {
        type: "intput",
        name: "Intern_school",
        message: "What is their School?"
    },   
    ])
    .then(responses => {
        var newIntern = new intern(responses.Intern_name, responses.Intern_id, responses.Intern_email, responses.Intern_school)
        newTeam.push(newIntern);
        idArray.push(responses.Intern_id);
        next()
    })
}
function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outPutPath, render(newTeam))
}
    createManager();
}

appMenu();




// fs writeFile that will create an html document