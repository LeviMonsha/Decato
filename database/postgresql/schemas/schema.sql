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
('ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'theory', '{"text": "What is supervised learning?"}', 1),
('ccccccc2-cccc-cccc-cccc-ccccccccccc2', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'practice', '{"text": "Implement linear regression."}', 2),
('ccccccc3-cccc-cccc-cccc-ccccccccccc3', 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'theory', '{"text": "How to create line plots with Matplotlib."}', 1),
('ccccccc4-cccc-cccc-cccc-ccccccccccc4', 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4', 'quiz', '{"text": "Probability quiz: What is P(A or B)?"}', 1);
