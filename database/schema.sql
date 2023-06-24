set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Events" (
	"eventId" serial NOT NULL,
	"userId" integer NOT NULL,
	"eventName" TEXT NOT NULL,
  "eventSlug" TEXT,
	"diningId" integer,
	"attractionId" integer,
	"startTime" TIME NOT NULL,
	"date" timestamptz(6) NOT NULL,
	CONSTRAINT "Events_pk" PRIMARY KEY ("eventId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Dining" (
	"diningId" serial NOT NULL,
	"diningName" TEXT NOT NULL,
	CONSTRAINT "Dining_pk" PRIMARY KEY ("diningId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Attractions" (
	"attractionId" serial NOT NULL,
	"attractionName" TEXT NOT NULL,
	CONSTRAINT "Attractions_pk" PRIMARY KEY ("attractionId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Events" ADD CONSTRAINT "Events_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Events" ADD CONSTRAINT "Events_fk1" FOREIGN KEY ("diningId") REFERENCES "Dining"("diningId");
ALTER TABLE "Events" ADD CONSTRAINT "Events_fk2" FOREIGN KEY ("attractionId") REFERENCES "Attractions"("attractionId");
