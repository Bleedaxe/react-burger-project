import * as React from 'react';

import style from './Layout.module.css'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Toolbar from '../navigation/Toolbar/Toolbar'
import SideDrawer from '../navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    SideDrawerChangeHandler() {
        this.setState((prevState) => {
            return { showSideDrawer: !(prevState as {showSideDrawer: boolean}).showSideDrawer }
        })
    }

    SideDrawerCloseHandler() {
        this.setState({ showSideDrawer:false })
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    action={this.SideDrawerChangeHandler.bind(this)} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    cancel={this.SideDrawerCloseHandler.bind(this)}/>
                <main className={style.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;