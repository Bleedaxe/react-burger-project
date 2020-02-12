import * as React from 'react';

import axios from '../../../axios-orders';

import styles from './ContactData.module.css';

import BurgerIngredients from '../../../common/contracts/BurgerIngredients';
import Button from '../../../components/UI/Button/Button';
import { AxiosResponse } from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

interface ContactDataProps {
    ingredients: BurgerIngredients;
    price: number;
    afterOrderHandler: () => void;
}

interface ContactDataState {
    customer: {
        name: string;
        email: string;
        address: {
            street: string;
            postalCode: string;
        }
    }
    loading: boolean;
}

class ContactData extends React.Component<ContactDataProps, ContactDataState> {

    constructor(props:ContactDataProps) {
        super(props);

        this.state = {
            customer: {
                name: '',
                email: '',
                address: {
                    street: '',
                    postalCode: ''
                }
            },
            loading: false
        }
    }

    onChangeHandler(changeState: (state: ContactDataState) => void) {
        const state = {...this.state};
        changeState(state);
        this.setState(state);
    }

    formSubmitHandler(event: React.MouseEvent) {
        event.preventDefault();
        this.setState({loading: true})
        axios.post('/orders.json', {
            customer: this.state.customer,
            deliveryMethod: 'fastest',
            ingredients: this.props.ingredients,
            price: this.props.price
        }).then((res: AxiosResponse) => {
            console.log(res)
            this.setState({loading:false}, this.props.afterOrderHandler);
        });
    }

    render() {
        let form = (
                <form>
                    <input 
                        className={styles.Input} 
                        type="text" name="name"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeHandler((state: ContactDataState) => state.customer.name = event.target.value)}
                        value={this.state.customer.name}
                        placeholder="Your name" />
                    <input 
                        className={styles.Input}
                        type="email"
                        name="email"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeHandler((state: ContactDataState) => state.customer.email = event.target.value)}
                        value={this.state.customer.email}
                        placeholder="Your Mail" />
                    <input
                        className={styles.Input}
                        type="text"
                        name="street"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeHandler((state: ContactDataState) => state.customer.address.street = event.target.value)}
                        value={this.state.customer.address.street}
                        placeholder="Street" />
                    <input
                        className={styles.Input}
                        type="text"
                        name="postal"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeHandler((state: ContactDataState) => state.customer.address.postalCode = event.target.value)}
                        value={this.state.customer.address.postalCode}
                        placeholder="Postal Code" />
                    <Button 
                        btnType="Success"
                        clicked={this.formSubmitHandler.bind(this)}>ORDER</Button>
                </form>
        );

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;