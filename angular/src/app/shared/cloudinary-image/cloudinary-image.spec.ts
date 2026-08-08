import { provideCloudinaryLoader } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { CloudinaryImage } from './cloudinary-image';

async function createImage(inputs: {
  imageId: string;
  width?: number;
  height?: number;
  priority?: boolean;
}): Promise<HTMLImageElement> {
  await TestBed.configureTestingModule({
    imports: [CloudinaryImage],
    providers: [provideCloudinaryLoader('https://res.cloudinary.com/dcwv2corw')],
  }).compileComponents();

  const fixture = TestBed.createComponent(CloudinaryImage);
  fixture.componentRef.setInput('imageId', inputs.imageId);
  if (inputs.width !== undefined) fixture.componentRef.setInput('width', inputs.width);
  if (inputs.height !== undefined) fixture.componentRef.setInput('height', inputs.height);
  if (inputs.priority !== undefined) fixture.componentRef.setInput('priority', inputs.priority);
  await fixture.whenStable();

  return fixture.nativeElement.querySelector('img') as HTMLImageElement;
}

describe('CloudinaryImage', () => {
  it('builds a Cloudinary URL for the base src', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123', width: 200, height: 150 });

    expect(img.src).toContain('res.cloudinary.com/dcwv2corw/image/upload/');
    expect(img.src).toContain('sample-image_abc123');
  });

  it('builds width/height-aware Cloudinary URLs in the generated srcset (1x/2x density)', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123', width: 200, height: 150 });

    expect(img.srcset).toContain('w_200,h_150');
    expect(img.srcset).toContain('sample-image_abc123 1x');
    expect(img.srcset).toContain('w_400,h_300');
    expect(img.srcset).toContain('sample-image_abc123 2x');
  });

  it('sets width/height attributes to avoid layout shift', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123', width: 200, height: 150 });

    expect(img.width).toBe(200);
    expect(img.height).toBe(150);
  });

  it('lazy-loads by default', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123' });

    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('fetchpriority')).toBe('auto');
  });

  it('loads eagerly at high priority when priority=true (set before init — NgOptimizedImage ' +
    'forbids changing it afterwards, since the fetch already happened by then)', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123', priority: true });

    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it('falls back to a placehold.co image, sized to the configured width, on load error', async () => {
    const img = await createImage({ imageId: 'sample-image_abc123', width: 200, height: 150 });

    img.dispatchEvent(new Event('error'));

    expect(img.src).toBe('https://placehold.co/200/5F3D44/F8EFF1?text=A+k%C3%A9p+nem+el%C3%A9rhet%C3%B6');
  });
});
