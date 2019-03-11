import config from "./config";

let base = config.API_HOST;
if (config.API_SECURE) {
  base = `https://${base}`;
} else {
  base = `http://${base}`;
}

export default {
  move: `${base}/move`,
  settings: `${base}/settings`,
  start: `${base}/demo/start`,

  auth_register: `${base}/auth/register`,
  auth_login: `${base}/auth/login`,
  auth_refresh: `${base}/auth/refresh`,
  auth_chgpass: `${base}/auth/chgpass`,

  robots_list: `${base}/robots`,
  robots_register: `${base}/robots/register`,

  photos: `${base}/photos`,

  robot_delete: uuid => `${base}/robot/${uuid}`,
  robot_move: uuid => `${base}/robot/${uuid}/move`,
  robot_settings: uuid => `${base}/robot/${uuid}/settings`,
  robot_video: (uuid, token) => `${base}/robot/${uuid}/video?token=${token}`
};
