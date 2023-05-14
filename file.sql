CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    sid VARCHAR NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL,
    CONSTRAINT sessions_pkey PRIMARY KEY (sid)
);

CREATE TABLE IF NOT EXISTS cheanls (
    cheanl_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    isVerify BOOLEAN DEFAULT FALSE,
    isPrivate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    upadate_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages(
    message_id SERIAL PRIMARY KEY,
    message_text VARCHAR(200) NOT NULL,
    created_at TIMESTAMP,
    upadate_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags(
    tag_id SERIAL PRIMARY KEY,
    tag_data VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    upadate_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS filds(
    fild_id SERIAL PRIMARY KEY,
    fild_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    upadate_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users_cheanl (
    user_id INT NOT NULL REFERENCES users(user_id),
    cheanl_id INT REFERENCES cheanls(cheanl_id)
);

CREATE TABLE IF NOT EXISTS messages_cheanls (
    message_id INT REFERENCES messages(message_id),
    cheanl_id INT REFERENCES cheanls(cheanl_id)
);

CREATE TABLE IF NOT EXISTS messages_tags (
    message_id INT REFERENCES messages(message_id),
    tag_id INT REFERENCES tags(tag_id)
);

CREATE TABLE IF NOT EXISTS tags_filds(
    tag_id INT REFERENCES tags(tag_id),
    fild_id INT REFERENCES filds(fild_id)
);

CREATE TABLE IF NOT EXISTS user_filds(
    fild_id INT REFERENCES filds(fild_id),
    user_id INT REFERENCES users(user_id)
);