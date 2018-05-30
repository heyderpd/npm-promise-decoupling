import assert from 'assert'
import promiseDecoupling from '../src'

describe('setValidCursor', function() {
  let doError, result
  const something = promiseDecoupling()

  const successCode = async () => {
    something.resolve()
    result = 'success'
  }

  const failCode = async () => {
    something.reject()
    result = 'fail'
  }

  const secondaryCode = async () => {
    try {
      if (doError) {
        throw 'error'
      }

      successCode()
    } catch (error) {
      failCode()
    }
  }

  const primaryCode = async (done, expectedResult) => {
    await something.promise()
    assert.equal(expectedResult, result)
    done()
  }

  it('success', done => {
    doError = false
    primaryCode(done, 'success')
    secondaryCode()
  })

  it('fail', done => {
    doError = true
    primaryCode(done, 'fail')
    secondaryCode()
  })
})
