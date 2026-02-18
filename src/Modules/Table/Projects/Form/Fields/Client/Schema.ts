import z from 'zod';

/** Схема валидации поля "Заказчик". */
export const clientSchema = z.string().nonempty();