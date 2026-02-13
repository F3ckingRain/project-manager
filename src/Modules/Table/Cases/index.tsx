import type { ColumnDef } from "@tanstack/react-table"
import type { ITestCase } from "../Models";
import { ETestCaseStatus } from "../Enums";
import { DataTable } from "Common/Components/DataTable";
import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { casesSelector } from "./Redux/Selectors";
import { useCallback, useEffect, useState } from "react";
import { getTableCasessAction } from "./Redux/Actions";
import { resetTableAction } from "../Actions";

/** 
 * Функция получения имени класса для статуса.
 * 
 * @param status Статус.
 */
function getStatusClassName (status: ETestCaseStatus): string {
  if (status === ETestCaseStatus.DONE) {
    return 'bg-green-100 text-green-700' 
  }

  if (status === ETestCaseStatus.IN_PROGRESS) {
    return 'text-gray-700'
  }

  return 'bg-amber-100 text-amber-700'
}

/** Конфигурация колонок таблицы тест-кейсов. */
const TEST_CASE_COLUMNS: ColumnDef<ITestCase>[] = [
  {
    accessorKey: 'title',
    header: 'Тест-кейс',
  },
  {
    accessorKey: "preCondition",
    header: "Преусловие",
  }, 
  {
    accessorKey: "steps",
    header: "Шаги",
  }, 
  {
    accessorKey: "expected",
    header: "Ожидаемый результат",
  }, 
  {
    accessorKey: "result",
    header: "Фактический результат",
  }, 
  {
    accessorKey: "postCondition",
    header: "Постусловия",
  }, 
  {
    accessorKey: "comment",
    header: "Комментарий",
  }, 
  {
    accessorKey: "attachments",
    header: "Вложения",
  }, 
  {
      accessorKey: 'status',
      header: 'Статус',
      cell: ({ row }) => {
        const status = row.original.status;

        return <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClassName(status)}`}>{status}</span>;
      }
    },
];


/** Блок "Тест-кейсы". */
export function Cases (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const cases = useAppShallowSelector(casesSelector);
    const [isLoading, setIsLoading] = useState(false);

    /** Функция получения списка тест-кейсов. */
    const getCases = useCallback(async (): Promise<void>=> {
      setIsLoading(true);

      try {
        await dispatch(getTableCasessAction()).unwrap()
      } finally {
        setIsLoading(false)
      }
    }, [dispatch])

    // Получение данных при входе на страницу и их сброс при выходе.
    useEffect(() => {
        getCases();

        return () => {
            dispatch(resetTableAction());
            setIsLoading(false)
        }
    }, [dispatch, getCases]);
    
    return (
        <DataTable columns={TEST_CASE_COLUMNS} data={cases} isLoading={isLoading} />
    )
}