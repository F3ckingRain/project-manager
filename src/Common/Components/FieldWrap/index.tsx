import { isEmpty, map } from "lodash";
import { CircleAlertIcon } from 'lucide-react'
import styles from './Styles.module.scss'

interface IProps {
    /** Дочерний элемент. */
    children: React.ReactNode;
    /** Ошибки поля. */
    errors?: string[]
}

/** Обёртка поля. */
export function FieldWrap ({ children, errors }: IProps): React.JSX.Element {
    return (
        <div className={styles.fieldWrap}>
            {children}

            {isEmpty(errors) ? null : (
                <div className={styles.errors}>
                    {map(errors, (error) => (
                        <div className={styles.errors__error} key={error}>
                            <CircleAlertIcon />

                            <span>
                                {error}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}