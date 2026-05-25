export type Scene =
  | "loading"
  | "envelope"
  | "flower-explosion"
  | "flower-bloom"
  | "flower-way"
  | "letter-reveal"
  | "typewriter"
  | "signature"
  | "ending";

export interface SceneProps {
  onComplete: () => void;
}