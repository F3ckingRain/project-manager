import type { ZodType } from "zod";
import type { TFilters } from "./Components/Filters/Models";

/** Тип редакс-стейта валидации данных. */
export type TReduxValidation = Partial<Record<string, string[]>>;

/** Интерфейс экшена валдидации. */
export interface IValidateAction { 
    /** Схема валидации. */
    schema: ZodType;
    /** Ключ поля. */
    key: string;
    /** Значение поля. */
    value?: unknown
 };

 /** Интерфейс фильтров таблицы. */
 export interface ITableFilter <T extends object> {
    /** Фильтры. */
    filters?: TFilters<T>;
    /** Пагинация. */
    pagination?: number 
 }