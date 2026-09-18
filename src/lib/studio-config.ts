import type { AspectRatioId } from "@/lib/create-constants";

export type StudioMode = "image" | "video" | "audio";

export type StudioConfig = {
  mode: StudioMode;
  title: string;
  subtitle: string;
  modelLabel: string;
  ctaLabel: string;
  promptPlaceholder: string;
  defaultAspect: AspectRatioId;
  aspectRatios: AspectRatioId[];
  stylePresetIds: string[];
};

export const STUDIO_CONFIG: Record<StudioMode, StudioConfig> = {
  image: {
    mode: "image",
    title: "Image",
    subtitle: "gemini-3.8-flash · your key or hosted",
    modelLabel: "Gemini 3.8 Flash",
    ctaLabel: "Generate image",
    promptPlaceholder:
      "Describe your shot — product on marble, editorial portrait, concept art…",
    defaultAspect: "1:1",
    aspectRatios: ["1:1", "16:9", "9:16", "4:5"],
    stylePresetIds: [
      "cinematic",
      "product",
      "portrait",
      "fashion",
      "anime",
      "cyberpunk",
      "golden",
      "studio",
    ],
  },
  video: {
    mode: "video",
    title: "Video",
    subtitle: "Your Gemini key · cinematic frames (not on hosted tier)",
    modelLabel: "Gemini 3.8 Flash",
    ctaLabel: "Generate video frame",
    promptPlaceholder:
      "Describe the scene and camera move — tracking shot, slow push-in, action beat…",
    defaultAspect: "16:9",
    aspectRatios: ["16:9", "9:16", "1:1"],
    stylePresetIds: ["cinematic", "golden", "cyberpunk", "fashion"],
  },
  audio: {
    mode: "audio",
    title: "Audio",
    subtitle: "VoiceLab · music & SFX",
    modelLabel: "VoiceLab",
    ctaLabel: "Generate audio artwork",
    promptPlaceholder:
      "Describe the sound — lo-fi beat, podcast intro, cinematic riser, voice tone…",
    defaultAspect: "1:1",
    aspectRatios: ["1:1", "16:9"],
    stylePresetIds: ["studio", "cyberpunk", "cinematic"],
  },
};

export const VIDEO_DURATIONS = [5, 10] as const;
export type VideoDuration = (typeof VIDEO_DURATIONS)[number];

export const AUDIO_TYPES = [
  { id: "music", label: "Music" },
  { id: "sfx", label: "Sound FX" },
  { id: "voice", label: "Voice" },
] as const;

export type AudioTypeId = (typeof AUDIO_TYPES)[number]["id"];

export const MOTION_PRESETS = [
  { id: "dolly", label: "Dolly in" },
  { id: "orbit", label: "Orbit" },
  { id: "handheld", label: "Handheld" },
  { id: "crane", label: "Crane up" },
] as const;

export function parseStudioMode(value: string | undefined): StudioMode {
  if (value === "video" || value === "audio" || value === "image") return value;
  return "image";
}
