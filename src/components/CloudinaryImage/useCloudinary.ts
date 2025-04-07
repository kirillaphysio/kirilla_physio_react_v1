import { useEffect, useState } from "react";
import { Cloudinary } from '@cloudinary/url-gen';

export const useCloudinary = () => {
  const [instance, setInstance] = useState((window as any).cloudinary ?? new Cloudinary({ cloud: { cloudName: 'dcwv2corw' } }));

  useEffect(() => {
    (window as any).cloudinary = instance
  }, [instance]);

  return instance;
}