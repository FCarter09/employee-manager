db = require('./db/connection');
const inquirer = require('inquirer');


// connecting to the database
db.connect((err) => {
    if(err) throw err;

    console.log(
        '================',
        'Employee Tracker',
        '================'
    )
//ask questions of database with inquirer
    askQuestions();
  
});


const askQuestions = () => {
     //ask questions of database with inquirer
     inquirer.prompt({
        name:'userResponse',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee',
            'Delete Employee',
            'Exit'
        ],
    })
    .then((userResponse) => {
        // View all departments
        if (userResponse.userResponse === 'View All Departments') {
            const departments = `SELECT * FROM departments`;
            // write SQL query
            db.query(departments, (err, res) => {
                // if there is a response from the database
                if (res) {
                    console.log('List of departments:');
                    console.table(res)

                    //ask another question here. Use the askQuestions function
                    askQuestions()
    
                }else{
                    console.log('Error!', err)
                }
            }) 
         // View all roles   
        }else if (userResponse.userResponse === 'View All Roles') {
            const roles = `SELECT * FROM roles`;
            db.query(roles, (err, res) => {
                if (res) {
                    console.log('List of Roles:');
                    console.table(res);

                    //ask another question here. Use the askQuestions function
                    askQuestions()
                 
                }else{
                    console.log('Error!', err);
                }
            });
        // View all employees
        }else if (userResponse.userResponse === 'View All Employees') {
            const employees = `SELECT employees.*, roles.title AS role_title, roles.salary AS role_salary, departments.names AS department_name
                                FROM employees
                                LEFT JOIN roles ON employees.role_id = roles.id
                                LEFT JOIN departments ON employees.role_id = departments.id`;
                               

            db.query(employees, (err, res) => {
                if (res) {
                    console.log('List of Employees:');
                    console.table(res);

                    //ask another question here. Use the askQuestions function
                    askQuestions()
                }else{
                    console.log('Error', err);
                }
            });
        // Add a department
        }else if (userResponse.userResponse === 'Add Department') {
            inquirer.prompt(
                {
                    name:'department',
                    type: 'input',
                    message: 'What is the name of the department?',
                })
                .then((response) => {

                    const department = `INSERT INTO departments (names) VALUES ('${response.department}')`
                    // insert the new department into the database
                    db.query(department)

                    askQuestions();
            })
        // Add a role
        }else if (userResponse.userResponse === 'Add Role') {
            inquirer.prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the role?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the role?'
                },
                {
                    name: 'department_id',
                    type: 'input',
                    message: 'What is the department ID of this role?'
                }])
                .then((response) => {
                    const role = `INSERT INTO roles (title, salary, department_id) 
                                 VALUES ('${response.title}', '${response.salary}', '${response.department_id}')`;
                    // insert the new role into the database
                    db.query(role)

                    askQuestions();

                })
            // Add an employee
            }else if (userResponse.userResponse === 'Add Employee') {
                inquirer.prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the first name of this employee?'
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the last name of this employee?'
                    },
                    {
                        name: 'role_id',
                        type: 'input',
                        message: 'What is the role ID for this employee?'
                    },
                    {
                        name: 'manager_id',
                        type: 'input',
                        message: "What is the manager's ID for this employee?"
                    }])
                    .then((response) => {
                        const employee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                                     VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`;
                        // insert the new employee into the database
                        db.query(employee)
    
                        askQuestions();
    
                    })
                // Update and Employee
                }else if (userResponse.userResponse === 'Update Employee') {
                    inquirer.prompt([
                        {
                            name:'employee_id',
                            type: 'input',
                            message: 'Select employee you want to update by their employee ID:',
                        },
                        {   name: "role_id",
                            type: 'input',
                            message: 'Please select new role ID for employee:'
                        }
                        ])
                        .then((response) => {
                            const update = `UPDATE employees SET role_id = ${response.role_id}
                                    WHERE id = ${response.employee_id}`;
                     
                            db.query(update)

                            askQuestions();
                    })
                // Delete and employee
                }else if (userResponse.userResponse === 'Delete Employee') {
                    inquirer.prompt(
                        {
                            name: 'employee',
                            type: 'input',
                            message: 'Please select the employee you want to delete by their employee ID:'
                        })
                        .then((response) => {
                            const deleteEmployee = `DELETE FROM employees WHERE id = ${response.employee}`; 

                            db.query(deleteEmployee);

                            askQuestions();
                        })
                }
    });
}




