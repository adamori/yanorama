console.log('background is running')

let url = ''
chrome.webRequest.onCompleted.addListener(
  (details) => {
    console.log(details.method, details.url)
    if (details.url !== url) {
      url = details.url
      chrome.tabs.sendMessage(details.tabId, { type: 'panorama', data: url }).catch(console.error)
    }
  },
  { urls: ['https://api-maps.yandex.ru/services/panoramas/1.x/*'] },
)
