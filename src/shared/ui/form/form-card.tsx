import { IForm } from '@shared/index';

import styles from './form-card.module.scss';

interface Props {
  form: IForm;
}

export function FormCard({ form }: Props) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={form.picture?.toString()} alt="" />
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>Name: </span>
          <span className={styles.listItemValue}>{form.name}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>Age: </span>
          <span className={styles.listItemValue}>{form.age}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>email: </span>
          <span className={styles.listItemValue}>{form.email}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>Password: </span>
          <span className={styles.listItemValue}>{form.password}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>Gender: </span>
          <span className={styles.listItemValue}>{form.gender}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.listItemLabel}>Country: </span>
          <span className={styles.listItemValue}>{form.country}</span>
        </li>
      </ul>
    </div>
  );
}
