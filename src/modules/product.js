import React, {Component, Fragment} from 'react';
import '../allStyle.less';
import {connect} from "react-redux";
import './catalog.less'
import './product.less'


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oneProduct: {},
            infoItem: []
        }
    }

    render() {
        // console.log(this.state.infoItem);
        // console.log(this.props.match.params.id);
        // console.log(this.props.store.CatalogItems);
        // console.log(this.state.oneProduct);
        return (
            <div className={'container'}>
                <div className={'product'}>
                    <h3>{this.state.oneProduct.title}</h3>
                    <div><img src={`${this.state.oneProduct.gallery}9hq`} alt=""/></div>
                    <div className={'infoProduct'}>
                        <ul>
                            {this.state.infoItem.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                        <p>Price:{this.state.oneProduct.price}</p>
                        <button onClick={() => this.addToBasket(this.state.oneProduct.id)}>Add Bascet</button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let oneItem = this.props.store.CatalogItems.find((item) => (
            item.id === (+this.props.match.params.id)
        ));
        this.setState({
            oneProduct: oneItem,
            infoItem: oneItem.fullText.split('\n')
        })
    }

    addToBasket = (id) => {
        let oneItem = this.props.store.CatalogItems.find((item) => (
            item.id === id
        ));
        oneItem.idBasket = this.props.store.BasketItems.length + 1;
        this.props.dispatch({
            type: "ADD_ONE_ITEM_BASKET",
            item: Object.assign({}, oneItem)
        });
        console.log('после диспатча', this.props.store.BasketItems);
    }
}


const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Product)