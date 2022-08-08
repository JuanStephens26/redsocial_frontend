import React from 'react';
import {useRef, useState, useEffect} from 'react';


export const YappyButton = ({urlYappy}) => {

 const [pagos, setPagos] = useState("");
  return (
    <div class="yappy-button" >
    <a target="_blank" href={urlYappy}>
      <span>Pagar con</span>
      <span>yappy</span>
    </a>
  </div>
  )
}