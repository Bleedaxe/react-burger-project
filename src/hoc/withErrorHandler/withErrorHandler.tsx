import * as React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default (WrappedComponent: any, axios: AxiosInstance) => {
    interface ErrorComponentProps { }

    interface ErrorComponentState {
        error: any | null;
        reqInterceptor: number;
        resInterceptor: number;
    }

    return class extends React.Component<ErrorComponentProps, ErrorComponentState> {
        
        constructor(props:ErrorComponentProps){
            super(props);

            const reqInterceptor = axios.interceptors.request.use((request: AxiosRequestConfig) => {
                this.setState({ error: null });
                return request;
            });

            const resInterceptor = axios.interceptors.response.use(res => res, (error: any) => {
                this.setState({ error });
            });

            this.state = {
                error: null,
                reqInterceptor,
                resInterceptor
            }
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.state.reqInterceptor);
            axios.interceptors.response.eject(this.state.resInterceptor);
        }

        errorConfirmedHandler() {
            this.setState({ error: null })
        }

        getMessage = (error: any) => {
            return error ? error.message : '';
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error !== null}
                        cancel={this.errorConfirmedHandler.bind(this)}>
                        {this.getMessage(this.state.error)}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}
