import * as React from 'react';

import axios from '../../axios-orders';

import styles from './Orders.module.css';

import Order, { OrderProps } from '../../components/Order/Order';
import { AxiosResponse } from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Auxiliary/Auxiliary';

interface OrdersProps {}
interface OrdersState {
    orders: Array<OrderProps>;
    loading: boolean;
}

export default class Orders extends React.Component<OrdersProps, OrdersState> {

    constructor(props: OrdersProps) {
        super(props);

        this.state = {
            orders: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('/orders.json').then((response: AxiosResponse) => {
            const orders = Object.values(response.data).map((resObj: any) => {
                return {
                    ingredients: resObj.ingredients,
                    price: resObj.price
                }
            })

            this.setState({orders, loading: false})
        })
    }

    render() {
        let orders = (
            <Aux>
                {this.state.orders
                    .map((order, index) => <Order key={index} {...order}/>)}
            </Aux>
        );
        if (this.state.loading) {
            orders = <Spinner />
        }
        return (
            <div className={styles.Orders}>
                {orders}
            </div>
        );
    }
} 