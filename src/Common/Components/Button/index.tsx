import type { HTMLProps } from "react";
import type { EButtonType } from "./Enums";
import styles from './Styles.module.scss'
import cx from 'classnames'

interface IProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
    /** Тип кнопки. */
    type: EButtonType
    /** Дочерний элемент. */
    children: React.ReactNode;
    /** Обработчик нажатия на кнопку. */
    onClick: () => void;
}

/** Компонент "Кнопка". */
export function Button ({ type, children, onClick }: IProps): React.JSX.Element {
    return (
        <button  className={ cx(styles.button, type) } onClick={ onClick }>
            {children}
        </button>
    )
}