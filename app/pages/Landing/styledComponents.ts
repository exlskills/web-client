import { Button } from '@blueprintjs/core'
import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'
import { Box } from 'grid-styled'

export const Wrapper = styled.div`
  // background-image: url('https://www.pixelstalk.net/wp-content/uploads/2016/07/Computer-Science-HD-Wallpapers.jpg');
  // background-size: cover;
  // background-position: center;
  // background-repeat: no-repeat;

  background: #2b5876; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4e4376,
    #2b5876
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4e4376,
    #2b5876
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &:before {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 0;
  }
`

export const PageContainer = CenterContainer.extend`
  position: relative;
  min-height: 100vh;
  padding: 20px;
  @media screen and (min-width: 40em) {
    padding-top: 200px;
  }
`

export const LoginWrapper = styled.div.attrs({
  className: 'pt-card'
})`
  margin: 0 auto;
  @media screen and (min-width: 10em) {
    width: 300px;
  }
`
export const ContentWrapper = styled(Box).attrs({
  width: [1, 1 / 2]
})`
  margin-bottom: 20px;
  font-size: 0.8rem;
  color: #fff;
  text-align: center;
  @media screen and (min-width: 40em) {
    padding-left: 100px;
    text-align: left;
  }
`

export const Title = styled.h1`
  color: #fff;
  font-size: 3em;
  line-height: 1.3em;
  margin-bottom: 0.5em;
`

export const Subtitle = styled.h2`
  color: #fff;
  font-size: 1.4em;
  line-height: 1.4em;
  margin-bottom: 2.5em;
`

export const GetStartButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  line-height: 40px;
  padding: 5px 30px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

  .pt-icon {
    margin-left: 10px;
  }
`

export const SmallNote = styled.div`
  font-size: 0.9em;
  margin-left: 2px;
`
