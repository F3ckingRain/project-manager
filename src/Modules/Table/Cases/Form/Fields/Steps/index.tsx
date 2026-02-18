import { FieldWrap } from "Common/Components/FieldWrap";
import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { casesFieldSelector } from "../../Redux/State/Selectors";
import { changeFormFieldAction } from "../../Redux/State/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { useTranslation } from "react-i18next";
import { validateFieldAction } from "../../Redux/Validation/Actions";
import { stepsSchema } from "./Schema";
import { validationErrorsSelector } from "../../Redux/Validation/Selectors";
import { filter, map, size } from "lodash";
import { XIcon } from 'lucide-react';
import styles from './Styles.module.scss'
import cx from 'classnames'
import { Button } from "Common/Components/Button";
import { EButtonType } from "Common/Components/Button/Enums";

/**Поле "Шаги". */
export function Steps (): React.JSX.Element {
    const fieldKey: keyof ITestCase = 'steps';
    const dispatch = useAppDispatch();
    const steps = useAppSelector(casesFieldSelector(fieldKey)) || [''];
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey))
    const { t } = useTranslation();    

    /**
     * Обработчик потери фокуса полем. 
     * 
     * @parma index Порядковый номер шага.
     * @param newValue Новое значение поля.
     */
    const handleBlur = (index: number) => (newValue: string): void => {
        const newSteps = map(steps, (step, stepIndex) => stepIndex === index ? newValue : step);

        dispatch(changeFormFieldAction({ key: fieldKey, value: newSteps }));
        dispatch(validateFieldAction({ key: fieldKey, schema: stepsSchema, value: newSteps }));
    }

    /** Обработчик нажатия кнопки "Добавить". */
    const handleAddStep = (): void => {
        dispatch(changeFormFieldAction({ key: fieldKey, value: [...steps, ''] }));
    }

    /** Обработчик удаления шага. */
    const handleRemoveStep = (stepIndex: number) => (): void => {
        const newValue = filter(steps, (_, index) => index === stepIndex);

        dispatch(changeFormFieldAction({ key: fieldKey, value: newValue }));
    }

    return (
        <FieldWrap errors={errors}>
            {map(steps, (value, index) => (
                <div className={styles.inputContainer} key={`step-${index}`}>
                    <Input value={value} onBlur={handleBlur(index)} label={t(`Table.Cases.Config.${fieldKey}`, { count: index + 1 })} />

                    {size(steps) === 1 ? null : (
                        <button className={cx(styles.stepButton, styles.stepButton__remove)} onClick={handleRemoveStep(index)}>
                            <XIcon />
                        </button>
                    )}
                </div>
            ))}

            <Button onClick={handleAddStep} type={EButtonType.LINK} additionalClassName={styles.stepButton__add}>
                Добавить
            </Button>
        </FieldWrap>
    )
}