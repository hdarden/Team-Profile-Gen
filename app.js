const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

//function for all inquirer questions. Gets all employee info
function questions() {
    //prompts for employee info
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the team member's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the team member's ID?",
        name: "id",
      },
      {
        type: "checkbox",
        message: "Please choose the team member's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    //determining which role was chosen
    .then(function ({ name, id, email, role }) {
      console.log(role[0]);
      let specInfo = "";
      if (role[0] === "Manager") {
        specInfo = "Office number";
      } else if (role[0] === "Engineer") {
        specInfo = "GitHub username";
      } else {
        specInfo = "school name";
      }

      //prompting the question based off of role chosen--not prompting correctly
      inquirer
        .prompt([
          {
            type: "input",
            message: `What is your team member's ${specInfo}?`,
            name: "info",
          },
        ])
        .then(function ({ info }) {
          console.log(info);
          let newEmployee;
          if (role[0] === "Manager") {
            newEmployee = new Manager(name, id, email, role[0], info);
          } else if (role[0] === "Engineer") {
            newEmployee = new Engineer(name, id, email, role[0], info);
          } else {
            newEmployee = new Intern(name, id, email, role[0], info);
          } //push employees to new employee array on line 12
          employees.push(newEmployee);
          
          //prompts user to comfirm if they want to add more employees
          inquirer
            .prompt([
              {
                type: "confirm",
                message: "Would you like to add another employee?",
                name: "employee",
              },
            ])
            .then(function ({ employee }) {
              if (employee) {
                questions();
              } else {
                let employeeList = render(employees);

                fs.writeFile(outputPath, employeeList, "utf8", (err) => {
                  if (err) {
                    return err;
                  } else {
                    console.log("Success!");
                  }
                });
              }
            });
        });
    });
}

questions();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
