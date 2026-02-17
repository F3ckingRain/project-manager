import type { ITableFilter } from "Common/Models";
import type { IProject } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор фильтров таблицы проектов. */
export function projectsFiltersSelector ({ table: { projects } }: TReduxState): ITableFilter<IProject> {
    return projects.filters
} 