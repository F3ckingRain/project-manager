import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { EButtonType } from "../Button/Enums";
import styles from './Styles.module.scss'

interface IProps {
    /** Дочерний элемент. */
    children: React.ReactNode;
    /** Обработчик сброса данных фильтрации. */
    onReset: () => void;
}

/** Компонент фильтров. */
export function Filters ({ children, onReset }: IProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <div className={styles.filtersContainer + ' shadow sm'}>
            <div className={styles.filters}>
                {children}
            </div>

            <Button type={EButtonType.LINK} onClick={onReset} additionalClassName={styles.resetButton}>
                {t('Table.Actions.resetFilters')}
            </Button>
        </div>
    )
}