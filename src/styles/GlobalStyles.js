import {createGlobalStyle} from 'styled-components'


export default createGlobalStyle`
:root{
  --socialmediaColor: #1d9bf0;
  --socialmediaHover: #1a8cd8;
  --Hover: rgba(0, 0, 0, .10)
}
 
*{
   margin: 0;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.App{
  display: flex;
  height: 100vh;
  max-width: 1265px;
  margin: 0 auto;
}

.loader { 
  margen : 100 px automático ; 
}
`