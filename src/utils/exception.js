
const globalException = (err, dispatch) => {
  const errName = err.name;
  if (errName === 'RequestError') {
    alert(err.text);
  } else {
    console.error(err);
  }
}

export default globalException;