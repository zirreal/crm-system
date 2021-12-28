const postClient = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидываем новую ошибку
}

  return await res.json();

};

export default postClient;