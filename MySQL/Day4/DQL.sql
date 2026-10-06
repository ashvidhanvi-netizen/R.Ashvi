create database employ;
use employ; 

create table employtable (
empid int primary key auto_increment,
name varchar (20),
age varchar (20),
department varchar (30),
salary varchar (30),
city varchar (20)

);
INSERT INTO employtable(name, age, department, city, salary) VALUES 
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

select department, count(*) from employtable group by department;
select sum(salary),max(salary),min(salary),avg(salary)from employtable;
select department, avg(salary)from employtable group by department;
select city, count(*) from employtable group by city;
select department, count(*) from employtable group by department having count(empid) > 2;
INSERT INTO employtable(name, age, department, city, salary) VALUES 
("Ajay", 32, "IT", "Chennai", 150000);
select department, sum(salary)from employtable group by department having sum(salary)>100000;
ALTER TABLE employtable CHANGE salary salary int ;
select department, avg(salary)from employtable group by department having avg(salary) > 40000;
select department, count(empid), avg(salary)from employtable group by department having count(empid) >= 2;
select city, sum(salary), max(salary)from employtable group by city having sum(salary) > 80000;
select department, count(empid), sum(salary), avg(salary), min(salary), max(salary)
from employtable group by department having count(empid) >= 2 and avg(salary) > 40000 
order by avg(salary) desc;

