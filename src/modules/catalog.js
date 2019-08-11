import React, {Component, Fragment} from 'react';
import '../allStyle.less';
import {connect} from "react-redux";
import './catalog.less'
import {Switch, Route} from 'react-router-dom';
import {Link} from "react-router-dom";

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: {
                price: true,
                title: true
            },
            copyProduct: this.props.store.CatalogItems
        }
    }

    render() {
        console.log(this.state.copyProduct);
        return (
            <div className={'container'}>
                <div className={'sort'}>
                    <button onClick={() => this.sort('title')}>sort by title</button>
                    <button onClick={() => this.sort('price')}>sort by age</button>
                    <button onClick={() => this.resetSort()}>reset sort</button>
                </div>
                <div className={'catalog'}>
                    {
                        this.state.copyProduct.map((item) => (
                            <div className={'catalogItem'} key={item.id}>
                                <Link to={`/dist/catalog/${item.id}`}>{item.title}</Link>
                                <div><img src={`${item.gallery}8hq`} alt=""/></div>
                                <p>{item.price}</p>
                                <button onClick={()=>this.addToBasket(item.id)}>Add Bascet</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    sort = (typeSort) => {
        const sortOrder = this.state.sorted[typeSort];
        let direction = sortOrder ? 1 : -1;
        let sortedArr = [].concat(this.state.copyProduct).sort((a, b) => {
            if (isNaN(parseInt(a[typeSort]))) {
                if (a[typeSort] === b[typeSort]) {
                    return 0;
                }
                return a[typeSort] > b[typeSort] ? direction : direction * -1
            } else {
                if (a[typeSort] === b[typeSort]) {
                    return 0;
                }
                return parseFloat(a[typeSort]) > parseFloat(b[typeSort]) ? direction : direction * -1
            }
        });
        typeSort === 'title' ? this.setState({
            sorted: {
                price: this.state.sorted.price,
                title: !this.state.sorted.title
            }
        }) : this.setState({
            sorted: {
                price: !this.state.sorted.price,
                title: this.state.sorted.title
            }
        });
        this.setState({
            copyProduct: sortedArr
        });
        // console.log('отсартированный',sortedArr)
        // let sortedArr = [].concat(this.state.copyProduct).sort((a,b)=>{
        //     if(isNaN(parseInt(a[typeSort]))) {
        //         if (a[typeSort] === b[typeSort]) {
        //             return 0;
        //         }
        //         return a[typeSort] > b[typeSort] ? direction : direction * -1;
        //     }
        //     else {
        //         return  parseFloat(a[typeSort]) > parseFloat(b[typeSort]) ? direction : direction * -1
        //     }
        // })
        // else {return sortedArr;}
        //

        //
        // this.props.dispatch({
        //     type: "SORTED",
        //     typeSorted: typeSort,
        //     items: this.props.store.CatalogItems,
        //     direction: this.state.sorted[typeSort] ? 1 : -1
        // });

    };
    resetSort = () => {
        this.setState({
            copyProduct: this.props.store.CatalogItems,
            sorted: {
                price: true,
                title: true
            }
        })
    };

    addToBasket = (id)=>{
        let oneItem = this.props.store.CatalogItems.find((item)=>(
            item.id===id
        ));
        oneItem.idBasket = this.props.store.BasketItems.length+1;
        this.props.dispatch({
            type: "ADD_ONE_ITEM_BASKET",
            item: Object.assign({}, oneItem)
        });
        console.log('после диспатча',this.props.store.BasketItems);
    }
}


const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Catalog)