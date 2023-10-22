import Image, { ImageProps } from 'next/image';
import React, { useMemo } from 'react';
import { getEnvConfig } from 'src/functions/getConfig';

interface Props extends Omit<ImageProps, 'alt' | 'src'> {
  image: TTDImage
}

const Picture: React.FC<Props> = ({ image, ...nextImageProps }) => {

  const url = useMemo(() => {
    switch (image.metadata.drive) {
      case "local":
        return getEnvConfig().SERVER_ADDRESS + image.url
      case "external":
        return image.url
      default:
        return null
    }
  }, [])

  if (!url)
    return <img src="https://via.placeholder.com/300x150" />

  return <Image
    alt={image.description}
    src={url}
    {...nextImageProps}
  />

};

export default Picture;