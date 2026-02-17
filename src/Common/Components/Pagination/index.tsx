import { useState } from 'react';
import styles from './Styles.module.scss'
import { map } from 'lodash';
import { Button } from '../Button';
import { EButtonType } from '../Button/Enums';

interface IProps {
    /** Доступное кол-во страниц. */
    availablePages: number;
    /** Обработчик изменения страницы. */
    onChange: (pageNumber: number) => void;
}

/** Компонент пагинации. */
export function Pagination ({ availablePages, onChange }: IProps): React.JSX.Element {
    const [currentPage, setCurrentPage] = useState(0);

    /** Обработчик нажатия на номер страницы. */
    const handleClick = (pageIndex: number) => (): void => {
        setCurrentPage(pageIndex);
        onChange(pageIndex)
    }

    return (
        <div className={styles.paginationContainer}>
            {map(Array.from({ length: availablePages }, (_, index) => (
                <Button 
                    key={`pagination-button-${index}`}
                    type={EButtonType.LINK}
                    additionalClassName={currentPage === index ? styles.activeButton : undefined}
                    onClick={handleClick(index)}
                >
                    {index + 1}
                </Button>
            )))}
        </div>
    )
}