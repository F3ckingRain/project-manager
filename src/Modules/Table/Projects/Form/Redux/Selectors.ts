import { get } from "lodash";
import type { IProject } from "Modules/Table/Models";
import type { TReduxState } from "Store";

/** Селектор данных формы проекта. */
export function projectFormSelector ({ table: { projects } }: TReduxState): Partial<IProject> {
    return projects.form
}

/** Селектор значения поля формы по ключу. */
export function projectFieldSelector <T extends keyof IProject>(key: T) {
    return ({ table: { projects } }: TReduxState): Optional<IProject[T]> => {
        return get(projects.form, key)
    }
}