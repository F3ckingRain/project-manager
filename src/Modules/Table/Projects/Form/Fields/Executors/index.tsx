import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { projectFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import type { IProject } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { join, split } from "lodash";
import { validationErrorsSelector } from "../../Redux/Validation/Selectors";
import { executorsSchema } from "./Schema";
import { validateFieldAction } from "../../Redux/Validation/Actions";

/**Поле "Список исполнителей". */
export function Executors (): React.JSX.Element {
    const fieldKey: keyof IProject = 'executors';
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
        const splittedValue = split(newValue, ', ')

        dispatch(changeFormFieldAction({ key: fieldKey, value: splittedValue }));
        dispatch(validateFieldAction({ key: fieldKey, schema: executorsSchema, value: splittedValue }));
    }

    return (
        <FieldWrap errors={errors}>
            <Input value={join(value, ', ')} onBlur={handleBlur} label={t(`Table.Projects.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}