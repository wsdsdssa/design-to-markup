declare module '*.svg?react' {
  import type React from 'react';
  const svg: React.FC<React.SVGAttributes<SVGSVGElement>>;
  export default svg;
}

declare module '*.svg' {
  import type React from 'react';
  const svg: React.FC<React.SVGAttributes<SVGSVGElement>>;
  export default svg;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.mov' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: import('next/image').StaticImageData;
  export default src;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
