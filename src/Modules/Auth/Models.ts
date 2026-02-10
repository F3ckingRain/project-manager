/** Интерфейс формы авторизации. */
export interface IAuthForm {
    /** Логин. */
    login: string;
    /** Пароль. */
    password: string;
    /** Флаг авторизации. */
    isAuth: boolean;
    /** Тип авторизации. */
    authType: "signIn" | 'signUp';
    /** Флаг сохранения сессии. */
    keepSession?: boolean;
}