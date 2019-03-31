import endpoints from "./endpoints";

class API {
    constructor() {
        this.ws = null;
        this.subscriptions = {};
    }

    onMessage = event => {
        const subs = this.subscriptions;
        const msg = JSON.parse(event.data);
        const type = msg.type;
        const data = msg.data;

        if (!(type in subs)) {
            return;
        }

        subs[type].forEach(cb => {
            cb(data);
        });
    }

    authLogin(token) {
        API.token = token;

        if (this.ws !== null) {
            this.ws.onclose = () => {};
            this.ws.close();
        }

        this.ws = new WebSocket(endpoints.user_stream(token));
        this.ws.onmessage = this.onMessage;
    };

    subscribe(type, callback) {
        const subs = this.subscriptions;
        if (!(type in subs)) {
            subs[type] = [];
        }

        subs[type].push(callback);
    }

    unsubscribe(type, callback) {
        const subs = this.subscriptions;
        if (!(type in subs)) {
            return false;
        }

        const idx = subs[type].indexOf(callback);
        subs[type].splice(idx, 1);
        return true;
    }
}

export default new API();