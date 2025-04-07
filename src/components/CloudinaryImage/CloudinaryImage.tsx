import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import {useCloudinary} from "./useCloudinary";

export type CloudinaryImageProps = {
  imageId: string;
  width?: number;
  height?: number;
}

const DEFAULT_SIZE = 500;

const CloudinaryImage = (props: any) => {
  const cld = useCloudinary();

  const img = cld
    .image(props.imageId)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(props.width ?? DEFAULT_SIZE).height(props.height ?? DEFAULT_SIZE)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);
}

export default CloudinaryImage;