import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { casesFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { validateFieldAction } from "../../Redux/Validation/Actions";
import { expectionSchema } from "./Schema";
import { validationErrorsSelector } from "../../Redux/Validation/Selectors";

/**Поле "Ожидаемый результат". */
export function Expection (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'expected';
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
        dispatch(changeFormFieldAction({ key: fieldKey, value: newValue }));
        dispatch(validateFieldAction({ key: fieldKey, schema: expectionSchema, value: newValue }));
    }

    return (
        <FieldWrap errors={errors}>
            <Input value={value} onBlur={handleBlur} label={t(`Table.Cases.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}