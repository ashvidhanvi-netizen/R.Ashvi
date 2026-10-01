create database student;
use student;
create table details(
studentid int primary key auto_increment,
name varchar (20),
age varchar (20),       
Department varchar (20),
City varchar (20)      

);
insert into details (name, age, department, city)
values ("Ravi", 22, "CSE", "Chennai");
select*from details;

create database Multistudent;
use  Multistudent;

create table Multitable(
Multiid int primary key auto_increment, 
name varchar (20),
age varchar (20),
department varchar (20),
city varchar (20)

);
insert into Multitable (name, age, department, city)
values ("Arun", 23, "IT", "Madurai"),
       ("Bala", 21, "ECE", "Chennai"),
       ("Priya", 24, "CSE", "Coimbatore");
       
select*from Multitable;
UPDATE Multitable SET city = "Bangalore" WHERE Multiid = 2;
UPDATE multitable SET age = 25 WHERE Multiid = 3;
UPDATE Multitable SET age = 24, department = "IT", city = "Chennai" WHERE Multiid = 1;
SET SQL_SAFE_UPDATES = 0;
UPDATE Multitable SET city = "Madurai" WHERE department ="CSE";
insert into Multitable (name, age, department, city)
values ("Hema", 26, "EEE", "Thanjur");
DELETE FROM Multitable WHERE Multiid = 4;
DELETE FROM Multitable WHERE city = "Salem";
DESCRIBE Multitable;
ALTER TABLE Multitable ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
UPDATE Multitable SET city = 'Chennai' WHERE Multiid = 2;
SELECT Multiid, name, city, updated_at FROM Multitable WHERE Multiid = 2;

INSERT INTO Multitable (name, age, department, city) VALUES ('Karthik', 22, 'CSE', 'Chennai');
INSERT INTO Multitable (name, age, department, city)
VALUES
('Divya', 23, 'IT', 'Madurai'),
('Rahul', 21, 'ECE', 'Chennai');
UPDATE Multitable
SET city = 'Bangalore'
WHERE Multiid = 1;
UPDATE Multitable
SET age = 25, department = 'CSE' WHERE Multiid = 2;
DELETE FROM Multitable WHERE Multiid = 3;


select*from Multitable;



       



