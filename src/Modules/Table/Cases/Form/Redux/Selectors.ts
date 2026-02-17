import { get } from "lodash";
import type { ITestCase } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор данных формы тест-кейса. */
export function casesFormSelector ({ table: { cases } }: TReduxState): Partial<ITestCase> {
    return cases.form
}

/** Селектор значения поля формы по ключу. */
export function casesFieldSelector <T extends keyof ITestCase>(key: T) {
    return ({ table: { cases } }: TReduxState): Optional<ITestCase[T]> => {
        return get(cases.form, key)
    }
}