import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"
import styles from './Styles.module.scss'
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { userInfoSelector } from "Redux/User/Selectors";
import { LogOutIcon } from 'lucide-react'
import { changeIsAuthAction } from "Redux/User/Actions";
import { logOutAction } from "Modules/Auth/Redux/Response/Actions";
import logoPath from 'Common/Assets/CompanyLogo.jpg'
import { useEffect } from "react";

/** Шапка приложения. */
export function Header (): React.JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { isAuth, login, logo } = useAppSelector(userInfoSelector);
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

            <div className={styles.header__main}>
                <img src={logoPath} className={styles.header__logo}/>

                <div className={styles.header__title}>{t('Global.projectTitle')}</div>
            </div>

            <div className={styles.userInfo}>
                <div className={styles.userInfo__login}>
                    {login}
                </div>

                {logo ? (
                    <img className={styles.userInfo__logo} src={logo} alt='' />
                ) : null}
            </div>

            {isAuth ? (
                <button className={styles.logOut} onClick={handleLogOut}>
                    <LogOutIcon />
                </button>
            ) : null}
        </header>
    )
}