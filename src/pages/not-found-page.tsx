import { ReactElement } from 'react';
import { Link } from 'react-router';

import styles from './not-found-page.module.scss';

function NotFoundPage(): ReactElement {
  return (
    <div className={styles.page}>
      <h2 className={styles.pageTitle}>Page is not found</h2>
      <Link className={styles.pageLink} to={'/'}>
        Back home
      </Link>
    </div>
  );
}

export default NotFoundPage;
