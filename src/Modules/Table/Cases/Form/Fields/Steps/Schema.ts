import z from 'zod';

/** Схема валидации поля "Шаги". */
export const stepsSchema = z.array(z.string()).nonempty();