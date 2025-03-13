import { ReactNode } from 'react';
import { store } from '@shared/store/store.ts';
import { NavBar } from '@shared/ui/nav-bar.tsx';
import { Provider } from 'react-redux';

import styles from './layout.module.scss';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavBar />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </Provider>
  );
}
