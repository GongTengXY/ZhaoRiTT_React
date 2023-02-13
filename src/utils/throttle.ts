export const throttle = (fn: () => void, sec: number) => {
  let timer: any = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, sec)
  }
}
