import { useNavigate, useParams } from 'react-router-dom';
import styles from './Styles.module.scss'
import { FormWrapper } from 'Common/Components/FormWrapper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'Hooks/Redux';
import { useCallback, useEffect, useState } from 'react';
import { getTestRunDataAction, resetTestRunFormAction, submitFormAction } from './Redux/State/Actions';
import toast from 'react-hot-toast';

/** Страница формы создания/редактирования прогона. */
export function FormPage (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { testRunId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Обработчик получения данных проекта по его идентификатору.
     * 
     * @param testRunId Идентификатор прогона.
     */
    const getProject = useCallback(async (testRunId: string): Promise<void> => {
        setIsLoading(true);

        try {
            await dispatch(getTestRunDataAction(testRunId)).unwrap();
        } catch (error: unknown) {
            navigate('..')

            toast.error(`${error}`)
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, navigate]);

    // Актуализация данных прогона.
    useEffect(() => {
        if (testRunId) {
            getProject(testRunId)
        }

        return () => {
            setIsLoading(false)
        }
    }, [getProject, testRunId])

    // Сброс данных формы при выходе.
    useEffect(() => () => {
        dispatch(resetTestRunFormAction())
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
            <FormWrapper 
                title={t('Table.TestRuns.Form.title', { context: testRunId })}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                <div></div>
            </FormWrapper>
        </main>
    )
}