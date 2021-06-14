CREATE TABLE "medecin" (
	"id" serial NOT NULL,
	"full_name" varchar(50) NOT NULL,
	"onco" BOOLEAN NOT NULL,
	"astr1" BOOLEAN NOT NULL,
	"astr2" BOOLEAN NOT NULL,
	"color" varchar(50) NOT NULL,
	CONSTRAINT "medecin_pk" PRIMARY KEY ("id")
	) WITH (
  OIDS=FALSE
);

INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('N.BENTALEB', true, true, true, '#003399');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('B.BILLEMONT', true, true, true, '#FF0000');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('R.BOUSTANY', true, true, true, '#FF7F00');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('T.CAILLEUX', true, true, true, '#FFFF05');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('C.CHEYRON', false, true, true, '#096A09');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('A.CHICOUENE', false, true, true, '#4B0082');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('L.CHRAIBI', false, true, true, '#C7CF00');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('A.CLEMENT', false, true, true, '#F5F5DC');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('P.DEBOURDEAU', false, true, true, '#BEF574');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('G.GRENIER', true, true, true, '#3A8EBA');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('W.HILGERSF', true, true, true, '#0095B6');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('S.KHOURI', false, true, true, '#F7230C');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('S.KIRCHER', true, true, true, '#DB0073');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('N.OUAGUED', false, true, true, '#FEA347');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('V.PELLICCIA', true, true, true, '#C4698F');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('JM.PIGNE', false, true, true, '#00FF00');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('F.PLAT', true, true, true, '#2C75FF');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('M.RAVOIRE', true, true, true, '#D90115');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('MJ.SCHAUER', false, true, true, '#FF007F');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('JF.ROSSI', true, true, true, '#FFFF6B');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('A.STANCU', true, true, true, '#F9429E');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('C.TOULLEC', true, true, true, '#FF0921');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('V.TRIOLER', false, true, true, '#F1E2BE');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('FR.VANEL', true, true, true, '#E67E30');
INSERT INTO medecin(full_name, onco, astr1, astr2, color) VALUES ('RECRUTEMENT', true, true, true, '#FFFFFF');

CREATE TABLE "planning" (
	"year" int NOT NULL,
	"month" varchar NOT NULL,
	"day" int NOT NULL,
	"fk_medecin_onco" int,
	"fk_medecin_astr1" int,
	"fk_medecin_astr2" int,
	"date_change" TIMESTAMP NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "planning" ADD CONSTRAINT "planning_fk0" FOREIGN KEY ("fk_medecin_onco") REFERENCES "medecin"("id");
ALTER TABLE "planning" ADD CONSTRAINT "planning_fk1" FOREIGN KEY ("fk_medecin_astr1") REFERENCES "medecin"("id");
ALTER TABLE "planning" ADD CONSTRAINT "planning_fk2" FOREIGN KEY ("fk_medecin_astr2") REFERENCES "medecin"("id");

