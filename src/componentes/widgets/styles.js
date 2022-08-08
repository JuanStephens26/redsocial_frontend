import styled from 'styled-components'

export const Widget = styled.div`
flex: 0.3;
overflow-y: scroll;
box-sizing: border-box;
padding: 0px 30px 10px;
&::-webkit-scrollbar {
    display: none;
}
  -ms-overflow-styke: none;
  scrollbar-width: none;
@media only screen and (max-width: 1280px){
    flex: 0.4;    
}

@media only screen and (max-width: 1204px){
    display: none;
}
` 

export const Header = styled.div`
background-color: white:
height: 58px;
position: sticky;
padding-top: 10px;
top: 0;
`  

export const DivIcon = styled.div`
display: flex;
align-items: content;
background-color: #eee;
padding: 10px;
border-radius: 20px;
>.searchIcon{
    color: #5b7083;
}
>input{
    border: none;
    outline: 0;
    padding-left: 10px;
    background-color: #eee;
    font-size: 16px;
}
`  

export const DivContent = styled.div`` 