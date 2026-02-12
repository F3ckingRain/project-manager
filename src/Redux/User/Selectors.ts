import type { TReduxState } from "Store";
import type { IUserReduxState } from "./Reducer";

/** Селектор флага авторизации. */
export function isAuthSelector ({ user }: TReduxState): boolean {
    return user.isAuth
}

/** Селектор данных пользователя. */
export function userInfoSelector ({ user }: TReduxState): Partial<IUserReduxState> {
    return user
}