import { useEffect, useState, type ChangeEvent, type HTMLProps } from "react";
import styles from './Styles.module.scss'
import cx from 'classnames'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'

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
    const [state, setState] = useState<string>(value || '');
    const [visibleType, setVisibleType] = useState(type);

    // Актуализация значения инпута.
    useEffect(() => {
        setState(value || '');
    }, [value])

    /** 
     * Обработчик изменения значения в инпуте.
     * 
     * @param event Событие изменения.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setState(event.target.value);
    }

    /** Обработчик потери фокуса. */
    const handleBlur = (): void => {
        onBlur(state);
    }

    /** Обработчик переключения видимости символов в пароле. */
    const handleToggleType = (): void => {
        setVisibleType((prevState) => prevState === 'password' ? 'text' : 'password')
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>
                {label}
            </label>    

            <input 
                className={styles.input}
                type={visibleType}
                value={state} 
                onChange={handleChange}
                onBlur={handleBlur} 
                placeholder={placeholder}
                {...props}
            />

            {type === 'password' ? (
                <button className={cx(styles.peek, styles[visibleType])} onClick={handleToggleType}>
                    {visibleType === 'password' ? <EyeClosedIcon /> : <EyeIcon />}
                </button>
            ) : null}
        </div>
    )
}