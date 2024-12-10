create table livenews_message(
	id        bigint not null auto_increment,
	date_news integer(10),
	content   text,

	constraint pk_livenews_message
		primary key(id)
);

create table livenews_date_news(
	id         bigint not null auto_increment,
	date_begin integer(10),
	date_end   integer(10),

	constraint pk_livenews_date
		primary key(id)
);

create table livenews_message_date(
	id_message bigint not null,
	id_date    bigint not null,

	constraint pk_livenews_message_date
		primary key(id_message, id_date),

	constraint fk_livenews_message_date_message
		foreign key(id_message)
		references livenews_message(id),

	constraint fk_livenews_message_date_date
		foreign key(id_date)
		references livenews_date_news(id)
);

create table livenews_hashtag(
	id      bigint not null auto_increment,
	content text,

	constraint pk_livenews_hashtag
		primary key(id)
);

create table livenews_message_hashtag(
	id_message bigint not null,
	id_hashtag bigint not null,

	constraint pk_livenews_message_hashtag
		primary key(id_message, id_hashtag),

	constraint fk_livenews_message_hashtag_message
		foreign key(id_message)
		references livenews_message(id),

	constraint fk_livenews_message_hashtag_hashtag
		foreign key(id_hashtag)
		references livenews_hashtag(id)
);
