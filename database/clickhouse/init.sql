CREATE DATABASE IF NOT EXISTS decatoch;

-- хранение персональных рекомендаций, проблемных заданий, 
    -- анализ сложности заданий по среднему времени решения
CREATE TABLE task_analytic (
    user_id UUID,
    task_id UUID,
    attempts UInt32,
    success_time DateTime,
    duration_sec Int32,
    selected_options Array(UUID)
) ENGINE = MergeTree()
ORDER BY (task_id, user_id);

-- хранения метрик курсов (количество просмотров, 
    -- средняя оценка, количество завершений и другие показатели эффективности курсов)
CREATE TABLE course_metrics (
    course_id UUID,
    metric_name VARCHAR(50),
    metric_value FLOAT,
    updated_at TIMESTAMPT DEFAULT NOW()
) ENGINE = MergeTree()
ORDER BY (course_id, metric_name);

-- хранение информации о предпочтениях пользователей язык интерфейса, 
    -- формат уведомлений или другие настройки
CREATE TABLE user_preference (
    user_id UUID,
    preference_name VARCHAR(50),
    preference_value VARCHAR(100),
    updated_at TIMESTAMPT DEFAULT NOW()
) ENGINE = MergeTree()
ORDER BY (user_id, preference_name);
