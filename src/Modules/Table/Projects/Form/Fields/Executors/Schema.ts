import z from 'zod';

/** Схема валидации поля "Исполнители". */
export const executorsSchema = z.array(z.string()).nonempty();