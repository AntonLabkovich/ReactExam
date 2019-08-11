import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import './menu.less';
import {connect} from "react-redux";


class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <nav className={'navigation'}>
                <ul>
                    <li>
                        <Link to={`/dist/`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dist/catalog`}>
                            Catalog
                        </Link>
                    </li>
                    <li>
                        <Link to={`/dist/basket`}>
                            Basket
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }

}

const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Menu)