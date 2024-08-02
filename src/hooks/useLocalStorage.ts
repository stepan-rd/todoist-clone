export function useLocalStorage() {

  function setItem(key: string, value: unknown) {
    const stringValue = JSON.stringify(value)
    window.localStorage.setItem(key, stringValue)
  }

  function getItem(key: string) {
    const item = window.localStorage.getItem(key)
    return item
  }

  function removeItem(key: string) {
    window.localStorage.removeItem(key)
  }


  return { setItem, getItem, removeItem}
}