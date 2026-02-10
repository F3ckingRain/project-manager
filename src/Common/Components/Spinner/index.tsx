import { ESpinnerType } from "./Enums"
import styles from './Styles.module.scss'

interface IProps {
    /** Тип спиннера. */
    type: ESpinnerType;
    /** Лейбл. */
    label?: string
}

/** Компонент "Спиннер". */
export function Spinner ({ type, label }: IProps): React.JSX.Element {

    return type === ESpinnerType.WIDGET ? (
        <div className={styles.widgetContainer}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner} />

            {label}
            </div>
        </div>
    ) : (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner} />

            {label}
        </div>
    )
}