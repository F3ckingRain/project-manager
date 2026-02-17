import { useAppDispatch, useAppShallowSelector } from "Hooks/Redux";
import { changeProjectFilterAction, resetFiltersAction } from "../Redux/Filters/Actions";
import { Filters } from "Common/Components/Filters";
import { Input } from "Common/Components/Input";
import type { IProject } from "Modules/Table/Models";
import { projectsFiltersSelector } from "../Redux/Filters/Selectors";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

interface IProps {
    /** Обработчик получения списка проектов. */ 
    onGetProjects: () => void;
}

/** Фильтры таблицы проектов. */
export function ProjectFilters ({ onGetProjects }: IProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const { filters } = useAppShallowSelector(projectsFiltersSelector) || {};
    const { t } = useTranslation()

    /** Обработчик сброса фильтрации. */
   const handleResetFilters = (): void => {
      dispatch(resetFiltersAction());

      onGetProjects();
   }

   /** 
    * Обработчик изменения фильтра. 
    * 
    * @param key Ключ фильтра.
    * @param newValue Новое значение фильтра.
    */
   const handleChangeFilter = (key: keyof IProject) => (newValue: string): void => {
        dispatch(changeProjectFilterAction({ key, value: newValue }));

        onGetProjects()
    }    
    
    return (
        <Filters onReset={handleResetFilters}>
            <Input value={get(filters, 'name')} onBlur={handleChangeFilter('name')} label={t('Table.Projects.Config.name')} /> 

            <Input value={get(filters, 'client')} onBlur={handleChangeFilter('client')} label={t('Table.Projects.Config.client')}/>
        </Filters>
    )
}