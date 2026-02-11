import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PROJECTS_PATH } from "./Projects/Path";
import { CASES_PATH } from "./Cases/Path";
import { Cases } from "./Cases";
import { Projects } from "./Projects";
import { TABLE_PAGE_PATH } from "./Consts";
import { useTranslation } from "react-i18next";
import styles from './Styles.module.scss'
import cx from 'classnames';

/** Страница таблицы. */
export function TablePage (): React.JSX.Element {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    return (
        <>
           <nav className={styles.navbar}>
                <NavLink
                    to={`/${TABLE_PAGE_PATH}/${PROJECTS_PATH}`}
                    className={({ isActive }) => isActive ? cx(styles.link, styles.link__active) : styles.link}
                >
                        {t('projects')}
                </NavLink>

                <NavLink 
                    to={`/${TABLE_PAGE_PATH}/${CASES_PATH}`}
                    className={({ isActive }) => isActive ? cx(styles.link, styles.link__active) : styles.link}
                >
                        {t('cases')}
                </NavLink>
           </nav>

            <Routes>
                <Route element={<Projects />} path={PROJECTS_PATH} />

                <Route element={<Cases />} path={CASES_PATH} />
            </Routes>

            {pathname === `/${TABLE_PAGE_PATH}` ? (
                <Navigate to={`/${TABLE_PAGE_PATH}/${PROJECTS_PATH}`} />
            ) : null}
        </>
    )
}