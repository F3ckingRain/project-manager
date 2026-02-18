import z from 'zod';

/** Схема валидации поля "Ожидаемый результат". */
export const expectionSchema = z.string().nonempty();