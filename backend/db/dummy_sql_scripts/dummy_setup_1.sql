INSERT INTO Department (ID, depName)
VALUES (1, 'Generic Department');

INSERT OR IGNORE INTO Student (ID, name, email, phone, dep_ID)
VALUES
(1, 'Quandale Dingle', 'quandaledingle@email.com', '1234567890', 1),
(2, 'Olympia Barbrook', 'obarbrook@si.edu', '243-858-6229', 1);

INSERT OR IGNORE INTO Faculty (ID, facName, facEmail, facIsAdmin, dep_ID)
VALUES
(1, 'Analise Belshaw', 'abelshaw0@g.co', false, 1);

INSERT OR IGNORE INTO Course (ID, courseName, courseCredits, courseCode, year, dep_ID, fac_ID)
VALUES
(1, 'Gliding Lessons', 4, 'R5-101', 2000, 1, 1);

INSERT OR IGNORE INTO Enrolls (student_ID, course_ID)
VALUES (2, 1), (1, 1);

INSERT OR IGNORE INTO Lectures (course_ID, lectureDate, lectureNumber)
VALUES
(1, CURRENT_DATE, 1),
(1, CURRENT_DATE, 2),
(1, DATE('now', '-1 day'), 1);
