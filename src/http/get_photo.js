import endpoints from "../endpoints";

export default async function(token, photo) {
  const endpoint = endpoints.photos + '/' + photo;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "image/jpeg"
    }
  });

  await response.then(response => {
    response.arrayBuffer().then(buffer => {
      let base64Flag = 'data:image/jpeg;base64,';
      let imageStr = arrayBufferToBase64(buffer);

      return base64Flag + imageStr;
    });
  });
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};