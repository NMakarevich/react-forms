import { useState } from 'react';
import { InputFieldProps } from '@shared/index';

import styles from './form-field.module.scss';

export function FormField(props: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  if (props.type === 'password') {
    return (
      <div className={styles.formField}>
        <label htmlFor={props.id}>{props.label}</label>
        <div className={styles.formFieldPassword}>
          <input
            {...props}
            type={showPassword ? 'text' : 'password'}
            {...props.register}
          />
          <button
            className={`${styles.formFieldPasswordButton} ${
              showPassword
                ? styles.formFieldPasswordShow
                : styles.formFieldPasswordHide
            }`}
            type={'button'}
            onClick={handleShowPassword}
          ></button>
        </div>
        {props.component}
        <span className={styles.formFieldError}>{props.error}</span>
      </div>
    );
  }

  if (props.type === 'checkbox') {
    return (
      <div className={styles.formField}>
        <div className={styles.formFieldCheckbox}>
          <input {...props} {...props.register} />
          <label htmlFor={props.id}>{props.label}</label>
        </div>
        {props.component}
        <span className={styles.formFieldError}>{props.error}</span>
      </div>
    );
  }

  return (
    <div className={styles.formField}>
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
      {props.component}
      <span className={styles.formFieldError}>{props.error}</span>
    </div>
  );
}
