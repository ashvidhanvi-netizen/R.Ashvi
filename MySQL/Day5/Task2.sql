create database employe;
use employe;

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(50),
    salary INT,
    department_id INT
);

INSERT INTO employees
(employee_id, employee_name, salary, department_id)
VALUES
(1, 'Arun', 45000, 10),
(2, 'Bala', 35000, 20),
(3, 'Kumar', 55000, 10),
(4, 'Priya', 40000, 30);
SELECT * FROM employees;

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);
SELECT * FROM departments;

INSERT INTO departments
(department_id, department_name)
VALUES
(10, 'IT'),
(20, 'HR'),
(30, 'Finance'),
(40, 'Marketing');

SELECT 
    employees.employee_id,
    employees.employee_name,
    employees.salary,
    departments.department_name
FROM employees INNER JOIN departments ON employees.department_id = departments.department_id;
