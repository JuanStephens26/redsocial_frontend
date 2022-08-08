import styled, {css} from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 0.6;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-right: 1px solid #eff3f4;
  overflow-y: scroll;
  box-sizing: border-sizing;
  --borderWidth: 3px;
  position: relative;
  border-radius: var(--borderWidth);

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
>.mediasocial-logo{
  margin: 10px 0;
  width: 50px;
  height: 50px;
  fill: var(--socialmediaColor) !important;
}

body {
  min-height: 100vh;
}

section {
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  --borderWidth: 3px;
  background: #FFF;
  position: relative;
  border-radius: var(--borderWidth);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-grow: 1;
  padding-bottom: 1rem;
}

.svg_icon{
  max-width: 300px;
}

input[type="text"],
input[type="password"],
button,
textarea {
width: 420px;
font-family: 'Nunito', sans-serif;
font-size: 22px;
padding: 0.25rem;
border-radius: 0.5rem;
}

.bp4-active{
  
}

label,
button {
margin-top: 1rem;
}

button {
padding: 0.5rem;
}

.hide {
  display: none;
}gin-left: 0.25rem;
}

.line {
  display: inline-block;
}

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-styke: none;
  scrollbar-width: none;

@media only screen and (max-width: 1280px){
    flex: 0.55;    
}

@media only screen and (max-width: 1204px){
    flex: 0.95;
}

@media only screen and (max-width: 500px){
    flex: 1;
}
`;

export const Header = styled.header`

`;
