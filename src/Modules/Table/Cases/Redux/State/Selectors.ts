import type { ITestCase } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор списка тест-кейсов. */
export function casesSelector ({ table }: TReduxState): ITestCase[] {
    return table.cases.state
}