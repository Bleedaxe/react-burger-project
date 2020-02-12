import * as React from 'react';
import style from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import BurgerIngredients from '../../common/contracts/BurgerIngredients'

const burger = (props: {
    ingredients: BurgerIngredients;
}) => {
    const transformedIngredients = (Object.keys(props.ingredients) as Array<keyof BurgerIngredients>).flatMap(key => {
        return [...Array(props.ingredients[key])].map((_, i) =>
            <BurgerIngredient
                key={key + i}
                type={key} />);
    })
    return (
        <div className={style.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients.length === 0 ? <div>{"<< Empty >>"}</div> : transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;