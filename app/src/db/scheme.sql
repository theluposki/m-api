
#mariadb
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  nickname VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--sqlite
INSERT INTO users
(id, nickname, email, password)
VALUES
("440da3ba-073d-4809-901d-f87586749380", "luposki", "lu@mail.com", "12345");


--Perfil
--mariadb
CREATE TABLE user_profiles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  picture TEXT,
  links JSON CHECK (JSON_VALID(links)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `user_profile_user` FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--Endereço
CREATE TABLE addresses (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  complement VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE RESTRICT
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--Friend Requests


CREATE TABLE friend_requests (
  id VARCHAR(36) PRIMARY KEY,
  sender_id VARCHAR(36) NOT NULL,
  recipient_id VARCHAR(36) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SELECT up.nickname, up.picture, fr.status
FROM user_profiles up
JOIN friend_requests fr ON up.user_id = fr.sender_id
WHERE fr.recipient_id = '884390d6-7bff-463f-9475-3f4d863d8bae' AND fr.status = 'pending';


CREATE TABLE friends (
  id VARCHAR(36) PRIMARY KEY,
  user1_id VARCHAR(36) NOT NULL,
  user2_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


SELECT f.id, up.nickname, up.picture
FROM user_profiles up JOIN friends f ON up.user_id = f.user2_id
WHERE
f.user1_id = "884390d6-7bff-463f-9475-3f4d863d8bae"
OR f.user2_id = "884390d6-7bff-463f-9475-3f4d863d8bae";


https://i.pravatar.cc/150?img=38

UPDATE user_profiles
SET picture = 'https://i.pravatar.cc/150?img=38'
WHERE id = 'eaad3397-f392-48bf-9989-21fa0f6a2fba';


SELECT fr.id, u.nickname, up.picture, fr.status 
FROM user_profiles AS up 
INNER JOIN friend_requests AS fr 
ON up.user_id = fr.sender_id 
INNER JOIN users AS u 
ON u.id = up.user_id 
WHERE fr.recipient_id = "f0b12100-f1d4-45a5-b8aa-3e065fb745c7" 
AND fr.status = 'pending';

