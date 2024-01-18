export function getFromStorage(key: any) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result[key])
      }
    })
  })
}
