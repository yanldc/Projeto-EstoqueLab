import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserVidrariaReagent1731117559481 implements MigrationInterface {
    name = 'CreateUserVidrariaReagent1731117559481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "price" interger NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "vidrariaId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at" FROM "vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "vidrariaSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidrariaSpec" RENAME TO "vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "temporary_vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_vidraria"("id", "name", "userName", "created_at", "updated_at") SELECT "id", "name", "userName", "created_at", "updated_at" FROM "vidraria"`);
        await queryRunner.query(`DROP TABLE "vidraria"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidraria" RENAME TO "vidraria"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reagent"("id", "name", "userName", "created_at", "updated_at") SELECT "id", "name", "userName", "created_at", "updated_at" FROM "reagent"`);
        await queryRunner.query(`DROP TABLE "reagent"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagent" RENAME TO "reagent"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "lote" string NOT NULL, "price" interger NOT NULL, "validity" date NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "reagentId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at" FROM "reagentSpec"`);
        await queryRunner.query(`DROP TABLE "reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagentSpec" RENAME TO "reagentSpec"`);
        await queryRunner.query(`CREATE TABLE "temporary_vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "price" integer NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "vidrariaId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId" FROM "vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "vidrariaSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidrariaSpec" RENAME TO "vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "temporary_vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_vidraria"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "vidraria"`);
        await queryRunner.query(`DROP TABLE "vidraria"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidraria" RENAME TO "vidraria"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reagent"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "reagent"`);
        await queryRunner.query(`DROP TABLE "reagent"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagent" RENAME TO "reagent"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "lote" varchar NOT NULL, "price" integer NOT NULL, "validity" datetime NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "reagentId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId" FROM "reagentSpec"`);
        await queryRunner.query(`DROP TABLE "reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagentSpec" RENAME TO "reagentSpec"`);
        await queryRunner.query(`CREATE TABLE "temporary_vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "price" integer NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "vidrariaId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_84d9efa7a5a1fdb1b308624f95f" FOREIGN KEY ("vidrariaId") REFERENCES "vidraria" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c768690a731850e37cf10cf0cef" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId" FROM "vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "vidrariaSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidrariaSpec" RENAME TO "vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "temporary_vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_5e0e9bf9b91fb8c8627f4dad2a6" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_vidraria"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "vidraria"`);
        await queryRunner.query(`DROP TABLE "vidraria"`);
        await queryRunner.query(`ALTER TABLE "temporary_vidraria" RENAME TO "vidraria"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_c20fb8e2e0a42951a1f7d35bed2" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reagent"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "reagent"`);
        await queryRunner.query(`DROP TABLE "reagent"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagent" RENAME TO "reagent"`);
        await queryRunner.query(`CREATE TABLE "temporary_reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "lote" varchar NOT NULL, "price" integer NOT NULL, "validity" datetime NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "reagentId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_e74cb54e9872c5032c7118979e3" FOREIGN KEY ("reagentId") REFERENCES "reagent" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_be9bf4a44f041f63354516e79af" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId" FROM "reagentSpec"`);
        await queryRunner.query(`DROP TABLE "reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "temporary_reagentSpec" RENAME TO "reagentSpec"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reagentSpec" RENAME TO "temporary_reagentSpec"`);
        await queryRunner.query(`CREATE TABLE "reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "lote" varchar NOT NULL, "price" integer NOT NULL, "validity" datetime NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "reagentId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId" FROM "temporary_reagentSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "reagent" RENAME TO "temporary_reagent"`);
        await queryRunner.query(`CREATE TABLE "reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "reagent"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "temporary_reagent"`);
        await queryRunner.query(`DROP TABLE "temporary_reagent"`);
        await queryRunner.query(`ALTER TABLE "vidraria" RENAME TO "temporary_vidraria"`);
        await queryRunner.query(`CREATE TABLE "vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "vidraria"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "temporary_vidraria"`);
        await queryRunner.query(`DROP TABLE "temporary_vidraria"`);
        await queryRunner.query(`ALTER TABLE "vidrariaSpec" RENAME TO "temporary_vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" integer NOT NULL, "quantityBuy" integer NOT NULL, "price" integer NOT NULL, "dateBuy" datetime NOT NULL, "nf" varchar NOT NULL, "supplier" varchar NOT NULL, "vidrariaId" integer NOT NULL, "userName" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId" FROM "temporary_vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_vidrariaSpec"`);
        await queryRunner.query(`ALTER TABLE "reagentSpec" RENAME TO "temporary_reagentSpec"`);
        await queryRunner.query(`CREATE TABLE "reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "lote" string NOT NULL, "price" interger NOT NULL, "validity" date NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "reagentId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at", "userId" FROM "temporary_reagentSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "reagent" RENAME TO "temporary_reagent"`);
        await queryRunner.query(`CREATE TABLE "reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "reagent"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "temporary_reagent"`);
        await queryRunner.query(`DROP TABLE "temporary_reagent"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "created_at", "updated_at") SELECT "id", "name", "email", "password", "created_at", "updated_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "vidraria" RENAME TO "temporary_vidraria"`);
        await queryRunner.query(`CREATE TABLE "vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "vidraria"("id", "name", "userName", "created_at", "updated_at", "userId") SELECT "id", "name", "userName", "created_at", "updated_at", "userId" FROM "temporary_vidraria"`);
        await queryRunner.query(`DROP TABLE "temporary_vidraria"`);
        await queryRunner.query(`ALTER TABLE "vidrariaSpec" RENAME TO "temporary_vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "price" interger NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "vidrariaId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at", "userId" FROM "temporary_vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_vidrariaSpec"`);
        await queryRunner.query(`ALTER TABLE "reagentSpec" RENAME TO "temporary_reagentSpec"`);
        await queryRunner.query(`CREATE TABLE "reagentSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "lote" string NOT NULL, "price" interger NOT NULL, "validity" date NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "reagentId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "reagentSpec"("id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at") SELECT "id", "quantity", "quantityBuy", "lote", "price", "validity", "dateBuy", "nf", "supplier", "reagentId", "userName", "created_at", "updated_at" FROM "temporary_reagentSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_reagentSpec"`);
        await queryRunner.query(`ALTER TABLE "reagent" RENAME TO "temporary_reagent"`);
        await queryRunner.query(`CREATE TABLE "reagent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "reagent"("id", "name", "userName", "created_at", "updated_at") SELECT "id", "name", "userName", "created_at", "updated_at" FROM "temporary_reagent"`);
        await queryRunner.query(`DROP TABLE "temporary_reagent"`);
        await queryRunner.query(`ALTER TABLE "vidraria" RENAME TO "temporary_vidraria"`);
        await queryRunner.query(`CREATE TABLE "vidraria" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "vidraria"("id", "name", "userName", "created_at", "updated_at") SELECT "id", "name", "userName", "created_at", "updated_at" FROM "temporary_vidraria"`);
        await queryRunner.query(`DROP TABLE "temporary_vidraria"`);
        await queryRunner.query(`ALTER TABLE "vidrariaSpec" RENAME TO "temporary_vidrariaSpec"`);
        await queryRunner.query(`CREATE TABLE "vidrariaSpec" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "quantity" interger NOT NULL, "quantityBuy" interger NOT NULL, "price" interger NOT NULL, "dateBuy" date NOT NULL, "nf" string NOT NULL, "supplier" string NOT NULL, "vidrariaId" interger NOT NULL, "userName" interger NOT NULL, "created_at" timestamp with time zone NOT NULL DEFAULT (now()), "updated_at" timestamp with time zone NOT NULL DEFAULT (now()))`);
        await queryRunner.query(`INSERT INTO "vidrariaSpec"("id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at") SELECT "id", "quantity", "quantityBuy", "price", "dateBuy", "nf", "supplier", "vidrariaId", "userName", "created_at", "updated_at" FROM "temporary_vidrariaSpec"`);
        await queryRunner.query(`DROP TABLE "temporary_vidrariaSpec"`);
    }

}
