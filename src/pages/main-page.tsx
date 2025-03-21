import { ReactElement } from 'react';
import {
  FormHistory,
  selectControlledForms,
  selectUncontrolledForms,
  useAppSelector,
} from '@shared/index';

import styles from './main-page.module.scss';

function MainPage(): ReactElement {
  const uncontrolledForms = useAppSelector(selectUncontrolledForms);
  const controlledForms = useAppSelector(selectControlledForms);

  return (
    <div className={styles.history}>
      <FormHistory forms={uncontrolledForms} title={'Uncontrolled forms'} />
      <FormHistory forms={controlledForms} title={'Controlled forms'} />
    </div>
  );
}

export default MainPage;
