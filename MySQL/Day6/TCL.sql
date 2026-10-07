create database empldb;
USE empldb;
create table empltable(
 empid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    age INT,
    department VARCHAR(30),
    salary INT,
    city VARCHAR(20)
);
INSERT INTO empltable (name, age, department, salary, city)
VALUES
('Arun', 24, 'IT', 32000, 'Chennai'),
('Bala', 26, 'IT', 45000, 'Madurai'),
('Kumar', 28, 'IT', 55000, 'Salem'),
('Priya', 25, 'HR', 38000, 'Chennai'),
('Divya', 27, 'HR', 42000, 'Madurai'),
('Rahul', 29, 'Finance', 50000, 'Chennai'),
('Sneha', 24, 'Finance', 35000, 'Salem'),
('Vijay', 30, 'Sales', 48000, 'Chennai'),
('Meena', 26, 'Sales', 30000, 'Madurai'),
('Karthik', 31, 'Marketing', 52000, 'Chennai');

CREATE TABLE departmenttable (
    deptid INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(30)
);
INSERT INTO departmenttable (department)
VALUES
('IT'),('HR'),('Finance'),('Sales'),('Marketing'),('Support');


SELECT *FROM empltable WHERE salary > (SELECT AVG(salary) FROM empltable);
SELECT *FROM empltable WHERE salary = (SELECT MAX(salary) FROM empltable);
SELECT *FROM empltable WHERE salary = (SELECT MIN(salary) FROM empltable);
SELECT *FROM empltable WHERE salary > (SELECT AVG(salary) FROM empltable WHERE department = 'IT');
SELECT *FROM empltable WHERE department IN (SELECT department FROM empltable 
WHERE department IN ('IT', 'HR'));
SELECT *FROM empltable WHERE department NOT IN (SELECT department FROM empltable
WHERE department = 'HR');
SELECT *FROM departmenttable d WHERE EXISTS (SELECT *FROM empltable e 
WHERE e.department = d.department);
SELECT *FROM departmenttable d WHERE NOT EXISTS (SELECT *FROM empltable e
WHERE e.department = d.department);
SELECT *FROM empltable WHERE salary < (SELECT MAX(salary) FROM empltable);
SELECT *FROM empltable e1 WHERE salary > (SELECT AVG(salary)FROM empltable e2
WHERE e2.department = e1.department);
