/** Интерфейс экшенов элемента таблицы. */
export interface ITableActions {
    /** Обработчик изменения элемента. */
    onEdit: (rowId: string) => () => void;
    /** Обработчик удаления элемента. */
    onRemove: (rowId: string) => () => void;
}