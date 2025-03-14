import { FormEvent, useState } from 'react';
import {
  FormField,
  FormGroup,
  GroupFieldProps,
  IForm,
  InputFieldProps,
  schema,
  selectCountries,
  useAppDispatch,
  useAppSelector,
} from '@shared/index';
import { addUncontrolledForm } from '@shared/store/forms-slice.ts';
import { useNavigate } from 'react-router';
import { ValidationError } from 'yup';

import styles from '../../../shared/ui/form/form.module.scss';

export function UncontrolledForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const form: (GroupFieldProps | InputFieldProps)[] = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      id: 'name',
    },
    {
      label: 'Age',
      name: 'age',
      type: 'number',
      id: 'age',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      id: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      id: 'password',
    },
    {
      label: 'Confirm password',
      name: 'confirmPassword',
      type: 'password',
      id: 'confirmPassword',
    },
    {
      title: 'Gender',
      fields: [
        {
          label: 'Male',
          name: 'gender',
          value: 'male',
          id: 'male',
          type: 'radio',
        },
        {
          label: 'Female',
          name: 'gender',
          value: 'female',
          id: 'female',
          type: 'radio',
        },
      ],
    },
    {
      label: 'Select picture',
      type: 'file',
      id: 'picture',
    },
    {
      label: 'Country',
      list: 'country-list',
      datalist: countries,
      id: 'country',
    },
    {
      label: 'Accept terms',
      name: 'acceptTerms',
      type: 'checkbox',
      id: 'acceptTerms',
    },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { currentTarget } = event;

    const formData = new FormData(currentTarget);
    const data = {
      ...Array.from(formData.keys()).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            key === 'age'
              ? parseInt(formData.get(key) as string)
              : formData.get(key),
        }),
        {}
      ),
      acceptTerms: !!formData.get('acceptTerms'),
      picture: currentTarget.picture.files,
      country: currentTarget.country.value,
    };
    try {
      schema.validateSync(data, { abortEarly: false });
      const reader = new FileReader();
      if (data.picture) {
        reader.readAsDataURL(data.picture[0]);
        reader.onloadend = () => {
          dispatch(
            addUncontrolledForm({
              ...data,
              picture: reader.result ? reader.result.toString() : '',
            } as IForm)
          );
          navigate('/');
        };
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner.reduce(
          (acc: { [key: string]: string }, err) => {
            if (err.path) {
              if (!acc[err.path]) {
                acc[err.path] = err.message;
              }
            }
            return acc;
          },
          {}
        );
        setErrors(errors);
      }
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {form.map((item) => {
        if ('fields' in item)
          return (
            <FormGroup
              key={item.title}
              title={item.title}
              fields={item.fields}
              error={errors ? errors[item.fields[0].name as string] : ''}
            />
          );
        else
          return (
            <FormField
              key={item.id}
              {...item}
              error={errors ? errors[item.id as string] : ''}
            />
          );
      })}
      <button className={styles.formSubmit} type={'submit'}>
        Submit form
      </button>
    </form>
  );
}
