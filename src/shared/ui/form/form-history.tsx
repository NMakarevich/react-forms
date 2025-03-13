import { ReactElement } from 'react';
import { IForm } from '@shared/index';
import { FormCard } from '@shared/ui/form/form-card';

import styles from './form-history.module.scss';

interface Props {
  forms: IForm[];
  title: string;
}

export function FormHistory({ forms, title }: Props): ReactElement {
  return (
    <>
      <div className={styles.formHistory}>
        <h3 className={styles.formHistoryTitle}>{title}</h3>
        {!!forms.length &&
          forms.map((form, index) => <FormCard key={index} form={form} />)}
      </div>
    </>
  );
}
