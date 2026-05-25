import { useCallback, useState } from "react";
import { Scene } from "../types";

export function useSceneManager() {
  const [currentScene, setCurrentScene] =
    useState<Scene>("loading");

  const goToScene = useCallback(
    (scene: Scene) => {
      setCurrentScene(scene);
    },
    []
  );

  return {
    currentScene,
    goToScene
  };
}