import styled, {css} from 'styled-components'


export const Contenedor = styled.div`
padding: 20px;
border-right: 1px solid #eff3f4;
flex: 0.2;
min-width: 255px;
>.mediasocial-logo{
    margin: 10px 0;
    width: 50px;
    height: 50px;
    fill: var(--socialmediaColor) !important;
}
>.mediasocial-option{
    text-decoration: none;
}
>Button{
    background-color: var(--socialmediaColor) !important;
    color: white !important;
    border: none !important;
    font-weight: 800 !important;
    text-transform: inherit !important;
    height: 46px !important;
    padding: 0 30px !important;
    border-radius: 9999px !important;
}

@media only screen and (max-width: 1280px){
    flex: 0.05;
    min-width: 50px;
    >Button{
        display:none
    }
}

@media only screen and (max-width: 1004px){
    width: 40px;
}

@media only screen and (max-width: 500px){
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 999;
    height: 50px;
    background-color: white;
    width: 100%;
    padding: 0;
    .mediasocial-logo{
        display: none;
    }
}
`

export const SideBarIcon = styled.image`
display: flex;
align-items: center;
padding: 14px 10px;
cursor: pointer;
color: black;
border-radius: 50px;
>h2{
    font-size: 20px;
    margin: 0 15px 0;
    font-weight: 700px;
}
>.MuiSvgIcon-root{
    width: 30px;
    height: 30px;
}
&:hover{
    background-color: var(--Hover) !important;
}

${props => props.active && css`
color: var(--socialmediaHover);
background-color: var(--Hover);
`}

@media only screen and (max-width: 1280px){
    border-radius: 50%;
>h2{
    display: none;
}
}

@media only screen and (max-width: 500px){
    color: #b8b8b8;
    display: ${props => props.primary ? 'none' : ''};
    color: ${props => props.active ? 'var(--socialmediaColor)' : ''};
}
`