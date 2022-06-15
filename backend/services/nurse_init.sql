DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS attendance_reports CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS member CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS diagnosis CASCADE;
DROP TABLE IF EXISTS diagnosis_reports CASCADE;
DROP TABLE IF EXISTS health_reports CASCADE;

DROP SEQUENCE IF EXISTS employees_id_seq;
DROP SEQUENCE IF EXISTS attendance_reports_id_seq;
DROP SEQUENCE IF EXISTS teams_id_seq;
DROP SEQUENCE IF EXISTS member_id_seq;
DROP SEQUENCE IF EXISTS clients_id_seq;
DROP SEQUENCE IF EXISTS patient_id_seq;
DROP SEQUENCE IF EXISTS diagnosis_id_seq;
DROP SEQUENCE IF EXISTS diagnosis_reports_id_seq;
DROP SEQUENCE IF EXISTS health_reports_id_seq;

CREATE SEQUENCE employees_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE employees (
    id bigint DEFAULT nextval('employees_id_seq'::regclass) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    img VARCHAR(100) NULL,
    role VARCHAR(30) NOT NULL,
    check(role in ('admin', 'nurse')),
    --emp_from timestamp DEFAULT CURRENT_TIMESTAMP::date NOT NULL,
    --emp_to timestamp
    phone VARCHAR(20) NOT NULL,
    contractf VARCHAR(10) NOT NULL, 
    contractt VARCHAR(10), 
    gdpr VARCHAR(3) NOT NULL, 
    check(gdpr in ('yes', 'no')),
    vaccine VARCHAR(3) NOT NULL, 
    check(vaccine in ('yes', 'no'))
);

INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('bakabaka', 'alic', 'baka', 'admin', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('patutu', 'pato', 'pato', 'admin', '0902123456', '2022-04-05', '', 'no', 'no');

INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('asdfasd', 'Zuzana', 'Kováčová', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('pasdasdskgjl', 'Natália', 'Červená', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('asdlkjlk', 'Pavol', 'Majeský', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('ljlkajsdasd', 'Beáta', 'Horváthová', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('adasdau', 'Lucia', 'Biela', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');
INSERT INTO employees(password, firstname, lastname, role, phone, contractf, contractt, vaccine, gdpr) VALUES ('pasdasdu', 'Lukáš', 'Bielik', 'nurse', '0902123456', '2022-04-05', '', 'no', 'no');

CREATE SEQUENCE attendance_reports_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE attendance_reports (
    id bigint DEFAULT nextval('attendance_reports_id_seq'::regclass) NOT NULL PRIMARY KEY,
    id_employee bigint NOT NULL,
    type VARCHAR(30) NOT NULL,
    check(type in ('prichod', 'odchod', 'nepritomnost')),
    reason VARCHAR(30) NOT NULL,
    check(reason in ('', 'obed', 'domov', 'pn', 'dovolenka')),
    approved VARCHAR (1) DEFAULT 'n' NOT NULL,
    check(approved in ('y', 'n')),
    datetime timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_empl_att_report
      FOREIGN KEY(id_employee) 
	  REFERENCES employees(id)
      ON DELETE CASCADE
    -- dorobit check na kombinaciu type a reason
);

INSERT INTO attendance_reports(id_employee, type, reason) VALUES ('1', 'prichod', '');
INSERT INTO attendance_reports(id_employee, type, reason) VALUES ('2', 'nepritomnost', 'dovolenka');

CREATE SEQUENCE teams_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE teams (
    id bigint DEFAULT nextval('teams_id_seq'::regclass) NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    team_from timestamp DEFAULT CURRENT_TIMESTAMP::date NOT NULL,
    team_to timestamp
); --uplne zmenit, mozno nebude vobec, ulozit hlavneho typka?

INSERT INTO teams(name) VALUES ('team1');

CREATE SEQUENCE member_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE member ( --treba id_member??
    id_employee bigint NOT NULL,
    id_team bigint NOT NULL,
    mem_from timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mem_to timestamp with time zone,
    CONSTRAINT fk_empl_memb_report
      FOREIGN KEY(id_employee) 
	  REFERENCES employees(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_team_memb_report
      FOREIGN KEY(id_team) 
	  REFERENCES teams(id)
      ON DELETE CASCADE
);

insert into member(id_employee, id_team) values (3,1);
insert into member(id_employee, id_team) values (4,1);
insert into member(id_employee, id_team) values (5,1);
insert into member(id_employee, id_team) values (6,1);

CREATE SEQUENCE clients_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE clients ( --rozdelit address?? rodne cislo???
    id bigint DEFAULT nextval('clients_id_seq'::regclass) NOT NULL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    img VARCHAR(100) NULL,
    address VARCHAR(200) NOT NULL,
    emp_from timestamp DEFAULT CURRENT_TIMESTAMP::date NOT NULL,
    emp_to timestamp
);

INSERT INTO clients(firstname, lastname, address) VALUES ('Yeasdasd', 'Beasdasdva', 'asdasdasd');
INSERT INTO clients(firstname, lastname, address) VALUES ('Clint', 'Haasdasdeye', 'asdasdBasdasdest');
INSERT INTO clients(firstname, lastname, address) VALUES ('Yeasdasd', 'Beasdasdva', 'asdasdasd');
INSERT INTO clients(firstname, lastname, address) VALUES ('Clint', 'Haasdasdeye', 'asdasdBasdasdest');
INSERT INTO clients(firstname, lastname, address) VALUES ('Yeasdasd', 'Beasdasdva', 'asdasdasd');
INSERT INTO clients(firstname, lastname, address) VALUES ('Clint', 'Haasdasdeye', 'asdasdBasdasdest');

CREATE SEQUENCE patient_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE patient ( --rozdelit address?? rodne cislo???
    id bigint DEFAULT nextval('patient_id_seq'::regclass) NOT NULL PRIMARY KEY,
    id_nurse bigint NOT NULL,
    id_client bigint NOT NULL,
    time_from time DEFAULT CURRENT_TIMESTAMP::time NOT NULL,
    time_to time DEFAULT CURRENT_TIMESTAMP::time NOT NULL,
    pat_date date NOT NULL,
    shift VARCHAR (1) DEFAULT 'd' NOT NULL,
    check(shift in ('d', 'n')),
    CONSTRAINT fk_nurse_patient
      FOREIGN KEY(id_nurse) 
	  REFERENCES employees(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_client_patient
      FOREIGN KEY(id_client) 
	  REFERENCES clients(id)
      ON DELETE CASCADE
);

insert into patient(id_nurse, id_client, pat_date, shift, time_from, time_to) VALUES (3, 1, '2022-03-03', 'd', '08:00:00.000000', '20:00:00');
insert into patient(id_nurse, id_client, pat_date, shift, time_from, time_to) VALUES (3, 1, '2022-03-03', 'd', '08:00:00.000000', '20:00:00.000000');
insert into patient(id_nurse, id_client, pat_date, shift, time_from, time_to) VALUES (4, 2, '2022-04-03', 'n', '08:00:00.000000', '20:00:00.000000');
insert into patient(id_nurse, id_client, pat_date, shift, time_from, time_to) VALUES (5, 3, '2022-03-03', 'd', '08:00:00.000000', '20:00:00.000000');
insert into patient(id_nurse, id_client, pat_date, shift, time_from, time_to) VALUES (6, 4, '2022-04-03', 'd', '08:00:00.000000', '20:00:00.000000');

CREATE SEQUENCE diagnosis_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE diagnosis (
    id bigint DEFAULT nextval('diagnosis_id_seq'::regclass) NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(300) NOT NULL,
    treatment VARCHAR(300) NOT NULL
);

INSERT INTO diagnosis(name, description, treatment) VALUES ('ostheoporosis', 'bones hurt', 'taking calcium');
--INSERT INTO diagnosis(name, description, treatment) VALUES ('lepra', 'your flesh is falling apart', 'there is none you die');

CREATE TABLE diagnosis_reports ( --priradenie diagnoz k ludom -- treba id?
    id_clients bigint NOT NULL,
    id_employee  bigint NOT NULL,
    id_diagnosis bigint NOT NULL,
    dr_from timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, -- WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF PREROBIT
    dr_to timestamp,
    CONSTRAINT fk_client_dg_report
      FOREIGN KEY(id_clients) 
	  REFERENCES clients(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_empl_dg_report
      FOREIGN KEY(id_employee) 
	  REFERENCES employees(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_diag_dg_report
      FOREIGN KEY(id_diagnosis) 
	  REFERENCES diagnosis(id)
      ON DELETE CASCADE
);

INSERT INTO diagnosis_reports(id_clients, id_employee, id_diagnosis) VALUES (1, 1, 1);
INSERT INTO diagnosis_reports(id_clients, id_employee, id_diagnosis) VALUES (2, 2, 1);

CREATE SEQUENCE health_reports_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE health_reports ( --zdravotne zapisy co sa s clovekom urobilo
    id bigint DEFAULT nextval('health_reports_id_seq'::regclass) NOT NULL PRIMARY KEY,
    id_clients bigint NOT NULL,
    id_employee  bigint NOT NULL,
    description  VARCHAR(300) NOT NULL,
    report_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT fk_client_health_report
      FOREIGN KEY(id_clients) 
	  REFERENCES clients(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_empl_health_report
      FOREIGN KEY(id_employee) 
	  REFERENCES employees(id)
      ON DELETE CASCADE
);

--INSERT INTO health_reports(id_clients, id_employee, description) VALUES (1, 1, 'patient died');
INSERT INTO health_reports(id_clients, id_employee, description) VALUES (1, 1, 'patient was resurrected');
INSERT INTO health_reports(id_clients, id_employee, description) VALUES (2, 2, 'patient took medication');
--INSERT INTO health_reports(id_clients, id_employee, description) VALUES (2, 2, 'patient was killed');

-- [{key: '1', firstname: 'Zuzana', lastname: 'Kovacova', arrival: '7:59:48', lunch_from: '12:00:01', lunch_to: '12:25:14', departure:  '16:03:00', holiday: false, sickleave: false},
--                         {key: '2', firstname: 'Natalia', lastname: 'Cervena', arrival: '7:50:32', lunch_from: '12:00:00', lunch_to:  '12:29:51', departure:  '16:01:00', holiday: false, sickleave: false},
--                         {key: '3', firstname: 'Pavol', lastname: 'Majesky', arrival: '7:59:59', lunch_from: '11:30:00', lunch_to:  '11:59:21', departure:  '15:59:59', holiday: false, sickleave: false},
--                         {key: '4', firstname: 'Beata', lastname: 'Horvatova', arrival: '7:58:40', lunch_from: '12:02:12', lunch_to:  '12:31:54', departure:  '16:12:03', holiday: false, sickleave: false},
--                         {key: '5', firstname: 'Lucia', lastname: 'Biela', arrival: '7:52:33', lunch_from: '12:03:06', lunch_to:  '12:32:01', departure:  '16:05:07', holiday: false, sickleave: false},
--                         {key: '6', firstname: 'Lukas', lastname: 'Bielik', arrival: '7:57:21', lunch_from: '11:58:56', lunch_to:  '12:27:35', departure:  '16:20:36', holiday: false, sickleave: false},
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('asdfasd', 'Zuzana', 'Kováčová', 'nurse', '2022-04-05', '', 'no', 'no');
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('pasdasdskgjl', 'Natália', 'Červená', 'nurse', '2022-04-05', '', 'no', 'no');
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('asdlkjlk', 'Pavol', 'Majeský', 'nurse', '2022-04-05', '', 'no', 'no');
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('ljlkajsdasd', 'Beáta', 'Horváthová', 'nurse', '2022-04-05', '', 'no', 'no');
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('adasdau', 'Lucia', 'Biela', 'nurse', '2022-04-05', '', 'no', 'no');
-- INSERT INTO employees(password, firstname, lastname, role, contractf, contractt, vaccine, gdpr) VALUES ('pasdasdu', 'Lukáš', 'Bielik', 'nurse', '2022-04-05', '', 'no', 'no');