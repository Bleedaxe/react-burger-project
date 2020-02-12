import * as React from 'react';

import styles from './SideDrawer.module.css';

import Logo from '../../../hoc/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (props: {
    open: boolean;
    cancel: () => void;
}) => {
    const attachedClasses = [styles.SideDrawer, props.open ? styles.Open : styles.Closed]
    return (
        <Aux>
            <Backdrop 
                show={props.open}
                cancel={props.cancel}/>
            <div className={attachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;