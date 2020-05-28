// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name, id, email, role, school){
        super(name, id, email, role);
        this.school = school;

    }

    getRole(){
        return this.role;
    }

    getSchool(){
        return this.school;
    }

} 
module.exports = Intern;

var person = new Intern("Sue", 4534, "jk@test.com", "Intern", "UCLA")
console.log(person)