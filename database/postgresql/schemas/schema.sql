SET search_path TO decatopg;

INSERT INTO course_category (id, name, description, parent_category_id) VALUES
('11111111-1111-1111-1111-111111111111', 'Data Science', 'All Data Science related courses', NULL);

INSERT INTO course_category (id, name, description, parent_category_id) VALUES
('22222222-2222-2222-2222-222222222222', 'Machine Learning', 'Courses on ML algorithms and techniques', '11111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333333', 'Data Visualization', 'Courses on visualizing data effectively', '11111111-1111-1111-1111-111111111111'),
('44444444-4444-4444-4444-444444444444', 'Statistics & Math', 'Mathematical foundations for Data Science', '11111111-1111-1111-1111-111111111111');

INSERT INTO course (id, title, description, difficulty_level, category_id, sort_order) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Introduction to Machine Learning', 'Learn the basics of machine learning including supervised and unsupervised methods.', 2, '22222222-2222-2222-2222-222222222222', 1),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Data Visualization with Python', 'Master data visualization using Matplotlib and Seaborn libraries.', 1, '33333333-3333-3333-3333-333333333333', 1),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Statistics for Data Science', 'Understand probability, distributions, and statistical inference.', 3, '44444444-4444-4444-4444-444444444444', 1);

INSERT INTO chapter (id, course_id, title, sort_order, description) VALUES
('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Supervised Learning', 1, 'Learn about regression and classification algorithms.'),
('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Unsupervised Learning', 2, 'Explore clustering and dimensionality reduction techniques.'),
('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Matplotlib Basics', 1, 'Introduction to Matplotlib for plotting.'),
('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Probability Theory', 1, 'Fundamentals of probability and random variables.');

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
('ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'THEORY', '{"text": "What is supervised learning?"}', 1),
('ccccccc2-cccc-cccc-cccc-ccccccccccc2', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'PRACTICE', '{"text": "Implement linear regression."}', 2),
('ccccccc3-cccc-cccc-cccc-ccccccccccc3', 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'THEORY', '{"text": "How to create line plots with Matplotlib."}', 1),
('ccccccc4-cccc-cccc-cccc-ccccccccccc4', 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4', 'QUIZ', '{"text": "Probability quiz: What is P(A or B)?"}', 1);

---

INSERT INTO competition (id, title, description, image_url, start_date, end_date, difficulty_level, is_active) VALUES
('a3f1c9d2-8b4e-4f5a-b8e7-2e5d8c9f1a2b', 
 'Titanic: Machine Learning from Disaster', 
 'Predict survival on the Titanic and get familiar with ML basics.', 
 'https://example.com/images/titanic.png', 
 '2025-06-01T00:00:00+00', 
 '2025-07-01T23:59:59+00', 
 3, 
 TRUE),

('b7d2e3f4-9c6f-4e7a-8d3f-4c6b5a7e9f1d', 
 'House Prices: Advanced Regression Techniques', 
 'Predict sales prices and practice advanced regression models.', 
 'https://example.com/images/house_prices.png', 
 '2025-07-15T00:00:00+00', 
 '2025-08-15T23:59:59+00', 
 6, 
 TRUE),

('c5e4f6a7-1b2c-4d3e-9f8a-5b6c7d8e9f0a', 
 'Digit Recognizer', 
 'Identify digits from handwritten images using computer vision.', 
 'https://example.com/images/digit_recognizer.png', 
 '2025-08-01T00:00:00+00', 
 '2025-09-01T23:59:59+00', 
 5, 
 TRUE),

('d9f8e7c6-b5a4-3d2c-1e0f-9a8b7c6d5e4f', 
 'New York City Taxi Trip Duration', 
 'Predict the duration of taxi trips in NYC using time series and geospatial data.', 
 'https://example.com/images/nyc_taxi.png', 
 '2025-09-10T00:00:00+00', 
 '2025-10-10T23:59:59+00', 
 7, 
 FALSE);
