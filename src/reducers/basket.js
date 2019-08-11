export function BasketItems(state=[], action) {
    switch (action.type) {
        case "ADD_ONE_ITEM_BASKET":{
            let item = action.item;
            localStorage.setItem(localStorage.length+1, JSON.stringify(item));
            return [...state, item]
        }
        case "ADD_ALL_BASKET_LOCALSTORAGE":{
            return [...state, ...action.items]
        }

        case "REMOVE_ITEM_BASKET":{
            let arr = action.items.filter((item)=>(
                item.idBasket!==action.id
            ));
            localStorage.clear();
            arr.map((item,i)=>{
                item.idBasket = i+1;
                localStorage.setItem(i+1, JSON.stringify(item));
        });
            return arr
        }
        default:{
            return state
        }
    }
}