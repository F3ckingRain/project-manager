import { useNavigate, useParams } from 'react-router-dom';
import styles from './Styles.module.scss'
import { FormWrapper } from 'Common/Components/FormWrapper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'Hooks/Redux';
import { useCallback, useEffect, useState } from 'react';
import { getCaseDataAction, resetProjectFormAction, submitFormAction } from './Redux/State/Actions';
import { CaseTitle } from './Fields/CaseTitle';
import { PreCondition } from './Fields/PreCondition';
import { Steps } from './Fields/Steps';
import { Expection } from './Fields/Expection';
import { Result } from './Fields/Result';
import { PostCondition } from './Fields/PostCondition';
import { Attachments } from './Fields/Attachments';
import { Comment } from './Fields/Comment';
import toast from 'react-hot-toast';
import { validateForm } from './Redux/Validation/Actions';
import { IsAuto } from './Fields/IsAuto';
import { Description } from './Fields/Description';

/** Страница формы создания/редактирования тест-кейса. */
export function FormPage (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { caseId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    /**
    * Обработчик получения данных тест-кейса по его идентификатору.
    * 
    * @param caseId Идентификатор тест-кейса.
    */
    const getCase = useCallback(async (caseId: string): Promise<void> => {
        setIsLoading(true);
    
        try {
            await dispatch(getCaseDataAction(caseId)).unwrap();
        } catch (error: unknown) {
            navigate('..')

            toast.error(`${error}`)
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, navigate]);

    // Актуализация тест-кейса проекта.
    useEffect(() => {
        if (caseId) {
            getCase(caseId)
        }

        return () => {
            setIsLoading(false)
        }
    }, [getCase, caseId])

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
        dispatch(validateForm()).unwrap()
            .then(() => {
                dispatch(submitFormAction()).unwrap()
                    .then(handleCancel)
            })
    }

    return (
        <main className={styles.formPage}>
            <FormWrapper 
                title={t('Table.Cases.Form.title', { context: caseId })}
                onCancel={handleCancel} 
                onSubmit={handleSubmit}
                isLoading={isLoading}
            >
                <CaseTitle />

                <Description />
                
                <PreCondition />

                <Steps />

                <Expection />

                <Result />

                <PostCondition />

                <Comment />

                <Attachments />

                <IsAuto />
            </FormWrapper>
        </main>
    )
}