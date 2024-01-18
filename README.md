# Yanorama

Browser extension for Yandex Maps allowing you to download panoramas in a single click.

1. Different sizes
<img src="https://github.com/markarenin/yanorama/assets/85851465/af0c9cf6-bee1-4f38-9af4-2890a4ed994c" width="50%">

2. Downloading
<img src="https://github.com/markarenin/yanorama/assets/85851465/a85519a5-8214-497e-be46-a401efd442ba" width="50%">




## Installing

1. Download the latest release from [here](https://github.com/markarenin/yanorama/releases/latest/)
2. Unpack the archive
3. Open `chrome://extensions/` in your browser or click `Settings` -> `Extensions`.
4. Enable `Developer mode`
5. Click `Load unpacked` and select the unpacked archive folder
6. Optionally, you can pin the extension to the toolbar to quickly change settings


## Development


### Installing dependencies

1. Check if your `Node.js` version is >= **14**.
2. Change or configurate the name of your extension on `src/manifest`.
3. Run `npm install` to install the dependencies.

### Developing

run the command

```shell
$ cd yanorama

$ npm run dev
```

#### Chrome Extension Developer Mode

1. set your Chrome browser 'Developer mode' up
2. click 'Load unpacked', and select `yanorama/build` folder

#### Normal FrontEnd Developer Mode

1. access `http://0.0.0.0:3000/`
2. when debugging popup page, open `http://0.0.0.0:3000//popup.html`
3. when debugging options page, open `http://0.0.0.0:3000//options.html`

### Packing

After the development of your extension run the command

```shell
$ npm run build
```

Now, the content of `build` folder will be the extension ready to be used.

---

