CREATE TABLE IF NOT EXISTS Department (
	ID INTEGER PRIMARY KEY,
	depName VARCHAR (20)
);

CREATE TABLE IF NOT EXISTS Student (
	ID INTEGER PRIMARY KEY,
	name VARCHAR (100),
	email VARCHAR (100) UNIQUE,
	phone VARCHAR (20) UNIQUE,
	dep_ID INTEGER REFERENCES Department(ID)
);

CREATE TABLE IF NOT EXISTS Faculty (
	ID INTEGER PRIMARY KEY,
	facName VARCHAR (100),
	facEmail VARCHAR (100) UNIQUE,
	facIsAdmin BOOLEAN,
	dep_ID INTEGER REFERENCES Department(ID)
);

CREATE TABLE IF NOT EXISTS Attendance (
	attendDate DATE,
	attendStatus CHAR (1),
	course_ID INTEGER REFERENCES Course(ID),
	student_ID INTEGER REFERENCES Student(ID),
	lecture_Number INTEGER REFERENCES Lectures(lectureNumber),

	PRIMARY KEY (attendDate, student_ID, course_ID, lecture_Number)
);

CREATE TABLE IF NOT EXISTS Course (
	ID INTEGER PRIMARY KEY,
	courseName VARCHAR (50),
	courseCredits INTEGER,
	courseCode VARCHAR (50),
	year INTEGER,
	dep_ID INTEGER REFERENCES Department(ID),
	fac_ID INTEGER REFERENCES Faculty(ID)
);

CREATE TABLE IF NOT EXISTS Enrolls (
	student_ID INTEGER REFERENCES Student(ID),
	course_ID INTEGER REFERENCES Course(ID),
	
	PRIMARY KEY (student_ID, course_ID)
);

/* Account ID refers to: Student if role is 'student'
 						 Faculty if role is 'faculty' */
CREATE TABLE IF NOT EXISTS Account (
	ID INTEGER NOT NULL,
	username VARCHAR (100),
	passwordHash VARCHAR(255) NOT NULL,
	role TEXT CHECK (role IN ('student', 'faculty')) NOT NULL,

	PRIMARY KEY (ID, role)
);

CREATE TABLE IF NOT EXISTS Lectures (
	course_ID INTEGER REFERENCES Course(ID),
	lectureDate DATE,
	lectureNumber INTEGER DEFAULT 1,

	PRIMARY KEY (course_ID, lectureDate, lectureNumber)
);
