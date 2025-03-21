import { IRoutes } from '@shared/types.ts';

export const routes: IRoutes = {
  main: {
    getLink: () => '/',
    pathname: '/',
  },
  uncontrolled: {
    getLink: () => '/uncontrolled',
    pathname: '/uncontrolled',
  },
  controlled: {
    getLink: () => '/controlled',
    pathname: '/controlled',
  },
  notFound: {
    getLink: () => '*',
    pathname: '*',
  },
};
