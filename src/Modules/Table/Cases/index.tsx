import type { ColumnDef } from "@tanstack/react-table"
import type { ITestCase } from "../Models";
import { DataTable } from "Common/Components/DataTable";
import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { casesSelector } from "./Redux/State/Selectors";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { getTableCasesAction, removeCaseAction } from "./Redux/State/Actions";
import { resetTableAction } from "../Actions";
import { TableWrapper } from "Common/Components/TableWrapper";
import { EFormType } from "Modules/Auth/Form/Enums";
import { useTranslation } from "react-i18next";
import { Button } from "Common/Components/Button";
import styles from './Styles.module.scss'
import { Pagination } from "Common/Components/Pagination";
import { AVAILABLE_PAGES } from "Common/Consts";
import { CasesFilters } from "./Filters";
import { EButtonType } from "Common/Components/Button/Enums";
import { CASES_CREATE_PATH, CASES_EDIT_PATH } from "./Form/Consts";
import { generatePath, Route, Routes, useNavigate } from "react-router-dom";
import { changePaginationAction } from "./Redux/Filters/Actions";
import { FormPage } from "./Form";
import { getStatusClassName } from "Utils/Classnames";

/** Блок "Тест-кейсы". */
function CasesComponent (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const cases = useAppShallowSelector(casesSelector);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    /** Конфигурация колонок таблицы тест-кейсов. */
    const TEST_CASE_COLUMNS: ColumnDef<ITestCase>[] = useMemo(() => (
      [
      {
        accessorKey: 'title',
        header: t('Table.Cases.Config.title'),
      },
      {
        accessorKey: "preCondition",
        header: t('Table.Cases.Config.preCondition'),
      }, 
      {
        accessorKey: "steps",
        header: t('Table.Cases.Config.steps'),
      }, 
      {
        accessorKey: "expected",
        header: t('Table.Cases.Config.expected'),
      }, 
      {
        accessorKey: "result",
        header: t('Table.Cases.Config.result'),
      }, 
      {
        accessorKey: "postCondition",
        header: t('Table.Cases.Config.postCondition'),
      }, 
      {
        accessorKey: "comment",
        header: t('Table.Cases.Config.comment'),
      }, 
      {
        accessorKey: "attachments",
        header: t('Table.Cases.Config.attachments'),
      }, 
      {
          accessorKey: 'status',
          header: t('Table.Cases.Config.status'),
          cell: ({ row }) => {
            const status = row.original.status;

            return <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClassName(status)}`}>{status}</span>;
          }
        },
    ]), [t]);

    

    /** 
     * Обработчик удаления тест-кейса. 
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleRemoveCase = useCallback((rowId: string) => (): void => {
      const caseId = cases?.[+rowId]?.id || '';

      dispatch(removeCaseAction(caseId))
    }, [dispatch, cases]);

    /**
     * Обработчик изменения тест-кейса.
     * 
     * @param rowId Идентификатор ряда.
     */
    const handleEditCase = useCallback((rowId: string) => (): void => {
      const caseId = cases?.[+rowId]?.id || '';

        navigate(generatePath(CASES_EDIT_PATH, { caseId }))
    }, [navigate, cases]);

    /** Функция получения списка тест-кейсов. */
    const getCases = useCallback(async (): Promise<void>=> {
      setIsLoading(true);

      try {
        await dispatch(getTableCasesAction()).unwrap()
      } finally {
        setIsLoading(false)
      }
    }, [dispatch])

    /** Обработчик создания нового тест-кейса. */
        const handleCreateCase = useCallback((): void => {
          navigate(CASES_CREATE_PATH)
        }, [navigate]);

    /** 
         * Обработчик изменения пагинации. 
         * 
         * @param newPage Новая страница.
         */
        const handleChangePagionation = useCallback((newPage: number): void => {
          dispatch(changePaginationAction(newPage));
    
          getCases()
        }, [dispatch, getCases]);    

    // Получение данных при входе на страницу и их сброс при выходе.
    useEffect(() => {
        getCases();

        return () => {
            dispatch(resetTableAction());
            setIsLoading(false)
        }
    }, [dispatch, getCases]);
    
    return (
       <>
          <TableWrapper>
            <CasesFilters onGetCases={getCases} />

            <Button type={EButtonType.GENERAL} onClick={handleCreateCase} additionalClassName={styles.createButton}>
              {t(`Auth.Actions.General.${EFormType.SIGN_UP}`)}
            </Button>

            <DataTable 
              columns={TEST_CASE_COLUMNS} 
              data={cases} 
              isLoading={isLoading}
              actions={ {
                onEdit: handleEditCase,
                onRemove: handleRemoveCase
              } }
            />

            <Pagination availablePages={AVAILABLE_PAGES} onChange={handleChangePagionation} />
        </TableWrapper>

        <Routes>
          <Route element={<FormPage />} path={CASES_CREATE_PATH} />

          <Route element={<FormPage />} path={CASES_EDIT_PATH} />
        </Routes>
        </>
    )
}

/** Мемоизированный компонент таблицы тест-кейсов. */
export const Cases = memo(CasesComponent)