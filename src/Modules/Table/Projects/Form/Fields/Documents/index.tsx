import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { projectFieldSelector } from "../../Redux/Selectors";
import { changeFormFieldAction } from "../../Redux/Actions";
import type { IProject } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";

/**Поле "Документация проекта". */
export function Documents (): React.JSX.Element {
    const fieldKey: keyof IProject = 'documents';
    const dispatch = useAppDispatch();
    const value = useAppSelector(projectFieldSelector(fieldKey));
    const { t } = useTranslation();

    /**
     * Обработчик потери фокуса полем. 
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFormFieldAction({ key: fieldKey, value: newValue }));
    }

    return (
        <FieldWrap>
            <Input value={value} onBlur={handleBlur} label={t(`Table.Projects.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}