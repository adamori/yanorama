import { createApp, CreateAppFunction } from 'vue'
import DownloadButtons from './DownloadButtons.vue'

const root = document.createElement('div')
root.id = 'download-buttons-root'
document.body.appendChild(root)

const app = createApp(DownloadButtons)
app.mount(root)
