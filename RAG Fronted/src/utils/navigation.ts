import type { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export function setNavigator(navigateFn: NavigateFunction) {
  navigator = navigateFn;
}

export function navigateTo(path: string, replace = true) {
  if (navigator) {
    navigator(path, { replace });
  } else {
    console.warn("Navigator not initialized");
  }
}
