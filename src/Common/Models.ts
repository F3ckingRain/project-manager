import type { ZodType } from "zod";

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
 }