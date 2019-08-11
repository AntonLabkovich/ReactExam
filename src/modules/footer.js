import React, {Component, Fragment} from 'react';
import Menu from './navigation/menu'
import '../allStyle.less'



export default class Footer extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className={'containerFooter'}>
                <Menu />
            </div>
        )
    }

}