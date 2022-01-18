DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS attendance_reports CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS member CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS diagnosis CASCADE;
DROP TABLE IF EXISTS diagnosis_reports CASCADE;
DROP TABLE IF EXISTS health_reports CASCADE;

DROP SEQUENCE IF EXISTS employees_id_seq;
DROP SEQUENCE IF EXISTS attendance_reports_id_seq;
DROP SEQUENCE IF EXISTS teams_id_seq;
DROP SEQUENCE IF EXISTS member_id_seq;
DROP SEQUENCE IF EXISTS clients_id_seq;
DROP SEQUENCE IF EXISTS diagnosis_id_seq;
DROP SEQUENCE IF EXISTS diagnosis_reports_id_seq;
DROP SEQUENCE IF EXISTS health_reports_id_seq;

CREATE SEQUENCE employees_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE employees (
    id bigint DEFAULT nextval('employees_id_seq'::regclass) NOT NULL PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    check(role in ('admin', 'manager', 'administrative worker', 'main nurse', 'nurse')),
    emp_from timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    emp_to timestamp with time zone
);

INSERT INTO employees(password, firstname, lastname, role) VALUES ('bakabaka', 'alic', 'baka', 'admin');
INSERT INTO employees(password, firstname, lastname, role) VALUES ('patutu', 'pato', 'pato', 'admin');

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
    datetime timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
    team_from timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    team_to timestamp with time zone
); --uplne zmenit, mozno nebude vobec, ulozit hlavneho typka?

INSERT INTO teams(name) VALUES ('team1');

CREATE SEQUENCE member_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE member ( --treba id_member??
    id_employee bigint NOT NULL,
    id_team bigint NOT NULL,
    emp_from timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    emp_to timestamp with time zone,
    CONSTRAINT fk_empl_memb_report
      FOREIGN KEY(id_employee) 
	  REFERENCES employees(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_team_memb_report
      FOREIGN KEY(id_team) 
	  REFERENCES teams(id)
      ON DELETE CASCADE
);

INSERT INTO member(id_employee, id_team) VALUES (1, 1);
INSERT INTO member(id_employee, id_team) VALUES (2, 1);

CREATE SEQUENCE clients_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE clients ( --rozdelit address?? rodne cislo???
    id bigint DEFAULT nextval('clients_id_seq'::regclass) NOT NULL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    address VARCHAR(200) NOT NULL,
    emp_from timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    emp_to timestamp with time zone
);

INSERT INTO clients(firstname, lastname, address) VALUES ('Yelena', 'Belova', 'Mother Russia');
INSERT INTO clients(firstname, lastname, address) VALUES ('Clint', 'Hawkeye', 'Grand Hotel Budapest');

CREATE SEQUENCE diagnosis_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE diagnosis (
    id bigint DEFAULT nextval('diagnosis_id_seq'::regclass) NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(300) NOT NULL,
    treatment VARCHAR(300) NOT NULL
);

INSERT INTO diagnosis(name, description, treatment) VALUES ('ostheoporosis', 'bones hurt', 'taking calcium');
INSERT INTO diagnosis(name, description, treatment) VALUES ('lepra', 'your flesh is falling apart', 'there is none you die');

CREATE TABLE diagnosis_reports ( --priradenie diagnoz k ludom -- treba id?
    id_clients bigint NOT NULL,
    id_employee  bigint NOT NULL,
    id_diagnosis bigint NOT NULL,
    emp_from timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    emp_to timestamp with time zone,
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
INSERT INTO diagnosis_reports(id_clients, id_employee, id_diagnosis) VALUES (2, 2, 2);

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

INSERT INTO health_reports(id_clients, id_employee, description) VALUES (1, 1, 'patient died');
INSERT INTO health_reports(id_clients, id_employee, description) VALUES (1, 1, 'patient was resurrected');
INSERT INTO health_reports(id_clients, id_employee, description) VALUES (2, 2, 'patient took medication');
INSERT INTO health_reports(id_clients, id_employee, description) VALUES (2, 2, 'patient was killed');