import React from 'react';

const Image = ({src, alt="photo"}) => {

  return (
      <img
        src={src}
        alt={alt}
        width='100%'
        height={200}
    />
  )
}
export default Image;