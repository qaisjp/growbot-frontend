import config from "./config.example"

let base = config.API_HOST;
if (config.API_SECURE) {
    base = `https://${base}`;
} else {
    base = `http://${base}`;
}

export default {
    move: `${base}/move`
}
