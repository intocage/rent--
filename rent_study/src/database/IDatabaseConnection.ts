export interface IDatabaseConnection {
  query<T = any>(sql: string, values?: any[]): Promise<T>;
}