export function Cookie (state=[], action) {
    switch (action.type) {
        case "ADD_COOKIE":{
            return [...state, ...action.item]
        }
        default:{
            return state
        }
    }
}