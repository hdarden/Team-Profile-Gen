// TODO: Write code to define and export the Employee class
 class Employee {
    //creates and initializes the object created within the Employee class
    constructor (name, id, email, role){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    } 

    getName() {
        return this.name;
    }

    getId() {
        return this.id;

    }

    getEmail() {
        return this.email;

    }

    getRole() {
        return this.role;
    }

}

module.exports = Employee

