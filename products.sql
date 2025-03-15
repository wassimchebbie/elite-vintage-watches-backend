CREATE TABLE Products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price FLOAT,
  description TEXT,
  image VARCHAR(255)
);
INSERT INTO Products (name, price, description, image) VALUES
  ('Vintage Gold Watch', 100.00, 'A classic gold watch', 'gold-watch.jpg');