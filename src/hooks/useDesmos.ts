import { useRef, useEffect } from "react";

export const useDesmos = (selector: string) => {
  const desmosRef = useRef<Desmos.Calculator>(undefined);

  useEffect(() => {
    const root = document.querySelector(selector) as HTMLElement | null;
    if (root === null) {
      return;
    }

    desmosRef.current = Desmos.GraphingCalculator(root, {
      // expressions: false, // hide the expression list
      keypad: false, // hide the on-screen keypad
      settingsMenu: false, // hide the wrench menu
    });

    return () => {
      if (desmosRef.current !== undefined) {
        desmosRef.current!.destroy();
      }
      desmosRef.current = undefined;
    };
  }, [selector]);
  return desmosRef.current;
};
