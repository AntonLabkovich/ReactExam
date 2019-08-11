//комбинирование редьюсеров
import {combineReducers} from "redux";
import {CatalogItems} from "./catalog";
import {BasketItems} from './basket'
import {Auth} from "./auth";
import {Cookie} from "./cookie";


export default combineReducers({
    CatalogItems, BasketItems, Auth, Cookie
});