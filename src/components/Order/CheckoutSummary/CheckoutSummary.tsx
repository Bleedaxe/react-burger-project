import * as React from 'react';

import styles from './CheckoutSummary.module.css';

import BurgerIngredients from '../../../common/contracts/BurgerIngredients'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props: {
    ingredients: BurgerIngredients
    cancel: () => void;
    continue: () => void;
}) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                onClick={props.cancel}>CANCEL</Button>
            <Button 
                btnType="Success"
                onClick={props.continue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;