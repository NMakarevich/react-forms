import { countries } from '@shared/helpers/constants.ts';
import * as yup from 'yup';
import { mixed } from 'yup';

const MAX_FILE_SIZE = 1024 * 1024; //1MB

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name')
    .test(
      'isCapitalize',
      'The name should be starts with uppercase letter',
      (value) => !!value && value[0] === value[0].toUpperCase()
    ),
  age: yup
    .number()
    .typeError('Please enter age as number')
    .min(0, 'Age must be a positive integer')
    .required('Please enter age'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Please enter email'),
  password: yup
    .string()
    .matches(/(?=.*\d)/g, 'Should contain at least one number')
    .matches(/(?=.*[A-Z|А-Я])/g, 'Should contain at least one uppercase letter')
    .matches(/(?=.*[a-z|а-я])/g, 'Should contain at least one lowercase letter')
    .matches(
      /(?=.*[@$!%*?&])/g,
      'Should contain at least one special character'
    )
    .required('Please enter password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: yup.string<'male' | 'female'>().required('Please select gender'),
  picture: mixed<FileList>()
    .test(
      'fileNotSelected',
      'Please select picture',
      (value) => !!value?.length
    )
    .test('fileSize', 'File size is too large', (value) => {
      if (!value || !value.length) return false;
      return value[0].size <= MAX_FILE_SIZE;
    })
    .test({
      message: 'Please provide a supported file type: png, jpg, jpeg',
      test: (value) => {
        if (!value || !value.length) return false;
        return ['image/png', 'image/jpeg'].includes(value[0].type);
      },
    }),
  country: yup
    .string()
    .required('Please select country')
    .oneOf(countries, 'Select country from list'),
  acceptTerms: yup.boolean().required().isTrue('Please agree accept terms'),
});
