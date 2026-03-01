export let showGlobalLoader:
  | ((value: boolean | { show: boolean; message?: string }) => void)
  | null = null;

export const registerGlobalLoader = (
  fn: (value: boolean | { show: boolean; message?: string }) => void,
) => {
  showGlobalLoader = fn;
};

export let startGlobalTimer: ((seconds: number) => void) | null = null;

export const registerGlobalTimer = (fn: (seconds: number) => void) => {
  startGlobalTimer = fn;
};
