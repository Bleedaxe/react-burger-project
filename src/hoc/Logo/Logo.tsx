import * as React from 'react'

import img from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css'

const logo = () => (
    <div className={styles.Logo}>
        <img src={img} alt="MyBurger" />
    </div>
);

export default logo;