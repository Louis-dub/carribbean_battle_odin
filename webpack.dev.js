import { merge } from "webpack-merge";
import config from "./webpack.common.js";

export default merge(config, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        static: "./dist",
        open: true,
    },
});
