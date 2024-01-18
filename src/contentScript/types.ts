export type Zoom =
  {
    level: number
    width: number
    height: number
  }

export type Tiles = {
  width: number
  height: number
}

export type YImageInfo =
  {
    imageId: string
    Zooms: Zoom[],
    Tiles: Tiles
  }
