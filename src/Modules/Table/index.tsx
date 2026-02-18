import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PROJECTS_PATH } from "./Projects/Consts";
import { CASES_PATH } from "./Cases/Consts";
import { Cases } from "./Cases";
import { Projects } from "./Projects";
import { TABLE_PAGE_PATH } from "./Consts";
import { useTranslation } from "react-i18next";
import styles from './Styles.module.scss'
import cx from 'classnames';
import { TestRuns } from "./TestRuns";
import { TEST_RUNS_PATH } from "./TestRuns/Consts";

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
                        {t('Table.Projects.title')}
                </NavLink>

                <NavLink 
                    to={`/${TABLE_PAGE_PATH}/${CASES_PATH}`}
                    className={({ isActive }) => isActive ? cx(styles.link, styles.link__active) : styles.link}
                >
                        {t('Table.Cases.title')}
                </NavLink>

                <NavLink 
                    to={`/${TABLE_PAGE_PATH}/${TEST_RUNS_PATH}`}
                    className={({ isActive }) => isActive ? cx(styles.link, styles.link__active) : styles.link}
                >
                        {t('Table.TestRuns.title')}
                </NavLink>
           </nav>

            <Routes>
                <Route element={<Projects />} path={`${PROJECTS_PATH}/*`} />

                <Route element={<Cases />} path={`${CASES_PATH}/*`} />

                <Route element={<TestRuns />} path={`${TEST_RUNS_PATH}/*`} />
            </Routes>

            {pathname === `/${TABLE_PAGE_PATH}` ? (
                <Navigate to={`/${TABLE_PAGE_PATH}/${PROJECTS_PATH}`} />
            ) : null}
        </>
    )
}