import styles from './Styles.module.scss'

interface IProps {
    /** Значение чекбокса. */
    value: Optional<boolean>;
    /** Обработчик изменения значения чекбокса. */
    onChange: (value: boolean) => void;
    /** Лейбл чекбокса. */
    label: string
}

/** Компонент "Чекбокс" */
export function Checkbox ({ value = false, onChange, label }: IProps): React.JSX.Element {
    /**
     * Обработчик изменения значения в чекбоксе.
     * 
     * @param event Событие изменения.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.checked

        onChange(newValue)
    }

    return (
        <label className={styles.label}>
            <input 
            className={styles.checkBox}
             type="checkbox" 
             checked={value}
              onChange={handleChange} 
            />

            {label}
        </label>
    )
}