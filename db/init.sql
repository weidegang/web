INSERT INTO SYS_USER VALUES(UUID(),'admin','管理员');
INSERT INTO SYS_USER VALUES(UUID(),'weidg','魏德刚');

INSERT INTO SYS_USER_ROLE VALUES(UUID(),'admin','manager');
INSERT INTO SYS_USER_ROLE VALUES(UUID(),'weidg','tester');

INSERT INTO SYS_ROLE VALUES(UUID(),'manager','管理员');
INSERT INTO SYS_ROLE VALUES(UUID(),'tester','测试人员');

INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','search','查询');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','add','新增');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','edit','编辑');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','delete','删除');


INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'tester','search','查询');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'tester','edit','编辑');