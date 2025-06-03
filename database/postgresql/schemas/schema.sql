SET search_path TO decatopg;

INSERT INTO course_category (id, name, description, parent_category_id) VALUES
('11111111-1111-1111-1111-111111111111', 'Data Science', 'Все курсы по Data Science', NULL);

INSERT INTO course_category (id, name, description, parent_category_id) VALUES
('22222222-2222-2222-2222-222222222222', 'Машинное обучение', 'Курсы по алгоритмам и техникам машинного обучения', '11111111-1111-1111-1111-111111111111'),
('33333333-3333-3333-3333-333333333333', 'Визуализация данных', 'Курсы по эффективной визуализации данных', '11111111-1111-1111-1111-111111111111'),
('44444444-4444-4444-4444-444444444444', 'Статистика и математика', 'Математические основы Data Science', '11111111-1111-1111-1111-111111111111');

INSERT INTO course (id, title, description, difficulty_level, category_id, sort_order) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Введение в машинное обучение', 'Изучите основы машинного обучения, включая методы с учителем и без.', 2, '22222222-2222-2222-2222-222222222222', 1),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Визуализация данных на Python', 'Освойте визуализацию данных с помощью Matplotlib и Seaborn.', 1, '33333333-3333-3333-3333-333333333333', 1),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Статистика для Data Science', 'Понимание вероятностей, распределений и статистических выводов.', 3, '44444444-4444-4444-4444-444444444444', 1);

INSERT INTO chapter (id, course_id, title, sort_order, description) VALUES
('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Обучение с учителем', 1, 'Изучение алгоритмов регрессии и классификации.'),
('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Обучение без учителя', 2, 'Изучение кластеризации и методов снижения размерности.'),
('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Основы Matplotlib', 1, 'Введение в построение графиков с Matplotlib.'),
('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Теория вероятностей', 1, 'Основы теории вероятностей и случайных величин.');

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
(
  'f1a2b3c4-d5e6-7890-abcd-ef1234567890',
  'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
  'QUIZ',
  '{
    "question": "Что такое нейронная сеть?",
    "options": [
      { "id": "opt1", "text": "Модель для обработки изображений", "is_correct": false },
      { "id": "opt2", "text": "Математическая модель, вдохновлённая биологическими нейронами", "is_correct": true },
      { "id": "opt3", "text": "Тип базы данных", "is_correct": false },
      { "id": "opt4", "text": "Язык программирования", "is_correct": false }
    ]
  }'::jsonb,
  1
);

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
(
  'f2a3b4c5-d6e7-8901-bcde-fa2345678901',
  'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1',
  'THEORY',
  '{
    "text": "Основы обратного распространения ошибки в нейронных сетях.",
    "image_url": "images/backpropagation.png"
  }'::jsonb,
  2
);

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
(
  'f3a4b5c6-d7e8-9012-cdef-ab3456789012',
  'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
  'PRACTICE',
  '{
    "text": "Реализуйте функцию активации ReLU.",
    "code_template": "def relu(x):\\n    # Ваш код здесь\\n    return max(0, x)"
  }'::jsonb,
  1
);

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
(
  'f4a5b6c7-d8e9-0123-def0-bc4567890123',
  'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3',
  'GRAPH',
  '{
    "text": "Проанализируйте график функции активации.",
    "graph_url": "images/relu_graph.png",
    "questions": [
      "Какое значение функции при x = -1?",
      "Какое значение функции при x = 2?"
    ]
  }'::jsonb,
  1
);

INSERT INTO task (id, chapter_id, type, content, sort_order) VALUES
(
  'f5a6b7c8-d9e0-1234-ef01-cd5678901234',
  'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2',
  'ML',
  '{
    "text": "Обучите простую нейронную сеть на предоставленном датасете и загрузите файл с предсказаниями.",
    "dataset_url": "datasets/neural_network_training.csv",
    "submission_format": "CSV с колонкой ''prediction''"
  }'::jsonb,
  2
);

INSERT INTO task_option (id, task_id, option_text, is_correct) VALUES
('11111111-1111-1111-1111-111111111111', 'f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Модель для обработки изображений', FALSE),
('22222222-2222-2222-2222-222222222222', 'f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Математическая модель, вдохновлённая биологическими нейронами', TRUE),
('33333333-3333-3333-3333-333333333333', 'f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Тип базы данных', FALSE),
('44444444-4444-4444-4444-444444444444', 'f1a2b3c4-d5e6-7890-abcd-ef1234567890', 'Язык программирования', FALSE);

INSERT INTO competition (id, title, description, image_url, start_date, end_date, difficulty_level, is_active) VALUES
('a3f1c9d2-8b4e-4f5a-b8e7-2e5d8c9f1a2b', 
 'Титаник: Машинное обучение на основе катастрофы', 
 'Предсказать выживание на Титанике и познакомиться с основами машинного обучения.', 
 '', 
 '2025-06-01T00:00:00+00', 
 '2025-07-01T23:59:59+00', 
 3, 
 TRUE),

('b7d2e3f4-9c6f-4e7a-8d3f-4c6b5a7e9f1d', 
 'Цены на дома: Продвинутые методы регрессии', 
 'Предсказать цены продаж и попрактиковаться в продвинутых моделях регрессии.', 
 '', 
 '2025-07-15T00:00:00+00', 
 '2025-08-15T23:59:59+00', 
 6, 
 TRUE),

('c5e4f6a7-1b2c-4d3e-9f8a-5b6c7d8e9f0a', 
 'Распознавание цифр', 
 'Определить цифры на рукописных изображениях с помощью компьютерного зрения.', 
 '', 
 '2025-08-01T00:00:00+00', 
 '2025-09-01T23:59:59+00', 
 5, 
 TRUE),

('d9f8e7c6-b5a4-3d2c-1e0f-9a8b7c6d5e4f', 
 'Длительность поездок на такси в Нью-Йорке', 
 'Предсказать длительность поездок на такси в Нью-Йорке, используя временные ряды и геопространственные данные.', 
 '', 
 '2025-09-10T00:00:00+00', 
 '2025-10-10T23:59:59+00', 
 7, 
 FALSE);

 ('d92f8e7c6-b5a4-3d2c-1e0f-9a8b7c6d5e4f', 
 'Тестовое соревнование', 
 'Для новичков', 
 '', 
 '2023-02-10T00:00:00+00', 
 '2028-10-10T23:59:59+00', 
 1, 
 TRUE);
