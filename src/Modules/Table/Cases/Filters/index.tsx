import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { Filters } from "Common/Components/Filters";
import { Input } from "Common/Components/Input";
import type { ITestCase } from "Modules/Table/Models";
import { casesFiltersSelector } from "../Redux/Filters/Selectors";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { resetFiltersAction, changeCaseFilterAction } from "../Redux/Filters/Actions";

interface IProps {
    /** Обработчик получения списка тест-кейсов. */ 
    onGetCases: () => void;
}

/** Фильтры таблицы тест-кейсов. */
export function CasesFilters ({ onGetCases }: IProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const { filters } = useAppShallowSelector(casesFiltersSelector) || {};
    const { t } = useTranslation()

    /** Обработчик сброса фильтрации. */
   const handleResetFilters = (): void => {
      dispatch(resetFiltersAction());

      onGetCases();
   }

   /** 
    * Обработчик изменения фильтра. 
    * 
    * @param key Ключ фильтра.
    * @param newValue Новое значение фильтра.
    */
   const handleChangeFilter = (key: keyof ITestCase) => (newValue: string): void => {
        dispatch(changeCaseFilterAction({ key, value: newValue }));

        onGetCases()
    }    
    
    return (
        <Filters onReset={handleResetFilters}>
            <Input value={get(filters, 'title')} onBlur={handleChangeFilter('title')} label={t('Table.Cases.Config.title')} /> 

            <Input value={get(filters, 'projectId')} onBlur={handleChangeFilter('projectId')} label={t('Table.Cases.Config.projectId')}/>
        </Filters>
    )
}