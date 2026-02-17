import { useNavigate, useParams } from 'react-router-dom';
import styles from './Styles.module.scss'
import { FormWrapper } from 'Common/Components/FormWrapper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'Hooks/Redux';
import { useEffect } from 'react';
import { changeFormFieldAction, resetProjectFormAction, submitFormAction } from './Redux/State/Actions';

/** Страница формы создания/редактирования тест-кейса. */
export function FormPage (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { caseId } = useParams();

    // Актуализация идентификатора тест-кейса.
    useEffect(() => {
        caseId && dispatch(changeFormFieldAction({ key: 'id', value: caseId }))
    }, [dispatch, caseId])

    // Сброс данных формы при выходе.
    useEffect(() => () => {
        dispatch(resetProjectFormAction())
    }, [dispatch])

    /** Обработчик события отмены. */
    const handleCancel = (): void => {
        navigate('..')
    }

    /** Обработчик события отправки. */
    const handleSubmit = (): void => {
        dispatch(submitFormAction()).unwrap()
            .then(handleCancel)
    }

    return (
        <main className={styles.formPage}>
            <FormWrapper title={t('Table.Cases.Form.title', { context: caseId })} onCancel={handleCancel} onSubmit={handleSubmit}>
                fsafasfsa
            </FormWrapper>
        </main>
    )
}