import styles from './Styles.module.scss'

interface IProps {
    /** Дочерний элемент. */
    children: React.ReactNode;
}

/** Компонент обёртки таблицы. */
export function TableWrapper ({ children }: IProps): React.JSX.Element {
    return (
        <div className={styles.tableWrapper}>
            {children}
        </div>
    )
}