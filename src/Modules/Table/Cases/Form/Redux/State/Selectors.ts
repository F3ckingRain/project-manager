import type { ITestCase } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор данных формы тест-кейса. */
export function casesFormSelector ({ table: { cases } }: TReduxState): Partial<ITestCase> {
    return cases.form
}