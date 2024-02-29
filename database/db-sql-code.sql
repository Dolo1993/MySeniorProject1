-- Table structure for the 'membership table'

CREATE TABLE IF NOT EXISTS membership (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    placeofbirth VARCHAR(100) NOT NULL,
    university VARCHAR(100) NOT NULL,
    interests TEXT,
    comments TEXT
);

-- Table structure for the 'contact form' 
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 

--  added date column in the table
ALTER TABLE membership
ADD COLUMN date_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

