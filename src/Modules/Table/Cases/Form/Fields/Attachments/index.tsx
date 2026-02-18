import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { casesFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { join, split } from "lodash";
import { validateFieldAction } from "../../Redux/Validation/Actions";
import { attachmentsSchema } from "./Schema";
import { validationErrorsSelector } from "../../Redux/Validation/Selectors";

/**Поле "Вложения". */
export function Attachments (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'attachments';
    const dispatch = useAppDispatch();
    const value = useAppSelector(casesFieldSelector(fieldKey));
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey))
    const { t } = useTranslation();

    /**
     * Обработчик потери фокуса полем. 
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        const splittedValue = split(newValue, ', ');

        dispatch(changeFormFieldAction({ key: fieldKey, value: splittedValue }));
        dispatch(validateFieldAction({ key: fieldKey, schema: attachmentsSchema, value: splittedValue }));
    }

    return (
        <FieldWrap errors={errors}>
            <Input value={join(value, ', ')} onBlur={handleBlur} label={t(`Table.Cases.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}