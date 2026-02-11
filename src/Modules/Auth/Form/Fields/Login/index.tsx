import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";
import { validateFieldAction } from "Modules/Auth/Redux/Validation/Actions";
import { useTranslation } from "react-i18next";
import { loginSchema } from './Schema'
import { validationErrorsSelector } from "Modules/Auth/Redux/Validation/Selectors";
import { FieldWrap } from "Common/Components/FieldWrap";

/** Поле "Логин". */
export function Login (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const fieldKey: keyof IAuthForm = 'login'
    const value = useAppSelector(authStateSelector(fieldKey));
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey))
    const { t } = useTranslation();

    /**
     * Обработчик потери фокуса полем.
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFieldAction({ key: fieldKey, value: newValue }));

        dispatch(validateFieldAction({ key: fieldKey, value: newValue, schema: loginSchema }))
    }

    return (
        <FieldWrap
            errors={errors}
        >
            <Input 
                value={value}
                onBlur={handleBlur}
                label={t(fieldKey)}
            />
        </FieldWrap>
    )
}