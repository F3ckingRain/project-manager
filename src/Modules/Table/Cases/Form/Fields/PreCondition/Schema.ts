import z from 'zod';

/** Схема валидации поля "Предусловие". */
export const preConditionSchema = z.string().nonempty();