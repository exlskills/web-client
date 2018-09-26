import { injectGlobal } from 'styled-components'
const NotoSansBold = require('../static/fonts/NotoSans-Bold.ttf')
const NotoSansBoldItalic = require('../static/fonts/NotoSans-BoldItalic.ttf')
const NotoSansItalic = require('../static/fonts/NotoSans-Italic.ttf')
const NotoSansRegular = require('../static/fonts/NotoSans-Regular.ttf')

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: "NotoSans";
    src: url('${NotoSansRegular}');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "NotoSans";
    src: url('${NotoSansItalic}');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: "NotoSans";
    src: url('${NotoSansBold}');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: "NotoSans";
    src: url('${NotoSansBoldItalic}');
    font-weight: 700;
    font-style: oblique;
  }

  .fonts-loaded body {
      font-family: "NotoSans",-apple-system,"BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", "Icons16", sans-serif;
  }

  .fonts-loading body {
    visibility: hidden;
  }

  .fonts-loaded body,
  .fonts-failed body {
    visibility: visible;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    overflow-x: hidden;
  }

  body.pad-top {
    padding-top: 50px;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .pace {
    -webkit-pointer-events: none;
    pointer-events: none;

    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .pace-inactive {
    display: none;
  }

  .pace .pace-progress {
    background: #48AFF0;
    position: fixed;
    z-index: 2000;
    top: 0;
    right: 100%;
    width: 100%;
    height: 2px;
  }

  .pt-dialog-container .pt-dialog.exl-mobile-full-dialog {
    position: absolute !important;
    
    .pt-dialog-body {
      position: relative;
      overflow: hidden;
    }
  }

  /*
   * Note: removing custom scrollbar for accessibility across devices/platforms
  ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-track {
    border-left: solid rgba(120, 120, 120, 0.6) 1px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0);
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(120, 120, 120, 0.4);
  }
  */
`
