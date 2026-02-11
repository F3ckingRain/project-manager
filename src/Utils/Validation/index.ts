import { map } from "lodash";
import type { ZodType } from "zod";

/** 
 * Функция валидации значения схемой Zod.
 * 
 * @param schema Zod-схема.
 * @param value Значение поля.
 */
export function validateZodSchema (schema: ZodType, value: unknown): Optional<string[]> {
    const res = schema.safeParse(value)

    if (!res.success) {
        return map(res.error.issues, ({ message }) => message)
    } 
}