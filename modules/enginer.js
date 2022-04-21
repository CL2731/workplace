const Employee = require("./employee")

class Enginer extends Employee {
    constructor (name, id, email, github) {
        this.github = github
        super(name, id, email)
    }
    getRole() {
        return "Enginer"
    }
    getGitHub() {
        return this.github
    }
}

module.exports = Enginer