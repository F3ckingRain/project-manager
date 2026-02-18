import type { TReduxValidation } from "Common/Models";
import { get } from "lodash";
import type { TReduxState } from "Store";

/** Селектор ошибок поля формы по ключу. */
export function validationErrorsSelector (fieldKey: string) {
    return ({ table: { projects: { form } } }: TReduxState): Optional<string[]> => {
        return get(form.validation, fieldKey)
    }
}

/** Селектор ошибок формы. */
export function projectsFormErrorsSelector ({ table: { projects } }: TReduxState): TReduxValidation {
    return projects.form.validation
}