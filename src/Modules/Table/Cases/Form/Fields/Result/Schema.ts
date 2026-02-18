import z from 'zod';

/** Схема валидации поля "Фактический результат". */
export const resultSchema = z.string().nonempty();