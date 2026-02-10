import { useState } from 'react';
import styles from './App.module.scss';
import data from './Mocks/projects.json';
import { Layout, Table, LogIn } from 'lucide-react';

/** Корневой файл приложения. */
export function App (): React.JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('projects');

  if (!isAuth) return (
    <div className={styles.authPage}>
      <div className={styles.card}>
        <h2>TMS Prototype</h2>
        <input type="text" placeholder="Username" />
        <button onClick={() => setIsAuth(true)}>
          <LogIn />
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div onClick={() => setCurrentPage('projects')}><Layout /> Projects</div>
        <div onClick={() => setCurrentPage('cases')}><Table /> Repository</div>
      </nav>
      <main className={styles.content}>
        <h1>{currentPage === 'projects' ? 'Project List' : 'Test Repository'}</h1>
        <div className={styles.grid}>
          {currentPage === 'projects' ? (
            data.projects.map(p => (
              <div key={p.id} className={styles.itemCard}>
                <h3>{p.name}</h3>
                <p>Client: {p.client}</p>
              </div>
            ))
          ) : (
            data.cases.map(c => (
              <div key={c.id} className={styles.caseRow}>
                <span>{c.id}</span> <strong>{c.title}</strong>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
