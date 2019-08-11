import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import './main.less'
import {Link} from "react-router-dom";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    render() {
        let arr = this.props.store.CatalogItems.filter((item) => (
            item.status === 'top'
        ));
        console.log((+this.state.current));
        return (
            <div className={'container'}>
                <main>
                    <h1>true internet-shop</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor doloremque enim harum
                        labore modi recusandae sit temporibus ullam voluptate.</p>

                    <div className={'slider'}>
                        <p>TOP PRODUCTS</p>

                        {arr.map((item, i) =>
                            <div key={i} id={item.id} className={'containerImg'}>
                                <Link to={`/dist/catalog/${item.id}`}>
                                    <p className={'title'}>{item.title}</p>
                                    {<img src={`${item.gallery}9hq`} alt=""/>}
                                </Link>
                            </div>
                        )}

                        <div className={'controlSlider'}><span
                            onClick={() => this.previewSlide(document.querySelectorAll('.containerImg'))}>preview</span><span
                            onClick={() => this.nextSlide(document.querySelectorAll('.containerImg'))}>next</span>
                        </div>
                    </div>
                </main>
            </div>
        )
    }


    nextSlide = (imgSlider) => {
        for (let i = 0; i < imgSlider.length; i++) {
            imgSlider[i].classList.add('opacity0');
        }
        imgSlider[this.state.current].classList.remove('opacity0');
        (+this.state.current + 1) === imgSlider.length ?
            this.setState({
                current: 0
            }) :
            this.setState({
                current: (+this.state.current) + 1
            });

    };

    previewSlide = (imgSlider) => {
        for (let i = 0; i < imgSlider.length; i++) {
            imgSlider[i].classList.add('opacity0');
        }
        imgSlider[this.state.current].classList.remove('opacity0');
        (+this.state.current - 1) === -1 ?
            this.setState({
                current: imgSlider.length - 1
            }) :
            this.setState({
                current: (+this.state.current) - 1
            });
    }
}


const mapStateFromProps = (store) => {
    return {
        store: store
    }
};


export default connect(mapStateFromProps)(Main)