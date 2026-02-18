import { memo, useCallback, useEffect, useMemo, useState } from "react";
import type { ITestRun } from "../Models";
import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { generatePath, Route, Routes, useNavigate } from "react-router-dom";
import { testRunsSelector } from "./Redux/State/Selectors";
import { useTranslation } from "react-i18next";
import type { ColumnDef } from "@tanstack/react-table";
import { getTableTestRunsAction, removeTestRunAction } from "./Redux/State/Actions";
import { TEST_RUN_CREATE_PATH, TEST_RUN_EDIT_PATH } from "./Form/Consts";
import { resetTableAction } from "../Actions";
import { TableWrapper } from "Common/Components/TableWrapper";
import { Button } from "Common/Components/Button";
import { EButtonType } from "Common/Components/Button/Enums";
import { EFormType } from "Modules/Auth/Form/Enums";
import { DataTable } from "Common/Components/DataTable";
import styles from './Styles.module.scss';
import { map } from "lodash";
import { getStatusClassName } from "Utils/Classnames";
import cx from 'classnames'
import { FormPage } from "./Form";

/** Таблица "Прогоны". */
function TestRunsComponent (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const testRuns = useAppShallowSelector(testRunsSelector);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    /** Конфигурация колонок таблицы прогонов. */
    const PROJECT_COLUMS: ColumnDef<ITestRun>[] = useMemo(() => [
      {
        accessorKey: "testCases",
        header: t('Table.TestRuns.Config.testCases'),
        cell: ({ row }) => (
             <div className={styles.testCases}>
                {map(row.original.testCases, ({ status, id, title }) => (
                    <div className={styles.testCases__case} key={`test-case-${id}`}>
                        <div className="font-medium text-gray-900">
                            {id}
                        </div>

                        <div>
                            {title}
                        </div>

                        <div className={cx(styles.status, `rounded-full px-2 py-1 text-xs font-medium ${getStatusClassName(status)}`)}>
                            {status}
                        </div>
                    </div>
                ))}  
             </div>
        ),
      },
      {
        accessorKey: "report",
        header: t('Table.TestRuns.Config.report')
      },
    ], [t]);

    /** 
     * Обработчик удаления прогона. 
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleRemoveProject = useCallback((rowId: string) => (): void => {
      const testRunId = testRuns?.[+rowId]?.id || '';

      dispatch(removeTestRunAction(testRunId))
    }, [dispatch, testRuns]);

    /**
     * Обработчик изменения прогона.
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleEditProject = useCallback((rowId: string) => (): void => {
      const testRunId = testRuns?.[+rowId]?.id || '';

        navigate(generatePath(TEST_RUN_EDIT_PATH, { testRunId }))
    }, [navigate, testRuns]);

    /** Обработчик создания нового прогона. */
    const handleCreateProject = useCallback((): void => {
      navigate(TEST_RUN_CREATE_PATH)
    }, [navigate])

    /** Функция получения списка прогонов. */
    const getProjects = useCallback(async (): Promise<void>=> {
        setIsLoading(true);
    
        try {
            await dispatch(getTableTestRunsAction()).unwrap()
        } finally {
            setIsLoading(false)
        }                
    }, [dispatch]);    

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
              <Button type={EButtonType.GENERAL} onClick={handleCreateProject} additionalClassName={styles.createButton}>
                {t(`Auth.Actions.General.${EFormType.SIGN_UP}`)}
              </Button>

              <DataTable 
                columns={PROJECT_COLUMS} 
                data={testRuns} 
                isLoading={isLoading} 
                actions={ {
                  onEdit: handleEditProject,
                  onRemove: handleRemoveProject
                } }
              />
          </TableWrapper>
        
          <Routes>
              <Route element={<FormPage />} path={TEST_RUN_CREATE_PATH} />

              <Route element={<FormPage />} path={TEST_RUN_EDIT_PATH} />
          </Routes>  
        </>
    )
}

/** Мемоизированный блок "Прогоны". */
export const TestRuns = memo(TestRunsComponent)