import * as React from 'react';

import axios from '../../../axios-orders';

import styles from './ContactData.module.css';

import BurgerIngredients from '../../../common/contracts/BurgerIngredients';
import Button from '../../../components/UI/Button/Button';
import { AxiosResponse } from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Input from '../../../components/UI/Input/Input'

interface ContactDataProps {
    ingredients: BurgerIngredients;
    price: number;
    afterOrderHandler: () => void;
}
interface Element {
    label: string;
    elementType: keyof typeof Input;
    value: string;
}
interface InputElement extends Element{
    elementConfig: {
        type: string;
        placeholder: string;
    }
}
interface SelectElement extends Element {
    elementConfig: {
        options: Array<{
            value: string;
            displayValue: string;
        }>
    }
}

interface ContactDataState {
    orderForm: {
        name: InputElement;
        email: InputElement;
        street: InputElement;
        postalCode: InputElement;
        country: InputElement;
        deliveryMethod: SelectElement;
    }
    loading: boolean;
}

class ContactData extends React.Component<ContactDataProps, ContactDataState> {

    constructor(props:ContactDataProps) {
        super(props);

        this.state = {
            orderForm: {

                name: {
                    label: 'Name',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value: ''
                },
                email: {
                    label: 'Mail',
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Mail'
                    },
                    value: ''
                },
                street: {
                    label: 'Street',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your street'
                    },
                    value: ''
                },
                postalCode: {
                    label: 'Postal code',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your postal code'
                    },
                    value: ''
                },
                country: {
                    label: 'Country',
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'country'
                    },
                    value: ''
                },
                deliveryMethod: {
                    label: 'Delivery method',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'cheapest', displayValue: 'Cheapest'},
                            {value: 'fastest', displayValue: 'Fastest'}
                        ]
                    },
                    value: 'cheapest'
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
        const customer = {
            //TODO: Create customer
        }
        axios.post('/orders.json', {
            customer,
            deliveryMethod: 'fastest',
            ingredients: this.props.ingredients,
            price: this.props.price
        }).then((res: AxiosResponse) => {
            console.log(res)
            this.setState({loading:false}, this.props.afterOrderHandler);
        });
    }

    toInputElement(element: InputElement | SelectElement, key: number) {
        const Type = Input[element.elementType];
        //TODO: Should implement onChange event
        return <Type
            key={key}
            label={element.label}
            {...element.elementConfig}
            value={element.value} />
    }

    render() {
        const formElements = Object.values({...this.state.orderForm})
            .map(this.toInputElement);
        let form = (
                <form>
                    {formElements}
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