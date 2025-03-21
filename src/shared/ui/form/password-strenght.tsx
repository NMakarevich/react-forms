import { ReactNode } from 'react';

import styles from './password-strength.module.scss';

export function PasswordStrength({
  password,
}: {
  password: string;
}): ReactNode {
  function testPasswordStrength(password: string) {
    if (!password) return 0;

    const tests = [
      /(?=.*\d)/g,
      /(?=.*[A-Z])/g,
      /(?=.*[a-z])/g,
      /(?=.*[@$!%*?&])/g,
    ];
    const results = tests.map((test) => test.test(password));
    return results.filter((result) => result).length;
  }

  const classes = ['empty', 'low', 'low', 'medium', 'high'];

  return (
    <div
      className={`${styles.passwordStrength} ${styles[classes[testPasswordStrength(password)]]}`}
    >
      <div className={styles.strength}></div>
      <div className={styles.strength}></div>
      <div className={styles.strength}></div>
    </div>
  );
}
