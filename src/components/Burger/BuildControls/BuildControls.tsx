import * as React from 'react';
import BurgerIngredients from '../../../common/contracts/BurgerIngredients'
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

interface BuildControlsProps {
    ingredients: BurgerIngredients | null;
    increaseIngredient: (name: keyof BurgerIngredients) => void;
    decreaseIngredient: (name: keyof BurgerIngredients) => void;
    order: () => void;
    price: number;
    purchasable: boolean;
}

const buildControls = (props: BuildControlsProps) => {
    let buildControlElements = null;
    if(props.ingredients) {
        buildControlElements = (Object.keys(props.ingredients) as Array<keyof BurgerIngredients>)
            .map(key => <BuildControl 
                key={key}
                name={key}
                count={props.ingredients![key]}
                increase={() => props.increaseIngredient(key)}
                decrease={() => props.decreaseIngredient(key)} />);
    }
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {buildControlElements}
            <button 
                className={styles.OrderButton}
                onClick={props.order}
                disabled={!props.purchasable}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;