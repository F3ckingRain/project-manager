import { Checkbox } from "Common/Components/Checkbox";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import i18n from "Translations";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";

/** Чекбокс "Оставаться в сети". */
export function KeepSession (): React.JSX.Element {
        const dispatch = useAppDispatch();
        const fieldKey: keyof IAuthForm = 'keepSession'
        const value = useAppSelector(authStateSelector(fieldKey))
    
        /**
         * Обработчик потери фокуса полем.
         * 
         * @param newValue Новое значение поля.
         */
        const handleChange = (newValue: boolean): void => {
            dispatch(changeFieldAction({ key: fieldKey, value: newValue }))
        }
    
    return (
        <Checkbox value={value} onChange={handleChange} label={i18n.t(fieldKey)} />
    )
}