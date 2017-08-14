# Saka

Elegant tab management, search, and more for Chrome.

* Inspired by Spotlight, Alfred, and Quick Tabs
* Built with React and Material Web Components
* Designed with users in mind

## Index

* [Intro](#intro)
* [Install](#install)
* [Development Tips](#development-tips)
* [License](#license)

## Install

### Install on Chrome

1. Run the following commands in your terminal to clone and build Saka Key. 
  An extension you can run will be generated in the 'dist' directory.

  ```sh
  git clone https://github.com/lusakasa/saka-key.git
  cd saka-key
  npm install
  npm run build:chrome
  # or if you want to generate an optimized production build
  npm run build:prod:chrome
  ```

2. Navigate to `chrome://extensions`

3. Enable developer mode and click 'Load Unpacked Extension'

4. Select the dist directory, and &#128640;.

5. Refresh existing tabs to load Saka Key into them

### Install on Firefox

1. Run the following commands in your terminal to clone and build Saka Key. 
  An extension you can run will be generated in the 'dist' directory.

  ```sh
  git clone https://github.com/lusakasa/saka-key.git
  cd saka-key
  npm install
  npm run build:firefox
  # or if you want to generate an optimized production build
  npm run build:prod:firefox
  ```

2. Navigate to `about:debugging`

3. Enable add-on debugging and click 'Load Temporary Add-on'

4. Select any file within the dist directory, and &#128640;.

5. Firefox will load Saka Key automatically into all valid existing tabs

## License

Copyright (C) Sufyan Dawoodjee 2017 - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential