
INSERT INTO departments ( names )
VALUES ('Marketing'), ('Sales'), ('Development'), ('Accounting'), ('Maintenance');

INSERT INTO roles (title, salary, department_id)
  VALUES
      ('Manager', 80000, 1),
      ( 'Salesperson', 50000, 1),
      ('Developer', 60000, 3),
      ('Accountant', 50000, 4),
      ('Janitor', 40000, 5);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
VALUES
  ('Jason', 'Randolph', 1, NULL),  
  ('John', 'Franklin', 1, NULL),  
  ('Andrew', 'Booker', 2, 1),  
  ('Jennifer', 'Washington', 3, 2), 
  ('Jessica', 'Williams', 2, 1); 

  