const { connect } = require('mongoose');

module.exports = async () => {
  let url =
    process.env.ENV === 'DOCKER'
      ? process.env.MONGODOCKER
      : process.env.MONGOLOCAL;

  if (!url) url = 'mongodb://localhost:27017/todo';
  try {
    const res = await connect(url);
    console.log(`Connect with ${res.connection.host}`.yellow.underline);
  } catch (err) {
    console.log(`DB Not connect : ${err.message}`.red);
  }
};
