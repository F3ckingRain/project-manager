import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "Common/Components/DataTable";
import type { IProject } from "../Models";
import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { projectsSelector } from "./Redux/State/Selectors";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getTableProjectsAction, removeProjectAction } from "./Redux/State/Actions";
import { resetTableAction } from "../Actions";
import { join } from "lodash";
import { TableWrapper } from "Common/Components/TableWrapper";
import { Pagination } from "Common/Components/Pagination";
import { AVAILABLE_PAGES } from "Common/Consts";
import { ProjectFilters } from "./Filters";
import { changePaginationAction } from "./Redux/Filters/Actions";
import { useTranslation } from "react-i18next";
import { generatePath, Route, Routes, useNavigate } from "react-router-dom";
import { PROJECT_CREATE_PATH, PROJECT_EDIT_PATH } from "./Form/Consts";
import { FormPage } from "./Form";
import { Button } from "Common/Components/Button";
import { EButtonType } from "Common/Components/Button/Enums";
import { EFormType } from "Modules/Auth/Form/Enums";
import styles from './Styles.module.scss'

/** Блок "Проекты". */
function ProjectsComponent (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const projects = useAppShallowSelector(projectsSelector);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    /** Конфигурация колонок таблицы проектов. */
    const PROJECT_COLUMS: ColumnDef<IProject>[] = useMemo(() => [
      {
        accessorKey: 'name',
        header: t('Table.Projects.Config.name'),
        cell: ({ row }) => <span className="font-medium text-gray-900">{row.original.name}</span>
      },
      {
        accessorKey: "description",
        header: t('Table.Projects.Config.description')
      },
      {
        accessorKey: "client",
        header: t('Table.Projects.Config.client')
      },
      {
        accessorKey: "executors",
        header: t('Table.Projects.Config.executors'),
        cell: ({ row }) => join(row.original.executors)
      },
      {
        accessorKey: "documents",
        header: t('Table.Projects.Config.documents'),
        cell: ({ row }) => <a className="text-blue-700" href={row.original.documents}>{row.original.documents}</a>
      },
    ], [t]);

    /** 
     * Обработчик удаления проекта. 
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleRemoveProject = useCallback((rowId: string) => (): void => {
      const projectId = projects?.[+rowId]?.id || '';

      dispatch(removeProjectAction(projectId))
    }, [dispatch, projects]);

    /**
     * Обработчик изменения проекта.
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleEditProject = useCallback((rowId: string) => (): void => {
      const projectId = projects?.[+rowId]?.id || '';

        navigate(generatePath(PROJECT_EDIT_PATH, { projectId }))
    }, [navigate, projects]);

    /** Функция получения списка проектов. */
    const getProjects = useCallback(async (): Promise<void>=> {
        setIsLoading(true);
    
        try {
            await dispatch(getTableProjectsAction()).unwrap()
        } finally {
            setIsLoading(false)
        }                
    }, [dispatch]);

    /** Обработчик создания нового проекта. */
    const handleCreateProject = useCallback((): void => {
      navigate(PROJECT_CREATE_PATH)
    }, [navigate])

    /** 
     * Обработчик изменения пагинации. 
     * 
     * @param newPage Новая страница.
     */
    const handleChangePagionation = useCallback((newPage: number): void => {
      dispatch(changePaginationAction(newPage));

      getProjects()
    }, [dispatch, getProjects]);

    // Получение данных при входе на страницу и их сброс при выходе.
    useEffect(() => {
        getProjects();

        return () => {
            dispatch(resetTableAction());
            setIsLoading(false);
        }
    }, [dispatch, getProjects]);

    return (
        <>
          <TableWrapper>
            <ProjectFilters onGetProjects={getProjects} />

            <Button type={EButtonType.GENERAL} onClick={handleCreateProject} additionalClassName={styles.createButton}>
              {t(`Auth.Actions.General.${EFormType.SIGN_UP}`)}
            </Button>

            <DataTable 
              columns={PROJECT_COLUMS} 
              data={projects} 
              isLoading={isLoading} 
              actions={ {
                onEdit: handleEditProject,
                onRemove: handleRemoveProject
              } }
            />

            <Pagination availablePages={AVAILABLE_PAGES} onChange={handleChangePagionation} />
        </TableWrapper>

        <Routes>
          <Route element={<FormPage />} path={PROJECT_CREATE_PATH} />

          <Route element={<FormPage />} path={PROJECT_EDIT_PATH} />
        </Routes>
        </>
    )
}

/** Мемоизированный компонент таблицы проектов. */
export const Projects = memo(ProjectsComponent)