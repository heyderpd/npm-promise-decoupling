const promiseDecoupling = () => {
  let resolve, reject

  const _promise = new Promise((success, fail) => {
    resolve = success
    reject = fail
  })

  return {
    promise: () => _promise,
    resolve,
    reject
  }
}

export default promiseDecoupling
