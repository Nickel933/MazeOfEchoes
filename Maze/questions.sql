CREATE DATABASE maze_game;

USE maze_game;

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Math', 'GK'),
    question TEXT NOT NULL,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_option CHAR(1)
);

-- Sample questions
INSERT INTO questions (category, question, option_a, option_b, option_c, option_d, correct_option) VALUES
('Math', 'What is 5 * 6?', '11', '30', '20', '10', 'B'),
('GK', 'Who wrote the Indian National Anthem?', 'Tagore', 'Gandhi', 'Nehru', 'Subhas', 'A');
