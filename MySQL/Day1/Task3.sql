create database Product;
use product;
create table emptable(
productid int primary key auto_increment,
productname varchar(20),
productcategory varchar(20),
productprice int(5.0),
productquantity int(5.0),
productstartdate date,
productenddate date,
productstatus varchar(20) default 'Available'
);
ALTER TABLE emptable ADD productrate varchar (20);
SELECT * FROM emptable;
