import type { ITableFilter } from "Common/Models";
import type { ITestCase } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор фильтров таблицы тест-кейсов. */
export function casesFiltersSelector ({ table: { cases } }: TReduxState): ITableFilter<ITestCase> {
    return cases.filters
} 