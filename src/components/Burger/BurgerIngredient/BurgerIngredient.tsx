import * as React from 'react';
import style from './BurgerIngredient.module.css';

interface IntegrientProps {
    type: String
}

const burgerIngredient = (props: IntegrientProps) => {
    switch (props.type) {
        case 'bread-bottom':
            return <div className={style.BreadBottom}></div>
        case 'bread-top':
            return (
                <div className={style.BreadTop}>
                    <div className={style.Seeds1} />
                    <div className={style.Seeds2} />
                </div>
            );
        case 'meat':
            return <div className={style.Meat}></div>
        case 'cheese':
            return <div className={style.Cheese}></div>
        case 'salad':
            return <div className={style.Salad}></div>
        case 'bacon':
            return <div className={style.Bacon}></div>
        default: return null;
    }
};

export default burgerIngredient;