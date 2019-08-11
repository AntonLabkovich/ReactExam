export function Auth (state=[], action) {
    switch (action.type) {
        case "ADD_AUTH":{
            return action.item
        }
        case "ADD_AUTH_COOKIE":{
            console.log(action.item.login);
            document.cookie = `${action.item.login}=${action.item.pass}; max-age=3600`;
            return action.item
        }
        default:{
            return state
        }
    }
}