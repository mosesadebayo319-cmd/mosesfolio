"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  sizes,
  imageFit = "cover",
  imagePosition = "top",
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  imageFit?: "cover" | "contain";
  imagePosition?: "top" | "center" | "bottom";
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const safe =
    /^\/(?!\/)/.test(src) ||
    /^https:\/\//i.test(src) ||
    /^data:image\/(jpeg|png|webp|gif);base64,/i.test(src);
  return (
    <Image
      src={failed || !safe ? "/project-placeholder.svg" : src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      style={{ objectFit: imageFit, objectPosition: `center ${imagePosition}` }}
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
