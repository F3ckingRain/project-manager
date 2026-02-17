/** Тип списка фильтов. */
export type TFilters<T extends object> = Partial<Record<keyof T, string>>