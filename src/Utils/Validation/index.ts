import type { ZodType } from "zod";

/** 
 * Функция валидации значения схемой Zod.
 * 
 * @param schema Zod-схема.
 * @param value Значение поля.
 */
export function validateZodSchema (schema: ZodType, value: unknown): Optional<string[]> {
    const res = schema.safeParse(value)
    console.log(res)

    if (!res.success) {
        console.log(res)
    } 

    return []
}