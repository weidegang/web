INSERT INTO SYS_USER VALUES(UUID(),'admin','����Ա');
INSERT INTO SYS_USER VALUES(UUID(),'weidg','κ�¸�');

INSERT INTO SYS_USER_ROLE VALUES(UUID(),'admin','manager');
INSERT INTO SYS_USER_ROLE VALUES(UUID(),'weidg','tester');

INSERT INTO SYS_ROLE VALUES(UUID(),'manager','����Ա');
INSERT INTO SYS_ROLE VALUES(UUID(),'tester','������Ա');

INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','search','��ѯ');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','add','����');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','edit','�༭');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'manager','delete','ɾ��');


INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'tester','search','��ѯ');
INSERT INTO SYS_ROLE_RIGHT VALUES(UUID(),'tester','edit','�༭');