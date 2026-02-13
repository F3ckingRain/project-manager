import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "Common/Components/DataTable";
import type { IProject } from "../Models";
import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { projectsSelector } from "./Redux/Selectors";
import { useCallback, useEffect, useState } from "react";
import { getTableProjectsAction } from "./Redux/Actions";
import { resetTableAction } from "../Actions";
import { join } from "lodash";

/** Конфигурация колонок таблицы проектов. */
const PROJECT_COLUMS: ColumnDef<IProject>[] = [
  {
    accessorKey: 'name',
    header: 'Название проекта',
    cell: ({ row }) => <span className="font-medium text-gray-900">{row.original.name}</span>
  },
  {
    accessorKey: "description",
    header: "Описание проекта"
  },
  {
    accessorKey: "client",
    header: "Заказчик"
  },
  {
    accessorKey: "executors",
    header: "Список исполнителей",
    cell: ({ row }) => join(row.original.executors)
  },
  {
    accessorKey: "documents",
    header: "Документация",
    cell: ({ row }) => <a className="text-blue-700" href={row.original.documents}>{row.original.documents}</a>
  },
];


/** Блок "Проекты". */
export function Projects (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const projects = useAppShallowSelector(projectsSelector);
    const [isLoading, setIsLoading] = useState(false);

    /** Функция получения списка проектов. */
        const getProjects = useCallback(async (): Promise<void>=> {
            setIsLoading(true);
    

            try {
                await dispatch(getTableProjectsAction()).unwrap()
            } finally {
                setIsLoading(false)
            }                
        }, [dispatch])

    // Получение данных при входе на страницу и их сброс при выходе.
    useEffect(() => {
        getProjects();

        return () => {
            dispatch(resetTableAction());
            setIsLoading(false);
        }
    }, [dispatch, getProjects])

    return (
        <DataTable columns={PROJECT_COLUMS} data={projects} isLoading={isLoading} />
    )
}