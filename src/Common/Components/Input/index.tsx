import { useState, type ChangeEvent, type HTMLProps } from "react";
import styles from './Styles.module.scss'

interface IProps extends Omit<HTMLProps<HTMLInputElement>, 'onBlur' | 'label' | 'value'> {
    /** Значение поля. */
    value: Optional<string>;
    /** Обработчик изменения значения поля. */
    onBlur: (newValue: string) => void;
    /** Лейбл. */
    label: React.ReactNode;
    /** Плейсхолдер. */
    placeholder?: string;
}

/** Компонент "Инпут". */
export function Input ({ value, onBlur, label, type = 'text', placeholder, ...props }: IProps): React.JSX.Element {
    const [state, setState] = useState<string>(value || '')

    /** 
     * Обработчик изменения значения в инпуте.
     * 
     * @param event Событие изменения.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setState(event.target.value)
    }

    /** Обработчик потери фокуса. */
    const handleBlur = (): void => {
        onBlur(state)
    }

    return (
        <label className={styles.label}>
            {label}

            <input 
            className={styles.input}
                type={type}
                 value={state} 
                 onChange={handleChange}
                  onBlur={handleBlur} 
                  placeholder={placeholder}
                  {...props}
                  />
        </label>
    )
}