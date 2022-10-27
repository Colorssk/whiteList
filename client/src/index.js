import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.less";
import "@/styles/index.less";
import "./mock";
import 'ss-ui-library/dist/ss-ui-library.css';
import {default as theme} from './utils/theme'

ReactDOM.render(<App />, document.getElementById("root"));
theme();