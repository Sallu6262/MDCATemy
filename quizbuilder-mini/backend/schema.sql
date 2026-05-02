-- =========================================================
-- QuizBuilder-Mini schema
-- Loaded automatically by the Postgres container on first
-- start (mounted into /docker-entrypoint-initdb.d/).
-- =========================================================

CREATE TYPE DIFFICULTY_TYPE AS ENUM ('EASY', 'MEDIUM', 'HARD');

CREATE TABLE subjects (
    subject_id   SERIAL PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE mcq_bank (
    mcq_id         SERIAL PRIMARY KEY,
    question       VARCHAR(500) NOT NULL,
    option_a       VARCHAR(200) NOT NULL,
    option_b       VARCHAR(200) NOT NULL,
    option_c       VARCHAR(200) NOT NULL,
    option_d       VARCHAR(200) NOT NULL,
    correct_option CHAR(1)      NOT NULL CHECK (correct_option IN ('A','B','C','D')),
    explanation    VARCHAR(500),
    difficulty     DIFFICULTY_TYPE NOT NULL,
    subject_id     INT NOT NULL,

    CONSTRAINT fkey_mcq_subject FOREIGN KEY (subject_id)
        REFERENCES subjects(subject_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE quizzes (
    quiz_id       SERIAL PRIMARY KEY,
    quiz_name     VARCHAR(50) NOT NULL,
    mcq_count     INT NOT NULL CHECK (mcq_count > 0),
    correct_count INT,
    attempt_date  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_subjects (
    quiz_id    INT NOT NULL,
    subject_id INT NOT NULL,

    CONSTRAINT pkey_quiz_subjects PRIMARY KEY (quiz_id, subject_id),
    CONSTRAINT fkey_qs_quiz    FOREIGN KEY (quiz_id)    REFERENCES quizzes(quiz_id)    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fkey_qs_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE attempted_mcqs (
    quiz_id         INT NOT NULL,
    mcq_id          INT NOT NULL,
    selected_option CHAR(1) NOT NULL CHECK (selected_option IN ('A','B','C','D')),

    CONSTRAINT pkey_attempted PRIMARY KEY (quiz_id, mcq_id),
    CONSTRAINT fkey_att_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)  ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fkey_att_mcq  FOREIGN KEY (mcq_id)  REFERENCES mcq_bank(mcq_id)  ON UPDATE CASCADE ON DELETE CASCADE
);
