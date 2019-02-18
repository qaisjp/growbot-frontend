export default function(state = null, action) {
    switch(action.type) {
        case 'LOGGED_IN':
            return true;
        case 'LOGGED_OUT':
            return false;
        default:
            return false;
    }
}