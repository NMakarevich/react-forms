import { FormField, GroupFieldProps } from '@shared/index';

import styles from './form-group.module.scss';

export function FormGroup(props: GroupFieldProps) {
  return (
    <div className={`${styles.formGroup}`}>
      <p className={styles.formGroupTitle}>{props.title}</p>
      <div className={styles.formGroupFields}>
        {props.fields.map((field) => (
          <FormField key={field.id} {...field} />
        ))}
      </div>
      <span className={styles.formGroupError}>{props.error}</span>
    </div>
  );
}
