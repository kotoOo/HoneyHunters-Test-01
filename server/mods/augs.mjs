import { core } from "../index";
export default {
    init() {
        core.nfo = (s, ...r) => console.info("\x1b[35m"+s+"\x1b[0m", ...r);
    }
};