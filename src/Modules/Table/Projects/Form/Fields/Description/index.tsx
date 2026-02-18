import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { projectFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import type { IProject } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { validationErrorsSelector } from "../../Redux/Validation/Selectors";
import { validateFieldAction } from "../../Redux/Validation/Actions";
import { descriptionSchema } from "./Schema";

/**Поле "Описание проекта". */
export function Description (): React.JSX.Element {
    const fieldKey: keyof IProject = 'description';
    const dispatch = useAppDispatch();
    const value = useAppSelector(projectFieldSelector(fieldKey));
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey))
    const { t } = useTranslation();

    /**
     * Обработчик потери фокуса полем. 
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFormFieldAction({ key: fieldKey, value: newValue }));
        dispatch(validateFieldAction({ key: fieldKey, schema: descriptionSchema, value: newValue }));
    }

    return (
        <FieldWrap errors={errors}>
            <Input value={value} onBlur={handleBlur} label={t(`Table.Projects.Config.${fieldKey}`)} />
        </FieldWrap>
    )    
}