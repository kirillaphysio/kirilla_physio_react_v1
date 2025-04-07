import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import {useCloudinary} from "./useCloudinary";

const CloudinaryImage = (props: any) => {
  const cld = useCloudinary();

  const img = cld
    .image(props.imageId)
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  return (<AdvancedImage cldImg={img}/>);
}

export default CloudinaryImage;