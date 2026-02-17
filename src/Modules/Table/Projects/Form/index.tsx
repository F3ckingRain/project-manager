import { useNavigate, useParams } from 'react-router-dom';
import styles from './Styles.module.scss'
import { FormWrapper } from 'Common/Components/FormWrapper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'Hooks/Redux';
import { useCallback, useEffect, useState } from 'react';
import { getProjectDataAction, resetProjectFormAction, submitFormAction } from './Redux/Actions';
import { ProjectName } from './Fields/ProjectName';
import { Description } from './Fields/Description';
import { Client } from './Fields/Client';
import { Executors } from './Fields/Executors';
import { Documents } from './Fields/Documents';
import toast from 'react-hot-toast';

/** Страница формы создания/редактирования проекта. */
export function FormPage (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Обработчик получения данных проекта по его идентификатору.
     * 
     * @param projectId Идентификатор проекта.
     */
    const getProject = useCallback(async (projectId: string): Promise<void> => {
        setIsLoading(true);

        try {
            await dispatch(getProjectDataAction(projectId)).unwrap();
        } catch (error: unknown) {
            navigate('..')

            toast.error(`${error}`)
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, navigate]);

    // Актуализация данных проекта.
    useEffect(() => {
        if (projectId) {
            getProject(projectId)
        }

        return () => {
            setIsLoading(false)
        }
    }, [getProject, projectId])

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
            <FormWrapper 
                title={t('Table.Projects.Form.title', { context: projectId })}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                <ProjectName />

                <Description />

                <Client />

                <Executors />

                <Documents />
            </FormWrapper>
        </main>
    )
}