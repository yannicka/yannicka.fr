create table message(
	id            bigint unsigned not null auto_increment, -- > 18446744073709551615
	date_message  integer,
	content       text,
	content_clean text,
	ip            varchar(128),
	vote_up       int unsigned default 0, -- > 4294967295
	vote_down     int unsigned default 0,

	constraint pk_message
		primary key(id)
);

create table date_news(
	id         bigint unsigned not null auto_increment,
	date_begin integer,
	date_end   integer,

	constraint pk_date
		primary key(id)
);

create table message_date(
	id_message bigint unsigned not null,
	id_date    bigint unsigned not null,

	constraint pk_message_date
		primary key(id_message, id_date),

	constraint fk_message_date_message
		foreign key(id_message)
		references message(id),

	constraint fk_message_date_date
		foreign key(id_date)
		references date_news(id)
);

create table hashtag(
	id      bigint unsigned not null auto_increment,
	content text,

	constraint pk_hashtag
		primary key(id)
);

create table message_hashtag(
	id_message bigint unsigned not null,
	id_hashtag bigint unsigned not null,

	constraint pk_message_hashtag
		primary key(id_message, id_hashtag),

	constraint fk_message_hashtag_message
		foreign key(id_message)
		references message(id),

	constraint fk_message_hashtag_hashtag
		foreign key(id_hashtag)
		references hashtag(id)
);

create table vote(
	ip         varchar(128) not null,
	id_message bigint unsigned not null,
	value      tinyint,

	constraint pk_vote
		primary key(ip, id_message),

	constraint fk_message_vote
		foreign key(id_message)
		references message(id)
);
