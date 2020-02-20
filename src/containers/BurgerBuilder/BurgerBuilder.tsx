import * as React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerIngredients from '../../common/contracts/BurgerIngredients'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { RouteComponentProps } from 'react-router-dom';

const INGREDIENT_PRICES: BurgerIngredients = {
    salad: 0.5,
    cheese: 0.9,
    meat: 1.3,
    bacon: 0.7
}

export function getBurgerPrice(burger?: BurgerIngredients) {
    let price = 4
    if(burger) {
        (Object.keys(burger) as Array<keyof BurgerIngredients>).forEach(key => {
            price += burger[key] * INGREDIENT_PRICES[key];
        });
    }
    return price;
}

interface BurgerBuilderProps extends RouteComponentProps { }
interface BurgerBuilderState {
    ingredients?: BurgerIngredients;
    purchasable: boolean;
    purchasing: boolean;
    isLoading: boolean;
    hasError: boolean;
}

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {

    constructor(props: BurgerBuilderProps){
        super(props);

        this.state = {
            purchasable: false,
            purchasing: false,
            isLoading: false,
            hasError: false
        }
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/ingredients.json');
            this.setState({ ingredients: response.data })
        } catch (error) {
            this.setState({ hasError: true })
        }
    }

    updatePurchaseState() {
        if (this.state.ingredients) {
            const ingredients = { ...this.state.ingredients };
            const purchasable = (Object.keys(ingredients) as Array<keyof BurgerIngredients>)
                .map(key => ingredients[key])
                .reduce((prev, curr) => prev + curr) > 0;
            this.setState({ purchasable })
        }
    }

    increaseIngredient(name: keyof BurgerIngredients) {
        if (this.state.ingredients) {
            const result = this.state.ingredients
            const value = result[name] + 1;
            result[name] = value;
            // const newPrice = this.state.totalPrice + INGREDIENT_PRICES[name];

            this.setState({
                ingredients: result,
                // totalPrice: newPrice
            }, this.updatePurchaseState);
        }
    }

    decreaseIngredient(name: keyof BurgerIngredients) {
        if(this.state.ingredients){
            const result = this.state.ingredients;
            const value = result[name] - 1;
    
            if (value < 0) {
                return;
            }
    
            result[name] = value;
    
            // const newPrice = this.state.totalPrice - INGREDIENT_PRICES[name];
            this.setState({
                ingredients: result,
                // totalPrice: newPrice
            }, this.updatePurchaseState);
        }
    }

    purchaseHandler() {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler() {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler() {
        if(this.state.ingredients) {
            const ingredients = {...this.state.ingredients};
            const search = (Object.keys(ingredients) as Array<keyof typeof ingredients>)
                .map(key => `${key}=${ingredients[key]}`).join('&');

            this.props.history.push({
                pathname: '/checkout',
                search
            });
        }
    }

    render() {
        let orderSummary = <Spinner />;

        let burger = this.state.hasError ? <p>Ingredients can't be loaded!</p> : <Spinner />
        if (this.state.ingredients) {
            burger =
                <Aux>
                    <Burger
                        ingredients={this.state.ingredients} />
                    <BuildControls
                        purchasable={this.state.purchasable}
                        price={getBurgerPrice(this.state.ingredients)}
                        ingredients={this.state.ingredients}
                        increaseIngredient={this.increaseIngredient.bind(this)}
                        decreaseIngredient={this.decreaseIngredient.bind(this)}
                        order={this.purchaseHandler.bind(this)} />
                </Aux>;
            if (!this.state.isLoading) {
                orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    cancel={this.purchaseCancelHandler.bind(this)}
                    continue={this.purchaseContinueHandler.bind(this)}
                    totalPrice={getBurgerPrice(this.state.ingredients)} />;
            }
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    cancel={this.purchaseCancelHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
