<script lang="ts" setup>
import { useDownloader } from './DownloaderUtils.js'
import { computed, onMounted, reactive, ref } from 'vue'
import { YImageInfo, Zoom } from './types'

const downloader = reactive(useDownloader())
const currentPanoramaUrl = ref('')

const progressBarWidth = computed(() => {
  return (downloader.progress / downloader.progressMax) * 100
})

const buttonNames = ['Max', 'HD', 'SD', 'Min']

onMounted(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'panorama') {
      console.log('Panorama request received')
      console.log(request)
      sendResponse({ type: 'panorama', data: 'Panorama response' })
      currentPanoramaUrl.value = request.data
      downloader.fetchDataAboutPanorama(request.data)
    }
  })
})

function downloadPanorama(zoom: Zoom) {
  downloader.createPanorama(<YImageInfo>downloader.imageInfos, zoom)
  downloader.setProgress(0, 0, 'Loading')
}
</script>

<template>
  <div class="yanorama_btns">
    <div
      v-show="!downloader.downloading"
      style="display: flex; gap: 10px"
    >
      <button
        v-for="zoom in downloader.imageInfos?.Zooms"
        :key="zoom.level"
        class="yanorama_btn"
        @click="downloadPanorama(zoom)"
      >
        {{ buttonNames[zoom.level] || zoom.level }}
      </button>
    </div>

    <div
      v-show="downloader.downloading"
      class="yanorama_progress"
    >
      <div style="border: 1px rgba(0, 0, 0, 0.1) solid; border-radius: 15px">
        <div
          class="progress-bar"
          :style="{ width: progressBarWidth + '%' }"
        />
      </div>
      <span class="progress-text">{{ downloader.progressText }}</span>

      <span style="text-align: center">
        {{ downloader.progress }} / {{ downloader.progressMax }}
      </span>
    </div>
  </div>
</template>

<style>
.yanorama_progress {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 15px 15px;
  width: 250px;
}

.progress-bar {
  height: 20px;
  width: 0;
  background-color: #4facf1;
  border-radius: 10px;
  transition: width 0.3s ease-out;
  overflow: hidden;
}

.progress-text {
  color: black;
  text-align: center;
  line-height: 20px; /* Same as the height of the progress bar */
  font-weight: bold;
  font-size: 14px;
  display: flex;
  place-content: center;
}

.yanorama_btns {
  position: absolute;
  z-index: 9999;
  top: 70px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 10px;
}

.yanorama_btn {
  background-color: #ffffff;
  border-radius: 15px;
  border: 0;
  color: #000000;
  padding: 15px 15px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-out;
}

.yanorama_btn:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.yanorama_btn:active {
  transform: scale(1.05);
}
</style>
