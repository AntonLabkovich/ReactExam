import React, {Component, Fragment} from 'react';
import Menu from './navigation/menu';
import './header.less'
import {Link} from "react-router-dom";



export default class Header extends Component{
    constructor(props){
        super(props);

    }

    render() {
        return(

            <div className={'containerHedaer'}>
                <Link className={'authButton'} to={"/dist/auth/"}><button className={'buttonAuth'}>Authorization</button></Link>
                <Menu/>
            </div>
        )
    }

}