const deleteClient= async (url) => {

  const res = await fetch(url, {
      method: 'DELETE',
  });

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }


};

export default deleteClient;