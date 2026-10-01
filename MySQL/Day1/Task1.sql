create database employeedb;
use employeedb;
create table emptable (
workerid int primary key auto_increment,
workername varchar (20),
workeremail varchar (20)unique,
workermobile varchar (20),
workerdepartment varchar (20),
workerjoindate varchar (20),
userrole varchar (20) default 'Admin'

);
ALTER TABLE emptable ADD userage varchar (20);
USE employeedb;
SELECT * FROM emptable;
