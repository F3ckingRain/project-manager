import z from 'zod'

/** Схема валидации поля "Пароль." */
export const passwordSchema = z.string().nonempty();