import type { EFormType } from "./Form/Enums";

/** Интерфейс формы авторизации. */
export interface IAuthForm {
    /** Логин. */
    login: string;
    /** Пароль. */
    password: string;
    /** Тип формы авторизации. */
    formType: EFormType;
    /** Флаг сохранения сессии. */
    keepSession?: boolean;
}