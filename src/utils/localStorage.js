const data = {
  userInfo: null
}
Object.keys(data).forEach(key => {
  Object.defineProperty(data, key, {
    get: () => JSON.parse(window.localStorage.getItem(`${key}`)),
    set: (value) => {
      typeof value !== 'string' && (value = JSON.stringify(value))
      window.localStorage.setItem(`${key}`, value)
    }
  })
})
export default data
