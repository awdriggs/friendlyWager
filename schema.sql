DROP TABLE IF EXISTS topics CASCADE;
DROP TABLE IF EXISTS wagers;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS tags_topics;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
	first VARCHAR(255),
	last VARCHAR(255),
	password VARCHAR(255),
	img_url TEXT,
	points INTEGER DEFAULT(0) NOT NULL
);

CREATE TABLE tags (
	id SERIAL PRIMARY KEY,
	keyword VARCHAR(25)
);

CREATE TABLE topics (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	description TEXT,
	creation_date TIMESTAMP without time zone DEFAULT now() NOT NULL,
	active BOOLEAN DEFAULT true,
	complete_date TIMESTAMP without time zone,
	winner_id INTEGER references users,
	owner_id INTEGER references users,
	geo_id VARCHAR(255),
	city VARCHAR(255),
	region VARCHAR(255),
	country VARCHAR(255)
);

CREATE TABLE wagers (
	id SERIAL PRIMARY KEY,
	topic_id INTEGER references topics,
	user_id INTEGER references users,
	creation_date TIMESTAMP without time zone DEFAULT now() NOT NULL,
	wager TIMESTAMP NOT NULL,
	geo_id VARCHAR(255),
	city VARCHAR(255),
	region VARCHAR(255),
	country VARCHAR(255)
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	topic_id INTEGER references topics,
	user_id INTEGER references users,
	creation_date TIMESTAMP without time zone DEFAULT now() NOT NULL,
	geo_id VARCHAR(255),
	city VARCHAR(255),
	region VARCHAR(255),
	country VARCHAR(255),
	comment TEXT
);

CREATE TABLE tags_topics (
	tag_id INTEGER references tags,
	topic_id INTEGER references topics
);


