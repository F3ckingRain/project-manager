import z from 'zod';

/** Схема валидации поля "Название". */
export const titleSchema = z.string().nonempty();