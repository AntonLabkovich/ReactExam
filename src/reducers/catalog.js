export function CatalogItems(state=[], action) {
    switch (action.type) {
        case "ADD_ITEM":{
            return [...state, ...action.item]
        }
        // case "SORTED":{
        //         //     let sortedArr = [].concat(action.items).sort((a,b)=>{
        //         //         if(isNaN(parseInt(a[action.typeSorted]))) {
        //         //             if (a[action.typeSorted] === b[action.typeSorted]) {
        //         //                 return 0;
        //         //             }
        //         //             return a[action.typeSorted] > b[action.typeSorted] ? action.direction : action.direction * -1;
        //         //         }
        //         //         else {
        //         //             return  parseFloat(a[action.typeSorted]) > parseFloat(b[action.typeSorted]) ? action.direction : action.direction * -1
        //         //         }
        //         //     });
        //         //     return sortedArr
        //         // }
        default:{
            return state
        }
    }
}