import type { TReduxState } from "Store";

/** Селектор флага авторизации. */
export function isAuthSelector ({ settings }: TReduxState): boolean {
    return settings.isAuth
}