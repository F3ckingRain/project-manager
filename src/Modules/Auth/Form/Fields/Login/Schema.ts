import z from 'zod'

/** Схема валидации поля "Логин." */
export const loginSchema = z.string().nonempty();