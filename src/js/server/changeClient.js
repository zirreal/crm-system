const changeInfo = async (url, info) => {
  const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(info),
      headers: {
      'Content-Type': 'application/json',
      }
  });

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидываем новую ошибку
  }

};

export default changeInfo;