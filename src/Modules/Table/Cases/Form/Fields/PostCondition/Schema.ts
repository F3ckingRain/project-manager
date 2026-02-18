import z from 'zod';

/** Схема валидации поля "Постусловие". */
export const postConditionchema = z.string().nonempty();