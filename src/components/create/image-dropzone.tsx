"use client";

import { useCallback, useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageDropzoneProps = {
  value: string | null;
  onChange: (v: string | null) => void;
  disabled?: boolean;
};

export function ImageDropzone({ value, onChange, disabled }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") onChange(reader.result);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  };

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-input border border-border bg-surface-input">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="Upload preview" className="max-h-40 w-full object-cover" />
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(null)}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onClick={() => !disabled && inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-input border border-dashed border-border bg-surface-input px-4 py-8 text-center transition-colors hover:border-brand/40 hover:bg-surface-hover",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <ImagePlus className="h-8 w-8 text-muted-foreground" />
      <p className="text-sm font-medium">Drop an image or click to upload</p>
      <p className="text-xs text-muted-foreground">Image-to-image (Step 4 API)</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
