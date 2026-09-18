"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { RemoteImg } from "@/components/ui/remote-img";

type LoopVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  fill?: boolean;
  /** Pause when far off-screen (saves bandwidth). Hero promos should use false. */
  lazy?: boolean;
  /** Keep trying to play when the browser pauses (tab switch, scroll, autoplay quirks). */
  keepAlive?: boolean;
};

export function LoopVideo({
  src,
  poster,
  className,
  fill,
  lazy = true,
  keepAlive = true,
}: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const visibleRef = useRef(true);

  const tryPlay = useCallback(() => {
    const el = ref.current;
    if (!el || failed) return;
    if (el.readyState >= 2) {
      void el.play().catch(() => {});
    }
  }, [failed]);

  useEffect(() => {
    const el = ref.current;
    if (!el || failed) return;

    const markVisible = (v: boolean) => {
      visibleRef.current = v;
      if (v) tryPlay();
    };

    if (!lazy || typeof IntersectionObserver === "undefined") {
      markVisible(true);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          markVisible(visible);
          if (!visible && !keepAlive) el.pause();
        },
        { rootMargin: "200px", threshold: 0.05 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [src, failed, lazy, keepAlive, tryPlay]);

  useEffect(() => {
    const el = ref.current;
    if (!el || failed) return;

    const onResume = () => {
      if (document.visibilityState === "visible" && visibleRef.current) {
        tryPlay();
      }
    };

    const onMediaEvent = () => {
      if (visibleRef.current) tryPlay();
    };

    el.addEventListener("canplay", onMediaEvent);
    el.addEventListener("loadeddata", onMediaEvent);
    el.addEventListener("stalled", onMediaEvent);
    el.addEventListener("waiting", onMediaEvent);
    el.addEventListener("ended", () => {
      el.currentTime = 0;
      tryPlay();
    });
    document.addEventListener("visibilitychange", onResume);

    tryPlay();

    let interval: ReturnType<typeof setInterval> | undefined;
    if (keepAlive) {
      interval = setInterval(() => {
        if (!visibleRef.current || document.visibilityState !== "visible") return;
        if (el.paused && !el.ended) tryPlay();
      }, 2500);
    }

    return () => {
      el.removeEventListener("canplay", onMediaEvent);
      el.removeEventListener("loadeddata", onMediaEvent);
      el.removeEventListener("stalled", onMediaEvent);
      el.removeEventListener("waiting", onMediaEvent);
      document.removeEventListener("visibilitychange", onResume);
      if (interval) clearInterval(interval);
    };
  }, [src, failed, keepAlive, tryPlay]);

  if (failed && poster) {
    return (
      <RemoteImg
        src={poster}
        alt=""
        fill={fill}
        className={cn(fill && "object-cover", className)}
      />
    );
  }

  if (failed) {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-zinc-900 to-black",
          fill && "absolute inset-0",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      disablePictureInPicture
      preload={lazy ? "metadata" : "auto"}
      onError={() => setFailed(true)}
      className={cn(
        fill && "absolute inset-0 h-full w-full object-cover",
        className
      )}
    />
  );
}
