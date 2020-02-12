import * as React from 'react';
import styles from './Order.module.css';

import BurgerIngredients from '../../common/contracts/BurgerIngredients';

export interface OrderProps {
    ingredients: BurgerIngredients;
    price: number;
}

export default (props: OrderProps) => {
    const ingredients = (Object.keys(props.ingredients) as Array<keyof typeof props.ingredients>)
        .map((key, index) => (
            <span 
                key={index}
                className={styles.Ingredient}>
                    {key} ({props.ingredients[key]})
            </span>
        ));

    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}