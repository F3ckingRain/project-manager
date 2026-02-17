import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { casesFieldSelector } from "../../Redux/Selectors";
import { changeFormFieldAction } from "../../Redux/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";

/**Поле "Наименование проекта". */
export function CaseTitle (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'title';
    const dispatch = useAppDispatch();
    const value = useAppSelector(casesFieldSelector(fieldKey));
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
            <Input value={value} onBlur={handleBlur} label={t(`Table.Cases.Config.${fieldKey}`)} />
        </FieldWrap>
    )
}