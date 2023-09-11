const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const teamMembers = [];

// Function to prompt for manager's information
function promptManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the team manager's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the team manager's employee ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the team manager's email address:",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Enter the team manager's office number:",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      teamMembers.push(manager);
      promptMenu();
    });
}

// Function to prompt for intern's information
function promptIntern() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: "Enter the intern's name:",
        },
        {
          type: 'input',
          name: 'id',
          message: "Enter the intern's employee ID:",
        },
        {
          type: 'input',
          name: 'email',
          message: "Enter the intern's email address:",
        },
        {
          type: 'input',
          name: 'school',
          message: "Enter the intern's school:",
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        teamMembers.push(intern);
        promptMenu();
      });
  }
  // Function to prompt the user with the menu
function promptMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select an option:',
          choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case 'Add an engineer':
            promptEngineer();
            break;
          case 'Add an intern':
            promptIntern();
            break;
          case 'Finish building the team':
            generateHTML();
            break;
        }
      });
  }
  
  // Function to generate and save HTML
  function generateHTML() {
    const html = render(teamMembers);
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, html);
    console.log(`Team HTML file saved to ${outputPath}`);
  }
  
  // Start the application by prompting for the manager's information
  promptManager();
  
  
