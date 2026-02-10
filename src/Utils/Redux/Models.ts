/** Интерфейс экшена для изменения поля. */
export interface IChangeAction<T extends object> {
    key: keyof T;
    value: T[keyof T]
}