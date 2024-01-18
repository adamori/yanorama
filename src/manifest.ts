import {defineManifest} from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  content_scripts: [
    {
      matches: [
        "https://yandex.ee/*"
      ],
      js: ['src/contentScript/index.ts'],
      run_at: 'document_start',
    },
  ],
  permissions: ['webRequest', 'tabs', 'activeTab', 'storage'],
  host_permissions: [
    "https://yandex.ee/*",
    "https://yandex.com/*",
    "https://yandex.ru/*",
    "https://api-maps.yandex.ru/*",
    "*://*.yandex.ee/*"
  ]
})
