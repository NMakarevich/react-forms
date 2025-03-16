import { ChangeEvent, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormField,
  FormGroup,
  GroupFieldProps,
  InputFieldProps,
  PasswordStrength,
  schema,
  selectCountries,
  useAppDispatch,
  useAppSelector,
} from '@shared/index';
import { addControlledForm } from '@shared/store/forms-slice.ts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import styles from '../../../shared/ui/form/form.module.scss';

export function ControlledForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const [password, setPassword] = useState('');
  const [pictureName, setPictureName] = useState('');

  const onSubmit = handleSubmit((data) => {
    const reader = new FileReader();
    if (data.picture) {
      reader.readAsDataURL(data.picture[0]);
      reader.onloadend = () => {
        dispatch(
          addControlledForm({
            ...data,
            picture: reader.result ? reader.result.toString() : '',
          })
        );
        navigate('/');
      };
    }
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleSelectPicture(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) setPictureName(file.name);
    else setPictureName('');
  }

  const form: (GroupFieldProps | InputFieldProps)[] = [
    {
      error: errors.name?.message,
      label: 'Name',
      name: 'name',
      type: 'text',
      id: 'name',
      register: register('name'),
    },
    {
      error: errors.age?.message,
      label: 'Age',
      name: 'age',
      type: 'number',
      id: 'age',
      register: register('age'),
    },
    {
      error: errors.email?.message,
      label: 'Email',
      name: 'email',
      type: 'email',
      id: 'email',
      register: register('email'),
    },
    {
      error: errors.password?.message,
      label: 'Password',
      name: 'password',
      type: 'password',
      id: 'password',
      register: register('password', { onChange: handleChange }),
      component: <PasswordStrength password={password} />,
    },
    {
      error: errors.confirmPassword?.message,
      label: 'Confirm password',
      name: 'confirmPassword',
      type: 'password',
      id: 'confirmPassword',
      register: register('confirmPassword'),
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
          register: register('gender'),
        },
        {
          label: 'Female',
          name: 'gender',
          value: 'female',
          id: 'female',
          type: 'radio',
          register: register('gender'),
        },
      ],
      error: errors.gender?.message,
    },
    {
      error: errors.picture?.message,
      label: pictureName ? `File: ${pictureName}` : 'Select picture',
      type: 'file',
      id: 'picture',
      register: register('picture', { onChange: handleSelectPicture }),
    },
    {
      error: errors.country?.message,
      label: 'Country',
      list: 'country-list',
      datalist: countries,
      id: 'country',
      register: register('country'),
    },
    {
      error: errors.acceptTerms?.message,
      label: 'Accept terms',
      name: 'acceptTerms',
      type: 'checkbox',
      id: 'acceptTerms',
      register: register('acceptTerms'),
    },
  ];

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {form.map((item) => {
        if ('fields' in item)
          return (
            <FormGroup
              key={item.title}
              title={item.title}
              fields={item.fields}
            />
          );
        else return <FormField key={item.id} {...item} />;
      })}
      <button className={styles.formSubmit} type={'submit'} disabled={!isValid}>
        Submit form
      </button>
    </form>
  );
}
