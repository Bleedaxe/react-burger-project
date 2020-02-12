import * as React from 'react';

import axios from '../../axios-orders'

import BurgerIngredients from '../../common/contracts/BurgerIngredients'
import { getBurgerPrice } from '../BurgerBuilder/BurgerBuilder'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, RouteComponentProps } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ContactData from './ContactData/ContactData'

interface CheckoutState {
    ingredients?: BurgerIngredients;
}

interface CheckoutProps extends RouteComponentProps { }

class Checkout extends React.Component<CheckoutProps, CheckoutState> {
    constructor(props: CheckoutProps) {
        super(props);

        this.state = { }
    }
    async componentDidMount() {
        try {
            const response = await axios.get('/ingredients.json');
            const ingredients = {...response.data};
            const ingredientKeys = Object.keys(response.data);

            new URLSearchParams(this.props.location.search)
                .forEach((value: string, key: string) => {
                    if(ingredientKeys.includes(key)){
                        ingredients[key as keyof typeof ingredients] = +value
                    }
            })

            this.setState({ ingredients: ingredients })

        } catch (error) {
            console.error('[Checkout]:', error);
        }
    }

    checkoutCancelHandler () {
        this.props.history.goBack();
    }

    checkoutContinueHandler () {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                {this.state.ingredients 
                    ? <Aux>
                        <CheckoutSummary 
                            ingredients={this.state.ingredients}
                            cancel={this.checkoutCancelHandler.bind(this)}
                            continue={this.checkoutContinueHandler.bind(this)} />
                        <Route 
                            path={`${this.props.match.path}/contact-data`}
                            render={() => <ContactData 
                                ingredients={this.state.ingredients!}
                                price={getBurgerPrice(this.state.ingredients)}
                                afterOrderHandler={() => this.props.history.push('/')}/>}/>
                      </Aux>
                    : <Spinner />}
                
            </div>
        );
    }
}

export default withErrorHandler(Checkout, axios);