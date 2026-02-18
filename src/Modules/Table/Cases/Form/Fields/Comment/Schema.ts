import z from 'zod';

/** Схема валидации поля "Комментарий". */
export const commentSchema = z.string().nonempty();