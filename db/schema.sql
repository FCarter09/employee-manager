USE employee_manager;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;


CREATE TABLE departments (
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   names VARCHAR(30) UNIQUE NOT NULL

);

CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id) 

);

 CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED, 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
   
);

