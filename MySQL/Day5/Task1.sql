create database studentdb;

use studentdb;

create table studentcourse (
    student_id int primary key auto_increment,
    student_name varchar(50),
    course_id int,
    course_name varchar(50),
    trainer_name varchar(50)
);
INSERT INTO studentcourse
(student_id, student_name, course_id, course_name, trainer_name)
VALUES
(1, 'Arun', 101, 'Java', 'Ravi'),
(2, 'Bala', 101, 'Java', 'Ravi'),
(3, 'Kumar', 102, 'Python', 'Karthik'),
(4, 'Priya', 101, 'Java', 'Ravi'),
(5, 'Divya', 102, 'Python', 'Karthik');

SELECT * FROM studentcourse;
CREATE TABLE Courses (
course_id int primary key auto_increment,
course_name varchar(50),
trainer_name varchar(50)
);
INSERT INTO Courses (course_id, course_name, trainer_name)
VALUES
(101, 'Java', 'Ravi'),
(102, 'Python', 'Karthik');
CREATE TABLE Students (
    student_id int primary key auto_increment,
    student_name varchar(50),
    course_id int,
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);
INSERT INTO Students (student_id, student_name, course_id)
VALUES
(1, 'Arun', 101),
(2, 'Bala', 101),
(3, 'Kumar', 102),
(4, 'Priya', 101),
(5, 'Divya', 102);






