import type { ITestRun } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор списка прогонов. */
export function testRunsSelector ({ table }: TReduxState): ITestRun[] {
    return table.testRuns.state
}