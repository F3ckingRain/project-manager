import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { projectFieldSelector } from "../../Redux/Selectors";
import { changeFormFieldAction } from "../../Redux/Actions";
import type { IProject } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";

/**Поле "Описание проекта". */
export function Description (): React.JSX.Element {
    const fieldKey: keyof IProject = 'description';
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