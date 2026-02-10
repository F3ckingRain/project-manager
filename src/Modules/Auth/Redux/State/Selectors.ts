import { get } from "lodash";
import type { IAuthForm } from "Modules/Auth/Models";
import type { TReduxState } from "Store";

/** Селектор значения поля формы авторизации по ключу. */
export function authStateSelector <T extends keyof IAuthForm>(formKey: T) {
    return ({ auth }: TReduxState): Optional<IAuthForm[T]> => {
        return get(auth.state, formKey)
    }
}

/** Селектор данных формы авторизации. */
export function authFormStateSelector ({ auth }: TReduxState): Partial<IAuthForm> {
    return auth.state
}