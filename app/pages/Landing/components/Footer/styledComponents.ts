import { CenterContainer } from 'common/components/styledComponents'
import styled from 'styled-components'

export const Wrapper = styled.div`background-color: #10161a;`

export const FooterContainer = CenterContainer.extend`
  color: #fff;
  position: relative;
  min-height: 300px;
  padding: 20px 20px 50px;
`

export const FooterActions = styled.div`
  width: 100%;
  margin-top: 15px;
`

export const FooterLinks = styled.nav`
  width: 100%;
  padding-top: 20px;

  h5 {
    color: #fff;
    font-size: 1rem;
    line-height: 1rem;
    &:after {
      display: block;
      content: ' ';
      width: 85%;
      border-top: 1px solid #333;
      margin-top: 5px;
    }
  }

  ul {
    padding: 0;
    margin: 0;
    li a {
      color: #939393;
      line-height: 1.8;
      &:hover {
        text-decoration: none;
        color: #c1c1c1;
      }
    }
  }

  @media screen and (min-width: 40em) {
    padding-top: 0;
  }
`

export const CopyrightWrapper = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
`
