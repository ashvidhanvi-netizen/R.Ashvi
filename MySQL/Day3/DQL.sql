create database employeedetails;
use employeedetails; 

create table details (
detailid int primary key auto_increment,
name varchar (20),
age varchar (20),
department varchar (30),
salary varchar (30),
city varchar (20)

);
INSERT INTO details(name, age, department, city, salary) VALUES 
("Arun", 25, "IT", "Chennai", 45000),
("Vijay", 29, "HR", "Madurai", 40000),
("Anitha", 27, "IT", "Chennai", 50000),
("Ravi", 32, "Finance", "Salem", 55000),
( "Kavi", 24, "IT", "Madurai", 35000),
("David", 28, "Sales", NULL, 42000),
("Ashok", 30, "Finance", "Chennai", 48000),
("Vimal", 26, "HR", "Salem", 38000),
("Priya", 31, "Marketing", "Chennai", 46000),
("Avi", 23, "IT", NULL, 32000);

select*from details;
SELECT name, salary, city FROM details;
SELECT * FROM details WHERE city = "Chennai";
SELECT * FROM details WHERE salary > 45000;
SELECT * FROM details WHERE age < 28;
SELECT * FROM details WHERE salary >= 40000;
SELECT * FROM details WHERE department != "HR";
SELECT * FROM details WHERE department = 'IT' AND city = "Chennai";
SELECT * FROM details WHERE city = "Chennai" OR city = "Madurai";
SELECT * FROM details WHERE salary > 40000 AND age < 30;
SELECT * FROM details WHERE city IN ('Chennai', 'Madurai', 'Salem');
SELECT * FROM details WHERE department NOT IN ('IT', 'HR');
SELECT * FROM details WHERE city IS NULL;
SELECT * FROM details WHERE city IS NOT NULL;
SELECT * FROM details WHERE salary BETWEEN 35000 AND 50000;
SELECT * FROM details WHERE age BETWEEN 25 AND 30 AND city = 'Chennai';
SELECT * FROM details WHERE name LIKE 'A%';
SELECT * FROM details WHERE name LIKE '%vi%';
SELECT DISTINCT department FROM details;
SELECT name AS employee_name, department AS department_name, salary AS monthly_salary FROM details;
select*from details;
