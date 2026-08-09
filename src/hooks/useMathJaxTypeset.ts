import { MathJaxBaseContext } from "better-react-mathjax";
import { useContext, useLayoutEffect, useRef } from "react";

export const useMathJaxTypeset = <T extends HTMLElement>(content: string) => {
  const context = useContext(MathJaxBaseContext);
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (content.length === 0 || context === undefined || element === null) {
      return;
    }

    let active = true;
    context.promise.then((mathJax) => {
      if (!active) {
        return;
      }

      if (context.version === 2) {
        mathJax.Hub.Queue(["Typeset", mathJax.Hub, element]);
        return;
      }

      mathJax.startup.promise.then(() => {
        if (!active) {
          return;
        }
        mathJax.typesetClear([element]);
        return mathJax.typesetPromise([element]);
      });
    });

    return () => {
      active = false;
    };
  }, [content, context]);

  return elementRef;
};
