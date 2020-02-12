import * as React from 'react'
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

interface NavigationItemProps {
    link: string;
    exact?: boolean;
    children: any;
}

const navigationItem = (props: NavigationItemProps) => (
    <li className={styles.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={!!props.exact}
            activeClassName={styles.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;