import { InputFieldProps } from '@shared/index';

import styles from './form-field.module.scss';

export function FormField(props: InputFieldProps) {
  return (
    <div className={styles.formField}>
      {props.type === 'checkbox' ? (
        <div className={styles.formFieldCheckbox}>
          <input {...props} {...props.register} />
          <label htmlFor={props.id}>{props.label}</label>
        </div>
      ) : (
        <>
          <label htmlFor={props.id}>{props.label}</label>
          <input {...props} {...props.register} />
          {props.datalist && (
            <datalist id={props.list}>
              {props.datalist.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </datalist>
          )}
        </>
      )}
      <span className={styles.formFieldError}>{props.error}</span>
    </div>
  );
}
