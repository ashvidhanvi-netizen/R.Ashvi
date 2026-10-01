create database office;
use office;
create table emptable(
officeid int primary key auto_increment,
officername varchar(50),
department varchar(50),
officeaddress varchar(100),
startdate date,
enddate date,
officestatus varchar(20) default 'Active'
);
ALTER TABLE emptable ADD officerage varchar (20);
select*from emptable; 




