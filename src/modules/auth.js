import React, {Component, Fragment} from 'react';
import '../allStyle.less';
import {connect} from "react-redux";
import './auth.less'
import {Redirect} from "react-router-dom";


class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    render() {
        let redirectTrue = this.state.redirect;
        return (
            Array.isArray(this.props.store.Auth) ?
                <div className={'auth'}>
                    <input type="text" id={'login'}/>
                    <input type="password" id={'password'}/>
                    <button onClick={() => {
                        this.authorization()
                    }}>Авторизоваться
                    </button>
                </div> :

                <div className={'auth'}>
                    {redirectTrue ? <Redirect from={"/dist/auth/"} to={`/dist/basket`}/> : null}
                    {redirectTrue = false}
                    <p>Вы в авторизированы</p>
                    <button onClick={this.exitAuth}>Выйти</button>
                </div>
        )
    }

    componentDidMount() {

    }

    authorization = () => {
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        let user = this.props.store.Auth.find((item) => (
            (item.login.toLowerCase() === login.toLowerCase() && item.pass === password)
        ));
        if (user !== undefined) {
            console.log(user);
            this.props.dispatch({
                type: "ADD_AUTH_COOKIE",
                item: user
            })
        } else {
            document.getElementById('login').value = 'Неверные данные';
            document.getElementById('password').value = '';
        }
        this.setState({
            redirect: true
        });
    };

    exitAuth = () => {
        document.cookie = `${this.props.store.Auth.login}=; max-age=-1`;
        fetch('/data/auth.json')
            .then(data => data.json())
            .then(items => {
                this.props.dispatch({
                    type: "ADD_AUTH",
                    item: items
                })
            });
    }
}


const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Auth)