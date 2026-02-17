import type { HTMLProps } from "react";
import type { EButtonType } from "./Enums";
import styles from './Styles.module.scss'
import cx from 'classnames'

interface IProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'className'> {
    /** Тип кнопки. */
    type: EButtonType
    /** Дочерний элемент. */
    children: React.ReactNode;
    /** Обработчик нажатия на кнопку. */
    onClick: () => void;
    /** Дополнительное имя класса. */
    additionalClassName?: string;
}

/** Компонент "Кнопка". */
export function Button ({ type, children, onClick, additionalClassName }: IProps): React.JSX.Element {
    return (
        <button  className={ cx(styles.button, styles[type], additionalClassName) } onClick={ onClick }>
            {children}
        </button>
    )
}