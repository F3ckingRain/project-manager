import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"
import styles from './Styles.module.scss'
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { isAuthSelector } from "Redux/Settings/Selectors";
import { LogOutIcon } from 'lucide-react'
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { logOutAction } from "Modules/Auth/Redux/Response/Actions";
import logoPath from 'Common/Assets/CompanyLogo.jpg'
import { useEffect } from "react";

/** Шапка приложения. */
export function Header (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const isAuth = useAppSelector(isAuthSelector);
    const { t, i18n } = useTranslation();

    // Динамическое изменение заголовка страницы.
    useEffect(() => {
        window.document.title = t('Global.projectTitle');
    }, [i18n.language, t])

    /**
     * Обработчик изменения языка приложения.
     * 
     * @param lang Язык.
     */
    const handleChangeLang = async (lang: string) => {
        await i18n.changeLanguage(lang);
    }

    /** Обработчик выхода из сессии. */
    const handleLogOut = (): void => {
        dispatch(logOutAction()).unwrap()
            .then(() => {
                localStorage.removeItem('token');

                dispatch(changeIsAuthAction(false));

                navigate('/')
            })
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__main}>
                <img src={logoPath} className={styles.header__logo}/>

                <div className={styles.header__title}>{t('Global.projectTitle')}</div>
            </div>

            <div className={styles.languages}>
                <button 
                    className={styles.languages__button}
                    onClick={(): Promise<void> => handleChangeLang('ru')}
                >
                    <span className="fi fi-ru"/>
                </button>

                <button 
                    className={styles.languages__button}
                    onClick={(): Promise<void> => handleChangeLang('en')}
                >
                    <span className="fi fi-us"/>
                </button>
            </div>

            {isAuth ? (
                <button className={styles.logOut} onClick={handleLogOut}>
                    <LogOutIcon />
                </button>
            ) : null}
        </header>
    )
}