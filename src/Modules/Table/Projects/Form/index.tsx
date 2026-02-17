import { useNavigate, useParams } from 'react-router-dom';
import styles from './Styles.module.scss'
import { FormWrapper } from 'Common/Components/FormWrapper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'Hooks/Redux';
import { useEffect } from 'react';
import { changeFormFieldAction, resetProjectFormAction, submitFormAction } from './Redux/State/Actions';

/** Страница формы создания/редактирования проекта. */
export function FormPage (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { projectId } = useParams();

    // Актуализация идентификатора проекта.
    useEffect(() => {
        projectId && dispatch(changeFormFieldAction({ key: 'id', value: projectId }))
    }, [dispatch, projectId])

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
            <FormWrapper title={t('Table.Projects.Form.title', { context: projectId })} onCancel={handleCancel} onSubmit={handleSubmit}>
                fsafasfsa
            </FormWrapper>
        </main>
    )
}