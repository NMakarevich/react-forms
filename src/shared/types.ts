import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IRoute {
  getLink: (id?: string) => string;
  pathname: string;
}

export interface IRoutes {
  [route: string]: IRoute;
}

export interface IForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  picture: string;
  country: string;
  acceptTerms: boolean;
}

export interface InputFieldProps extends React.ComponentProps<'input'> {
  register?: UseFormRegisterReturn;
  label?: string;
  error?: string;
  datalist?: string[];
}

export interface GroupFieldProps {
  title: string;
  fields: InputFieldProps[];
  error?: string;
}
