import { core } from "/js/index.js";
console.log("in process.js core", core);
export const process = {
    name: "process",
    init() {
        core.nfo("Mod [ "+this.name+" ] init.");
    },
    nextTick: f => setTimeout(f, 0)
};