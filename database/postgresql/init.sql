CREATE DATABASE IF NOT EXISTS decatopg;

-- хранение информации о пользователе
CREATE TABLE user (
    id UUID PRIMARY KEY,
    email CITEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение информации о категории курса
CREATE TABLE course_category (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id UUID REFERENCES course_category(id)
);

-- хранение информации о курсе
CREATE TABLE course (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty_level SMALLINT CHECK (difficulty_level BETWEEN 1 AND 5),
    category_id UUID NOT NULL REFERENCES course_category(id),
    sort_order SMALLINT
);

-- хранение информации о главе курса
CREATE TABLE chapter (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order SMALLINT NOT NULL,
    description TEXT
);

-- хранение информации о типе задания
CREATE TYPE task_type AS ENUM ('theory', 'practice', 'quiz');

-- хранение информации о задании
CREATE TABLE task (
    id UUID PRIMARY KEY,
    chapter_id UUID NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
    type task_type NOT NULL,
    content JSONB NOT NULL, -- {text, image_url, code_template}
    sort_order SMALLINT NOT NULL
);

-- хранение информации о варианте ответа для задания
CREATE TABLE task_option (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL REFERENCES task(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

-- хранение информации о прогрессе пользователя
CREATE TABLE user_progress (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES user(id),
    task_id UUID NOT NULL REFERENCES task(id),
    status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completed_at TIMESTAMPTZ
);

-- хранение информации о комментарии курса
CREATE TABLE course_comment (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user(id),
    parent_comment_id UUID REFERENCES course_comment(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- хранение информации о решенной задаче
CREATE TABLE submission (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL REFERENCES task(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES user(id),
    code TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение информации о достижении
CREATE TABLE achievement (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- хранение информации о достижении пользователя
CREATE TABLE user_achievement (
    user_id UUID REFERENCES user(id),
    achievement_id UUID REFERENCES achievement(id),
    achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение информации о новости
CREATE TABLE news (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- хранение информации о соревновании
CREATE TABLE competition (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    dataset_url TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL
);

-- хранение информации о рейтинге соревнования
CREATE TABLE competition_rating (
    id UUID PRIMARY KEY,
    competition_id UUID NOT NULL REFERENCES competition(id),
    user_id UUID NOT NULL REFERENCES user(id),
    rating SMALLINT,
    rank SMALLINT
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-- ALTER TABLE course ADD COLUMN 
--     category_id UUID NOT NULL REFERENCES course_category(id);

-- ALTER TABLE course ADD COLUMN 
--     sort_order SMALLINT;

ALTER TABLE submission ADD CONSTRAINT fk_task 
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE;

-- Индексы для быстрого доступа
CREATE UNIQUE INDEX idx_user_progress ON user_progress(user_id, task_id);
CREATE UNIQUE INDEX idx_competition_rating ON competition_rating(competition_id, user_id);
CREATE INDEX idx_comments_course ON course_comments(course_id);
CREATE INDEX idx_comments_user ON course_comments(user_id);
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_course_category ON course(category_id);
CREATE INDEX idx_chapter_course ON chapter(course_id);
CREATE INDEX idx_task_chapter ON task(chapter_id);
CREATE INDEX idx_task_option_task ON task_option(task_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_task ON user_progress(task_id);
