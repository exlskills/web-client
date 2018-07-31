import { keyframes } from 'styled-components'

const fromTopAnimation = keyframes`
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0px); }
`

const reverseFromTopAnimation = keyframes`
  0%   { opacity: 0; transform: translateY(0px); }
  100% { opacity: 1; transform: translateY(10px); }
`

export const fadeFromTop = (delay: number = 0, fromTop: boolean = true) =>
  `
    animation: ${fromTop ? reverseFromTopAnimation : fromTopAnimation} 0.3s;
    animation-delay: ${delay}s;
    animation-fill-mode: forwards;
    opacity: 0;
  `

const fadeAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const fadeIn = (delay: number = 0) =>
  `
    animation: ${fadeAnimation} 0.3s;
    animation-delay: ${delay}s;
    animation-fill-mode: forwards;
    opacity: 0
  `
