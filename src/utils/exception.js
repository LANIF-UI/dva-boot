
const globalException = (err, dispatch) => {
  const errName = err.name;
  if (errName === 'RequestError') {
    console.log(err); 
  } else {
    console.error(err);
  }
}

export default globalException;