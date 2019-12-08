exports.success = data => {
  return {
    code: 20000,
    data
  }
}

exports.failure = msg => {
  return {
    code: 20001,
    message: msg
  }
}
