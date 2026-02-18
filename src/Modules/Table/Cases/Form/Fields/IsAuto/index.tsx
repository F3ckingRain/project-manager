import { Checkbox } from "Common/Components/Checkbox";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import type { ITestCase } from "Modules/Table/Models";
import { casesFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import { useTranslation } from "react-i18next";

/** Поле чекбокса авто-теста. */
export function IsAuto (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'isAuto';
    const dispatch = useAppDispatch();
    const value = useAppSelector(casesFieldSelector(fieldKey));
    const { t } = useTranslation();

    /**
     * Обработчик изменения значения в чекбоксе.
     * 
     * @param newValue Новое значение чекбокса.
     */
    const handleChange = (newValue: boolean): void => {
        dispatch(changeFormFieldAction({ key: fieldKey, value: newValue }))
    }

    return (
        <Checkbox value={value} onChange={handleChange} label={t(`Table.Cases.Config.${fieldKey}`)} />
    )
}