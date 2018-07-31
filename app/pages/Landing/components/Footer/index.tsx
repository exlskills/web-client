import Logo from 'common/components/Navbar/Logo'
import { Box, Flex } from 'grid-styled'
import * as React from 'react'

import {
  CopyrightWrapper,
  FooterActions,
  FooterContainer,
  FooterLinks,
  Wrapper
} from './styledComponents'

interface IProps {}

class Footer extends React.Component<IProps, void> {
  render() {
    return (
      <Wrapper>
        <FooterContainer>
          <Flex wrap={true}>
            <Box width={[1, 1 / 2]}>
              <Logo />
              <FooterActions>
                Extra space for a call to action inside the footer that could
                help re-engage users
              </FooterActions>
            </Box>
            <Box width={[1, 1 / 2]}>
              <Flex wrap={true}>
                <Box width={[1, 1 / 3]}>
                  <FooterLinks>
                    <h5>About</h5>
                    <ul>
                      <li>
                        <a href="#">Sitemap</a>
                      </li>
                      <li>
                        <a href="#">Contact us</a>
                      </li>
                      <li>
                        <a href="#">Religious Ceremonies</a>
                      </li>
                      <li>
                        <a href="#">Gazebo Plans</a>
                      </li>
                    </ul>
                  </FooterLinks>
                </Box>
                <Box width={[1, 1 / 3]}>
                  <FooterLinks>
                    <h5>Services</h5>
                    <ul>
                      <li>
                        <a href="#">Banana Pre-Order</a>
                      </li>
                      <li>
                        <a href="#">DNA FAQ</a>
                      </li>
                      <li>
                        <a href="#">How to access</a>
                      </li>
                      <li>
                        <a href="#">Favorite X-Men</a>
                      </li>
                    </ul>
                  </FooterLinks>
                </Box>
                <Box width={[1, 1 / 3]}>
                  <FooterLinks>
                    <h5>Others</h5>
                    <ul>
                      <li>
                        <a href="#">Lorem ipsum</a>
                      </li>
                      <li>
                        <a href="#">Dolor sit</a>
                      </li>
                      <li>
                        <a href="#">Extra legal stuff</a>
                      </li>
                    </ul>
                  </FooterLinks>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <CopyrightWrapper>
            {`Copyright ${new Date().getFullYear()}, EXL Inc.`}
          </CopyrightWrapper>
        </FooterContainer>
      </Wrapper>
    )
  }
}

export default Footer
