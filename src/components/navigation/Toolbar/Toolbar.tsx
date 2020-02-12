import * as React from 'react'
import styles from './Toolbar.module.css'

import Logo from '../../../hoc/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuExpander from '../SideDrawer/MenuExpander/MenuExpander'


const toolbar = (props: any) => {
    return (
        <header className={styles.Toolbar}>
            <MenuExpander 
                action={props.action} />
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;