import { Checkbox } from "Common/Components/Checkbox";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";
import { useTranslation } from "react-i18next";

/** Чекбокс "Оставаться в сети". */
export function KeepSession (): React.JSX.Element {
        const dispatch = useAppDispatch();
        const fieldKey: keyof IAuthForm = 'keepSession'
        const value = useAppSelector(authStateSelector(fieldKey))
        const { t } = useTranslation()
    
        /**
         * Обработчик потери фокуса полем.
         * 
         * @param newValue Новое значение поля.
         */
        const handleChange = (newValue: boolean): void => {
            dispatch(changeFieldAction({ key: fieldKey, value: newValue }))
        }
    
    return (
        <Checkbox value={value} onChange={handleChange} label={t(fieldKey)} />
    )
}