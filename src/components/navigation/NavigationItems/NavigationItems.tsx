import * as React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem
            exact
            link="/">Burger Builder</NavigationItem>
        <NavigationItem
            link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;