import React, {Component, Fragment} from 'react';
import Header from './modules/header';
import Footer from './modules/footer';
import Main from './modules/main';
import Catalog from './modules/catalog';
import Product from './modules/product';
import Basket from './modules/basket'
import Auth from './modules/auth'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { Redirect } from 'react-router'
import './reset.less';
import './allStyle.less';
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:false
        }
    }

    render() {
        console.log(this.props.store.Auth);
        return (
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/dist/" component={Main}/>
                    <Route exact path="/dist/catalog/" component={Catalog}/>
                    <Route path="/dist/catalog/:id" component={Product}/>
                    <Route path="/dist/basket/" component={Basket}/>
                    <Route path="/dist/auth/" component={Auth}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        )
    }


    componentDidMount() {
        fetch('https://antonlabkovich.github.io/ReactExam/data/dataCatalog.json')
            .then(data => data.json())
            .then(items => {
                this.props.dispatch({
                    type: "ADD_ITEM",
                    item: items
                })
            });

        setTimeout(() => {
            localStorage.removeItem('loglevel:webpack-dev-server');
        }, 800);


        let userTrueCookie = '';
        let authUser = document.cookie.split(';');
        Array.isArray(this.props.store.Auth) || this.props.store.Auth.length === 0 ?
            fetch('https://antonlabkovich.github.io/ReactExam/data/auth.json')
                .then(data => data.json())
                .then(items => {
                    for (let i = 0; i < authUser.length; i++) {
                        let oneUserCookie = authUser[i].split('=');
                        userTrueCookie = items.find(item => oneUserCookie[0] === item.login && oneUserCookie[1] === item.pass);
                        if (userTrueCookie === undefined) {
                            this.props.dispatch({
                                type: "ADD_AUTH",
                                item: items
                            });
                        } else {
                            this.props.dispatch({
                                type: "ADD_AUTH",
                                item: userTrueCookie
                            })
                        }

                    }
                    console.log('элемент из куки', userTrueCookie);

                }) : null;
    }

}

const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(App)