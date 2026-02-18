import type { TReduxValidation } from "Common/Models";
import { get } from "lodash";
import type { TReduxState } from "Store";

/** Селектор ошибок поля формы по ключу. */
export function validationErrorsSelector (fieldKey: string) {
    return ({ table: { cases: { form } } }: TReduxState): Optional<string[]> => {
        return get(form.validation, fieldKey)
    }
}

/** Селектор ошибок формы. */
export function casesFormErrorsSelector ({ table: { cases } }: TReduxState): TReduxValidation {
    return cases.form.validation
}