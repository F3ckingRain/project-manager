import { get } from "lodash";
import type { TReduxState } from "Store";

/** Селектор ошибок поля формы авторизации по ключу. */
export function validationErrorsSelector (fieldKey: string) {
    return ({ auth: { validation } }: TReduxState): Optional<string[]> => {
        return get(validation, fieldKey)
    }
}