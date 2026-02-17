import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { EButtonType } from '../Button/Enums';
import styles from './Styles.module.scss'

interface IProps {
    /** Заголовок формы. */
    title: string;
    /** Обработчик отправки формы. */
    onSubmit: () => void;
    /** Обработчик отмены. */
    onCancel?: () => void;
    /** Дочерний элемент формы. */
    children: React.ReactNode;
}

/** Обёртка компонента формы. */
export function FormWrapper ({ title, children, onSubmit, onCancel }: IProps): React.JSX.Element {
    const { t } = useTranslation();

    return (
        <form className={styles.formWrapper} onSubmit={(e: React.SubmitEvent<HTMLFormElement>): void => e.preventDefault()}>
            <div className={styles.formWrapper__title}>
                {title}
            </div>

            <div className={styles.formWrapper__content}>
                {children}
            </div>

            <div className={styles.formWrapper__footer}>
                {onCancel ? (
                    <Button type={EButtonType.SECONDARY} onClick={onCancel}>
                        {t('Form.Actions.cancel')}
                    </Button>
                ) : null}    

                <Button type={EButtonType.GENERAL} onClick={onSubmit}>
                        {t('Form.Actions.submit')}
                </Button>
            </div>
        </form>
    )
}