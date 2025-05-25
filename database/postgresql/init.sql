CREATE SCHEMA IF NOT EXISTS decatopg;
SET search_path TO decatopg;

-- хранение информации о пользователе
CREATE TABLE IF NOT EXISTS trainee (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_adult BOOLEAN NOT NULL,
    gender VARCHAR(10) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение роли пользователя
CREATE TABLE IF NOT EXISTS trainee_role (
    trainee_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL,
    CONSTRAINT fk_trainee_role_trainee FOREIGN KEY (trainee_id) REFERENCES trainee(id) ON DELETE CASCADE,
    CONSTRAINT pk_trainee_role PRIMARY KEY (trainee_id, role)
);

-- хранение информации о категории курса
CREATE TABLE IF NOT EXISTS course_category (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id UUID REFERENCES course_category(id)
);

-- хранение информации о курсе
CREATE TABLE IF NOT EXISTS course (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty_level SMALLINT CHECK (difficulty_level BETWEEN 1 AND 5),
    category_id UUID NOT NULL REFERENCES course_category(id),
    sort_order SMALLINT
);

-- хранение информации о главе курса
CREATE TABLE IF NOT EXISTS chapter (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sort_order SMALLINT NOT NULL,
    description TEXT
);

-- хранение информации о типе задания
CREATE TYPE task_type AS ENUM ('theory', 'practice', 'quiz');

-- хранение информации о задании
CREATE TABLE IF NOT EXISTS task (
    id UUID PRIMARY KEY,
    chapter_id UUID NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
    type task_type NOT NULL,
    content JSONB NOT NULL, -- {text, image_url, code_template}
    sort_order SMALLINT NOT NULL
);

-- хранение информации о варианте ответа для задания
CREATE TABLE IF NOT EXISTS task_option (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL REFERENCES task(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

-- хранение информации о прогрессе пользователя
CREATE TABLE IF NOT EXISTS trainee_progress (
    id UUID PRIMARY KEY,
    trainee_id UUID NOT NULL REFERENCES trainee(id),
    task_id UUID NOT NULL REFERENCES task(id),
    status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completed_at TIMESTAMPTZ
);

-- хранение информации о комментарии курса
CREATE TABLE IF NOT EXISTS course_comment (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL REFERENCES course(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES trainee(id),
    parent_comment_id UUID REFERENCES course_comment(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- хранение информации о решенной задаче
CREATE TABLE IF NOT EXISTS submission (
    id UUID PRIMARY KEY,
    task_id UUID NOT NULL REFERENCES task(id) ON DELETE CASCADE,
    trainee_id UUID NOT NULL REFERENCES trainee(id),
    code TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение информации о достижении
CREATE TABLE IF NOT EXISTS achievement (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- хранение информации о достижении пользователя
CREATE TABLE IF NOT EXISTS trainee_achievement (
    trainee_id UUID REFERENCES trainee(id),
    achievement_id UUID REFERENCES achievement(id),
    achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- хранение информации о новости
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW()
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- хранение информации о соревновании
CREATE TABLE IF NOT EXISTS competition (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    dataset_url TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL
);

-- хранение информации о рейтинге соревнования
CREATE TABLE IF NOT EXISTS competition_rating (
    id UUID PRIMARY KEY,
    competition_id UUID NOT NULL REFERENCES competition(id),
    trainee_id UUID NOT NULL REFERENCES trainee(id),
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
CREATE UNIQUE INDEX idx_trainee_progress ON trainee_progress(trainee_id, task_id);
CREATE UNIQUE INDEX idx_competition_rating ON competition_rating(competition_id, trainee_id);
CREATE INDEX idx_comments_course ON course_comment(course_id);
CREATE INDEX idx_comments_trainee ON course_comment(trainee_id);
CREATE INDEX idx_trainee_email ON trainee(email);
CREATE INDEX idx_course_category ON course(category_id);
CREATE INDEX idx_chapter_course ON chapter(course_id);
CREATE INDEX idx_task_chapter ON task(chapter_id);
CREATE INDEX idx_task_option_task ON task_option(task_id);
CREATE INDEX idx_trainee_progress_trainee ON trainee_progress(trainee_id);
CREATE INDEX idx_trainee_progress_task ON trainee_progress(task_id);
