import { createPool, Pool, RowDataPacket } from 'mysql2/promise';
import { IDatabaseConnection } from './IDatabaseConnection';
import { dbConfig } from './dbConfig';

class DatabaseConnection implements IDatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = createPool(dbConfig);
    console.log('Connection pool created');
  }

  async query<T = any>(sql: string, values?: any[]): Promise<T> {
    const [result] = await this.pool.query<RowDataPacket[]>(sql, values);
    return (result as unknown) as T;
  }
}

export default DatabaseConnection;