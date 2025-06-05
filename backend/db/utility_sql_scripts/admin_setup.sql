INSERT OR IGNORE INTO Faculty (ID, facName, facEmail, facIsAdmin, facPhone, dep_ID)
VALUES
(1, 'God Admin', 'gadmin@university.edu', true, '1234567890', 13);

INSERT OR IGNORE INTO Account (ID, username, passwordHash, role)
VALUES
(1, 'gadmin', '$2b$10$IfpkWENaAuEedIv9M8Yby.8FJGdgz6FTxIp4BXWFge5.olIjuCtPu', 'faculty');
