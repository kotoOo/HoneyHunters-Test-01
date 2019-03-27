import core from "../index.js";

export default {
    name: "process",
    nextTick: f => setTimeout(f, 0)
};