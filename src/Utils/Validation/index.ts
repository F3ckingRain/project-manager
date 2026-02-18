import type { TErrors } from "Common/Models";
import { get, join, reduce, set } from "lodash";
import type { ZodType } from "zod";

/** 
 * Функция валидации значения схемой Zod.
 * 
 * @param schema Zod-схема.
 * @param value Значение поля.
 */
export function validateZodSchema (schema: ZodType, value: unknown): Optional<TErrors> {
    const res = schema.safeParse(value);

    if (!res.success) {
        return reduce(res.error.issues, (result: TErrors, { path, message }) => {
            const fieldPath = join(path, '.');
            const fieldMessages: Optional<string[]> = get(result, fieldPath);

            set(result, fieldPath, [...fieldMessages || [], message]);

            return result
        }, {})
    } 
}