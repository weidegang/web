drop table if exists SYS_ROLE;

drop table if exists SYS_ROLE_RIGHT;

drop table if exists SYS_USER;

drop table if exists SYS_USER_ROLE;

create table SYS_ROLE
(
   ID                   varchar(40) not null,
   ROLE_CODE            varchar(40),
   ROLE_NAME            varchar(40),
   primary key (ID)
);

create table SYS_ROLE_RIGHT
(
   ID                   varchar(40) not null,
   ROLE_CODE            varchar(40),
   RIGHT_CODE           varchar(40),
   RIGHT_NAME           varchar(40),
   primary key (ID)
);

create table SYS_USER
(
   ID                   varchar(40) not null,
   LOGIN_CODE           varchar(40),
   LOGIN_NAME           varchar(40),
   primary key (ID)
);

create table SYS_USER_ROLE
(
   ID                   varchar(40),
   LOGIN_CODE           varchar(40),
   ROLE_CODE            varchar(40)
);

