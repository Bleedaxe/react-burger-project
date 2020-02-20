import * as React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import BurgerIngredients from "../../../common/contracts/BurgerIngredients";
import Button from "../../UI/Button/Button";

interface OrderSummaryProps {
  ingredients: BurgerIngredients;
  cancel: () => void;
  continue: () => void;
  totalPrice: number;
}

const orderSummary = (props: OrderSummaryProps) => {
  let ingredientSummary = (Object.keys(props.ingredients) as Array<
    keyof BurgerIngredients
  >).map(key => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
      {props.ingredients![key]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" onClick={props.cancel}>
        CANCEL
      </Button>
      <Button btnType="Success" onClick={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
