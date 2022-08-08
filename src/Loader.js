import { Spinner } from "@blueprintjs/core"
import React from "react"
import TwitterGif from "./img/twitter-logo.gif"

const Loader = () => {
  return (
    <div className="loader">
      <img src={TwitterGif} />
    </div>
  )
}

export default Loader