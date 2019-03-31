export default function (state = null, action) {
    switch (action.type) {
        case "APPBAR_OPEN":
            return true;
        case "APPBAR_CLOSE":
            return false;
        default:
            return false;
    }
}
