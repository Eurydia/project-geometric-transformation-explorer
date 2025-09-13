import { MathJax } from "better-react-mathjax";
import type { FC } from "react";

type Props = {
  preImages: { x: number; y: number }[];
  imageMap: Record<number, number[] | undefined>;
};
export const CoordinateResultDisplay: FC<Props> = ({ imageMap, preImages }) => {
  const result = preImages.map(({ x, y }, i) => {
    const char = String.fromCharCode(i + 65);
    const preImageTex = `${char}(${x}, ${y})`;
    const image = imageMap[i];
    if (image === undefined) {
      return `${preImageTex} &\\rightarrow & ${char}^{\\prime}(?,?)`;
    }
    const [ix, iy] = image;
    return `${preImageTex} &\\rightarrow & ${char}^{\\prime}(${ix},${iy})`;
  });

  return (
    <MathJax
      dynamic
      style={{
        width: "100%",
        overflowX: "auto",
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      {`$$\\begin{array}{lll}${result.join("\\\\")}\\end{array}$$`}
    </MathJax>
  );
};
