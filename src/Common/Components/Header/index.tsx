import { useNavigate } from "react-router-dom"

/** Шапка приложения. */
export function Header (): React.JSX.Element {
    const navigate = useNavigate()

    /** Обработчик нажатия на кнопку. */
    const handleClick = (): void => {
        navigate('..')
    }

    return (
        <header>
            <button onClick={handleClick}>
                goback
            </button>
        </header>
    )
}