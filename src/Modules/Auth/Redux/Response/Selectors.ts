import type { TReduxState } from "Store";

/** Селектор флага авторизации. */
export function isAuthSelector ({ auth }: TReduxState): boolean {
    return !!auth.state?.isAuth
}