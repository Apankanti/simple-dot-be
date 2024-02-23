import { FindOptions, TableHints } from 'sequelize';

export interface FindOptionsWithTableHints<T> extends FindOptions<T> {
  tableHint: TableHints;
}
