import React, {Component, Fragment} from 'react';
import '../allStyle.less';
import {connect} from "react-redux";
import './basket.less';
import {Link, Redirect} from "react-router-dom";

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log('auth',this.props.store.Auth);

        let fullPrice = 0;
        this.props.store.BasketItems.map((item) => (
            fullPrice += (parseFloat(item.price))
        ));
        console.log(this.props.store.BasketItems);
        return (
            !Array.isArray(this.props.store.Auth)?
            <div className={'container'}>
                {fullPrice === 0 ? <p>Basket is empty</p> : <p>Total price: {fullPrice}</p>}
                <div className={'basket'}>
                    {
                        this.props.store.BasketItems.map((item, i) => (
                            <div className={'catalogItem'} key={i}>
                                <Link to={`/dist/catalog/${item.id}`}>{item.title}</Link>
                                <div><img src={`${item.gallery}8hq`} alt=""/></div>
                                <p>{item.price}</p>
                                <button onClick={() => {
                                    this.removeItem(item.idBasket)
                                }}>Remove from basket
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>:<Redirect from={`/dist/basket`} to={"/dist/auth/"} />
        )
    }

    componentDidMount() {
        if (this.props.store.BasketItems.length !== localStorage.length) {
            let itemBasketFromStorage = [];
            for (let i = 1; i <= localStorage.length; i++) {
                itemBasketFromStorage.push(JSON.parse(localStorage.getItem(i)))
            }
            itemBasketFromStorage.map((item, i) => (
                item.idBasket = i + 1
            ));

            this.props.dispatch({
                type: 'ADD_ALL_BASKET_LOCALSTORAGE',
                items: itemBasketFromStorage
            })
        }
    }


    removeItem = (id) => {
        this.props.dispatch({
            type: "REMOVE_ITEM_BASKET",
            id: id,
            items: this.props.store.BasketItems
        });
    }
}


const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Basket)