import { ReactElement } from 'react';
import { NavLink } from 'react-router';

import { routes } from '../index';

import styles from './nav-bar.module.scss';

export function NavBar(): ReactElement {
  const navLinks: { path: string; title: string }[] = [
    { path: routes.main.getLink(), title: 'Home' },
    { path: routes.uncontrolled.getLink(), title: 'Uncontrolled form' },
    { path: routes.controlled.getLink(), title: 'Controlled form' },
  ];

  return (
    <nav className={styles.navBar}>
      {navLinks.map((link) => (
        <NavLink key={link.path} className={styles.navBarLink} to={link.path}>
          {link.title}
        </NavLink>
      ))}
    </nav>
  );
}
