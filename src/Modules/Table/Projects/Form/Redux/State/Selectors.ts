import type { IProject } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор данных формы проекта. */
export function projectFormSelector ({ table: { projects } }: TReduxState): Partial<IProject> {
    return projects.form
}