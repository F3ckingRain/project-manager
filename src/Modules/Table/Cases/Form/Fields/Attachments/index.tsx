import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { casesFieldSelector } from "../../Redux/Selectors";
import { changeFormFieldAction } from "../../Redux/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { join, split } from "lodash";

/**Поле "Вложения". */
export function Attachments (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'attachments';
    const dispatch = useAppDispatch();
    const value = useAppSelector(casesFieldSelector(fieldKey));
    const { t } = useTranslation();

    /**
     * Обработчик потери фокуса полем. 
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFormFieldAction({ key: fieldKey, value: split(newValue, ', ') }));
    }

    return (
        <FieldWrap>
            <Input value={join(value, ', ')} onBlur={handleBlur} label={t(`Table.Cases.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}