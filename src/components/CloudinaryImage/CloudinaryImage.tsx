import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import {useCloudinary} from "./useCloudinary";

export type CloudinaryImageProps = {
  imageId: string;
  width?: number;
  height?: number;
}

const DEFAULT_SIZE = 300;

const CloudinaryImage = (props: any) => {
  const cld = useCloudinary();

  const img = cld
    .image(props.imageId)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().width(props.width ?? DEFAULT_SIZE).height(props.height ?? DEFAULT_SIZE)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}
                         loading="lazy"
                         fetchPriority="high"
                         onError={(event: any) => {event.target.src = `https://placehold.co/${props.width ?? DEFAULT_SIZE}/5F3D44/F8EFF1?text=A+k%C3%A9p+nem+el%C3%A9rhet%C3%B6`}}
  />);
}

export default CloudinaryImage;