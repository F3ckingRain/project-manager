import type { TReduxValidation } from "Common/Models";
import { get } from "lodash";
import type { TReduxState } from "Store";

/** Селектор ошибок поля формы авторизации по ключу. */
export function validationErrorsSelector (fieldKey: string) {
    return ({ auth: { validation } }: TReduxState): Optional<string[]> => {
        return get(validation, fieldKey)
    }
}

/** Селектор ошибок формы авторизации. */
export function authFormErrorsSelector ({ auth }: TReduxState): TReduxValidation {
    return auth.validation
}