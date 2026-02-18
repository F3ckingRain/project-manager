import z from 'zod';

/** Схема валидации поля "Документы". */
export const documentsSchema = z.string().nonempty();