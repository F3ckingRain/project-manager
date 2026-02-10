import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";
import i18n from "Translations";

/** Поле "Логин". */
export function Login (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const fieldKey: keyof IAuthForm = 'login'
    const value = useAppSelector(authStateSelector(fieldKey))

    /**
     * Обработчик потери фокуса полем.
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFieldAction({ key: fieldKey, value: newValue }))
    }

    return (
        <Input 
            value={value}
            onBlur={handleBlur}
            label={i18n.t(fieldKey)}
        />
    )
}