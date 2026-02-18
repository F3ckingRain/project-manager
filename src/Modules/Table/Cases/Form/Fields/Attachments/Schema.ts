import z from 'zod';

/** Схема валидации поля "Вложения". */
export const attachmentsSchema = z.array(z.string()).nonempty();