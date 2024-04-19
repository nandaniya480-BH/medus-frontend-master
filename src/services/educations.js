const getEducations = () => {
  const url = 'http://192.168.2.31:8000/api/getEducation';

  return fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return { ...response };
    });
};

export default getEducations;
