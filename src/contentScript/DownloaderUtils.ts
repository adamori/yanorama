import { Ref, ref } from 'vue'
import { YImageInfo, Zoom } from './types'
import { getFromStorage } from './utils'

const progress = ref(0)
const progressMax = ref(0)
const progressText = ref('')
const downloading = ref(false)

const imageInfos: Ref<YImageInfo | null> = ref(null)

function setProgress(value: number, max: number, text: string) {
  progress.value = value
  progressMax.value = max
  progressText.value = text
  downloading.value = !(value === 0 && max === 0 && text === '')
}

async function fetchDataAboutPanorama(url: string) {
  const response = await fetch(url)
  const json = await response.json()
  imageInfos.value = json.data.Data.Images
}

async function fetchImage(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  return createImageBitmap(blob)
}

async function downloadAllPieces(imageId: string, zoom: number, hRange: number, vRange: number) {
  const baseUrl = `https://pano.maps.yandex.net/${imageId}/`
  let promises = []
  let allDownloadedImages: { image: ImageBitmap; x: number; y: number }[] = []
  const batchSize = 40
  const totalPieces = hRange * vRange

  for (let x = 0; x < hRange; x++) {
    for (let y = 0; y < vRange; y++) {
      // Add fetch promises to the batch
      promises.push(fetchImage(`${baseUrl}${zoom}.${x}.${y}`).then((image) => ({ image, x, y })))

      // When the batch size is reached or the end is reached, wait for all in the batch to complete
      if (promises.length >= batchSize || (x === hRange - 1 && y === vRange - 1)) {
        const batchResults = await Promise.all(promises)
        allDownloadedImages = allDownloadedImages.concat(batchResults)
        promises = [] // Reset the batch for the next set of images
        setProgress(allDownloadedImages.length, totalPieces, `Downloading pieces`)
      }
    }
  }

  return allDownloadedImages
}

function stitchPanorama(
  images: {
    image: ImageBitmap
    x: number
    y: number
  }[],
  zoomInfo: Zoom,
) {
  const canvas = document.createElement('canvas')
  canvas.width = zoomInfo.width
  canvas.height = zoomInfo.height
  const ctx = canvas.getContext('2d')

  setProgress(0, 0, `Stitching pieces`)
  images.forEach(({ image, x, y }) => {
    ctx!.drawImage(image, x * image.width, y * image.height)
  })

  return canvas
}

async function createPanorama(imageInfo: YImageInfo, zoom: Zoom) {
  const hRange = ~~(zoom.width / imageInfo.Tiles.width)
  const vRange = ~~(zoom.height / imageInfo.Tiles.height)

  const images = await downloadAllPieces(imageInfo.imageId, zoom.level, hRange, vRange)
  if (images.length === 0) {
    console.error('No images were downloaded.')
    return
  }
  const panoramaCanvas = stitchPanorama(images, zoom)
  setProgress(0, 0, `Saving panorama`)

  panoramaCanvas.toBlob(
    async (blob) => {
      if (!blob) {
        return
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const openInNewTab = await getFromStorage('openInNewTab')
      if (!openInNewTab) {
        a.download = `${imageInfo.imageId}_${zoom.level}.jpg`
      }
      a.target = '_blank'
      a.click()
    },
    'image/jpeg',
    0.9,
  )
  setProgress(0, 0, '')
}

export function useDownloader() {
  return {
    imageInfos,
    progress,
    progressMax,
    progressText,
    downloading,
    setProgress,
    fetchDataAboutPanorama,
    createPanorama,
  }
}
