import type { IProject } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор списка проектов. */
export function projectsSelector ({ table }: TReduxState): IProject[] {
    return table.projects.state
}