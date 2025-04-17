import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVidrariaSpec1729617955207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vidrariaSpec',
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'quantity',
            type: 'INTERGER',
          },
          {
            name: 'quantityBuy',
            type: 'INTERGER',
          },
          {
            name: 'price',
            type: 'INTERGER',
          },
          {
            name: 'dateBuy',
            type: 'date',
          },
          {
            name: 'nf',
            type: 'string',
          },
          {
            name: 'supplier',
            type: 'string',
          },
          {
            name: 'vidrariaId',
            type: 'INTERGER',
          },
          {
            name: 'userName',
            type: 'INTERGER',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vidrariaSpec');
  }
}
