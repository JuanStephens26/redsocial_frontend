import styled, {css} from "styled-components";

export const Container = styled.div`
  flex: 0.5;
  border-right: 1px solid #eff3f4;
  overflow-y: scroll;
  box-sizing: border-sizing;

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

export const Header = styled.header``;

/*TweetBox*/
export const Tweetbox = styled.div`
  padding: 5px 15px;
  border-bottom: 1px solid #ddd;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Div = styled.div`
  display: flex;
  width: 100%;
  > .columns {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-right: 16px;
    > input {
      margin-left: 10px;
      margin-top: 10px;
      width: 100%;
      border: none;
      outline: 0;
      font-size: 19px;
      line-height: 25px;
    }
  }
  > input {
    margin-left: 10px;
    width: 100%;
    flex:1;
    border: none;
    outline: 0;
    font-size: 19px;
    line-height: 25px;
  }
 >Button{
   background-color: var(--socialmediaColor) !important; 
   border: none !important;
   color: white !important;
   font-weight: 900 !important;
   width: 80px !important;
   height: 40px !important;
   margin-top: 20px !important;
   border-radius: 30px !important;
   text-transform: inherit !important;
 }
`;

export const DivBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  >.MuiSvgIcon-root{
    fill: var(--socialmediaColor) !important; 
    margin-left: 1rem;
    width: 20px;
    height: 20px;
    border: 2px solid var(--socialmediaColor) !important; 
    border-radius: 5px;
    cursor: pointer;

    &:nth-child(3);
  }
`;

export const File = styled.input`
max-width: 35px;
position: absolute;
z-index: 10;
padding-top: 10px;
opacity: .0;
${props => props.primary && css`
margin-left: 55px;
`};
`
/*****************POST**************/
export const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fill: fill;
`;

export const Post = styled.div`
   padding: 10px 15px;
   border-top: 1px solid #ddd;
   margin-top: 5px;
   display: flex;
   align-items: flex-start;
   .post_avatar{
    margin-top: 5px;
   }

   .post-more{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    color: #5b7083;
    transition: all 100ms ease-in;
    >.MuiSvgIcon-root:hover:nth-child(1){
    fill: #1da1f2;
    cursor: pointer;
    
}

   }
`

export const PostBody = styled.div`
padding-left: 10px;
width: 100%;
overflow: hidden;
>div span{
  font-weight: 600;
  font-size: 15px;
  color: #5b7083;
}
.post_icon{
  font-size: 14px !important;
  color: var(--socialmediaColor) !important;
}
h3{
  padding: 0;
  margin: 0;
}
`

export const PostDescription = styled.div`
margin-buttom: 10px;
>p{
  margin: 0;
  padding: 0;
  color: #0f1419
  font-size: 16px;
  line-height: 19.6875px;
}
`

export const Images = styled.img`
border-radius: 20px;
min-width: 100%;
width: 100%;
min-height: 300px;
`

export const PostFooter = styled.div`
display: flex;
justify-content: space-between;
margin-top: 10px;
color: #5b7083;
width: 100%;
transition: all 100ms ease-in;
>.MuiSvgIcon-root:hover:nth-child(1){
  fill: #1da1f2;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(2){
  fill: #17bf63;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(3){
  fill: #e02452;
  cursor: pointer;
}
>.MuiSvgIcon-root:hover:nth-child(4){
  fill: #1da1f2;
  cursor: pointer;
}
`

/***********************************/