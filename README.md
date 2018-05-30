# PROMISE-DECOUPLING
Simplify the use of Promise, to use async parallel functions need to wait for another function.

Example:
```javascript
import promiseDecoupling from 'promise-decoupling'

const something = promiseDecoupling()

const successCode = async () => {
  /*... your code ...*/
  something.resolve()
}

const failCode = async () => {
  /*... your code ...*/
  something.reject()
}

const secondaryCode = async () => {
  try {
    /*... your code ...*/
    successCode()

  } catch (error) {
    /*... your code ...*/
    failCode()
  }
}

const primaryCode = async () => {
  /*... your code ...*/
  await something.promise()
  /*... your code ...*/
}

const main = () => {
  primaryCode()
  secondaryCode()
}
```
