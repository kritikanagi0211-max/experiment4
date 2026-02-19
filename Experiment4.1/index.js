const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const FILE = "data.json";

function loadEmployees() {
  return JSON.parse(fs.readFileSync(FILE));
}

function saveEmployees(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function menu() {
  console.log("\n1. Add Employee");
  console.log("2. View Employees");
  console.log("3. Exit");

  rl.question("Choose option: ", choice => {
    if (choice == 1) addEmployee();
    else if (choice == 2) viewEmployees();
    else rl.close();
  });
}

function addEmployee() {
  rl.question("Enter Name: ", name => {
    rl.question("Enter Position: ", position => {
      const emp = loadEmployees();
      emp.push({ name, position });
      saveEmployees(emp);
      console.log("Employee Added");
      menu();
    });
  });
}

function viewEmployees() {
  console.table(loadEmployees());
  menu();
}

menu();
