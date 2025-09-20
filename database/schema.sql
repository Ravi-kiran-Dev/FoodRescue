-- Create database
CREATE DATABASE foodrescue;

-- Connect to database
\c foodrescue;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('donor', 'ngo', 'volunteer')),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food posts table
CREATE TABLE food_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    location POINT,
    pickup_address TEXT,
    expiry TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'claimed', 'picked_up')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Claims table
CREATE TABLE claims (
    id SERIAL PRIMARY KEY,
    food_post_id INTEGER REFERENCES food_posts(id) ON DELETE CASCADE,
    claimed_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed')),
    pickup_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_food_posts_status ON food_posts(status);
CREATE INDEX idx_food_posts_user_id ON food_posts(user_id);
CREATE INDEX idx_claims_food_post_id ON claims(food_post_id);
CREATE INDEX idx_claims_claimed_by ON claims(claimed_by);

-- Insert sample data
INSERT INTO users (name, email, password, role, phone) VALUES
('Restaurant A', 'restaurant@example.com', '$2b$10$8K1p/a0dURXAm7QiTRqNa.E3kV5gi7pD08p8u7SJapFCs06VxV3/W', 'donor', '+1234567890'),
('Community Kitchen', 'kitchen@example.com', '$2b$10$8K1p/a0dURXAm7QiTRqNa.E3kV7pD08p8u7SJapFCs06VxV3/W', 'ngo', '+1234567891'),
('Volunteer John', 'john@example.com', '$2b$10$8K1p/a0dURXAm7QiTRqNa.E3kV8pD08p8u7SJapFCs06VxV3/W', 'volunteer', '+1234567892');

INSERT INTO food_posts (user_id, title, description, pickup_address, expiry, location) VALUES
(1, 'Fresh Vegetables', 'Assorted fresh vegetables, still good for another 2 days', '123 Main St, New York, NY', NOW() + INTERVAL '2 days', POINT(-73.9857, 40.7484)),
(1, 'Bakery Items', 'Fresh bread and pastries, baked this morning', '456 Broadway, New York, NY', NOW() + INTERVAL '1 day', POINT(-73.9851, 40.7589));