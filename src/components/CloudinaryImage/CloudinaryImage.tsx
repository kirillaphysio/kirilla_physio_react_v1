import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import {useCloudinary} from "./useCloudinary";

export type CloudinaryImageProps = {
  imageId: string;
  width?: number;
  height?: number;
  className?: string;
}

const DEFAULT_SIZE = 300;

const CloudinaryImage = (props: any) => {
  const cld = useCloudinary();

  const img = cld
    .image(props.imageId)

  return (<AdvancedImage cldImg={img}
                         className={props.className}
                         style={{
                           width: props.width ?? DEFAULT_SIZE,
                           height: props.height ?? DEFAULT_SIZE,
                         }}
                         loading="lazy"
                         fetchPriority="high"
                         onError={(event: any) => {event.target.src = `https://placehold.co/${props.width ?? DEFAULT_SIZE}/5F3D44/F8EFF1?text=A+k%C3%A9p+nem+el%C3%A9rhet%C3%B6`}}
  />);
}

export default CloudinaryImage;