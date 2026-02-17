import { useEffect, useState } from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../Spinner';
import { ESpinnerType } from '../Spinner/Enums';
import styles from './Styles.module.scss'
import type { ITableActions } from './Models';
import { isUndefined } from 'lodash';
import { Edit2Icon, DeleteIcon } from 'lucide-react'
import cx from 'classnames'

interface IProps<TData, TValue> {
    /** Колонки таблицы. */
    columns: ColumnDef<TData, TValue>[];
    /** Данные таблицы. */
    data: TData[];
    /** Обработчик сортировки таблицы. */
    onSort?: (newSort: SortingState) => void;
    /** Флаг загрузки таблицы. */
    isLoading?: boolean;
    /** Дейтсвия с элементов таблицы. */
    actions?: ITableActions;
}

/** Компонент для отображения данных в виде таблицы. */
export function DataTable<TData, TValue>({ columns, data, onSort, isLoading, actions }: IProps<TData, TValue>): React.JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { t } = useTranslation();

  // Актуализация данных сортировки.
  useEffect(() => {
    onSort?.(sorting)
  }, [sorting, onSort])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    defaultColumn: {
      maxSize: 250
    }
  });

  return isLoading ? <Spinner type={ESpinnerType.WIDGET} /> : (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.cell + " px-6 py-4 font-semibold"}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}

              {isUndefined(actions) ? null : (
                <th key={'actions'} className={cx(styles.cell, styles.cell__actions, 'px-6 py-4 font-semibold')}>
                    {t('Table.Labels.Actions')}
                </th>
              )}
            </tr>
          ))}
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td style={{ maxWidth: cell.column.getSize() }} key={cell.id} className={styles.cell + ' px-12 py-8'}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}

                {isUndefined(actions) ? null : (
                  <td key={'actions'} className={cx(styles.cell, 'px-12 py-8')}>
                      <div className={styles.actionButtons}>
                        <button className={styles.actionButtons__button} onClick={actions.onEdit(row.id)}>
                        <Edit2Icon />
                      </button>

                      <button className={styles.actionButtons__button} onClick={actions.onRemove(row.id)}> 
                        <DeleteIcon />
                      </button>
                      </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                  {t('Table.Labels.noData')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
