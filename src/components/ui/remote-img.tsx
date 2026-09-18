"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type RemoteImgProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
};

export function RemoteImg({ src, alt, className, fill }: RemoteImgProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-zinc-800 to-zinc-950",
          fill && "absolute inset-0",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn(fill && "absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
