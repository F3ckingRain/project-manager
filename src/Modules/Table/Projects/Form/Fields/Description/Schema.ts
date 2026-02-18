import z from 'zod';

/** Схема валидации поля "Описание". */
export const descriptionSchema = z.string().nonempty();