import z from 'zod';

/** Схема валидации поля "Название проекта". */
export const projectNameSchema = z.string().nonempty();