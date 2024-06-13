import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import react from "react"; // Import react
import reactDom from "react-dom"; // Import react-dom

import packageJson from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-ts-lib",
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external({
        includeDependencies: true,
      }),
      resolve(),
      commonjs({
        include: ["node_modules/**"],
        namedExports: {
          "node_modules/react/react.js": [
            "Children",
            "Component",
            "PropTypes",
            "createElement",
          ],
          "node_modules/react-dom/index.js": ["render"],
          "node_modules/react-is/index.js": ["isValidElementType"],
          "node_modules/prop-types/index.js": ["elementType"],
          "react-dom": Object.keys(reactDom), // Ensure all exports from react-dom are included
          react: Object.keys(react), // Ensure all exports from react are included
        },
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
