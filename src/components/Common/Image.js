import React from "react"
import imageNotFound from "../../assets/images/image-not-found.png"

const Images = props => {
  return (
      <img
          {...props}
          data-dz-thumbnail=""
          height={props.height || 250}
          width={props.width || 250}
          className={props.className  || "avatar-sm rounded bg-light"}
          alt={props.alt}
          src={props.src || imageNotFound}
          onError={(e)=>{
            e.target.src = imageNotFound;
          }}

      />
  )
}

export default Images
