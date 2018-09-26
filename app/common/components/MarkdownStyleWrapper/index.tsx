import styled from 'styled-components'

export default styled.div`
  *:first-child {
    margin-top: 0 !important;
  }
  h1 {
    font-size: 2em;
    line-height: 1.2em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 1.5em;
    line-height: 1.1em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 1.17em;
    line-height: 0.7em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  h4 {
    font-size: 1em;
    line-height: 0.6em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  h5 {
    font-size: .83em;
    line-height: 0.5em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  h6 {
    font-size: .75em;
    line-height: 0.4em;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  li,
  p,
  div,
  span,
  pre {
    font-size: 16px;
    line-height: 24px;
  }
  p {
    margin-top: 24px;
    margin-bottom: 20px;
  }
  iframe {
    border: none;
    margin-top: 24px;
    margin-bottom: 20px;
    background: #000
      url(https://s3-us-west-2.amazonaws.com/exlskills-misc-assets/iframe-loading.gif)
      center center no-repeat;
  }
`
