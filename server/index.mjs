import httpServer from "./mods/http-server";
import config from "./mods/config";
import augs from "./mods/augs";
import db from "./mods/db";

export var core = {   /* World #1 micro modular system, as compact as 10 lines of code. It's fully documented inline, please */
    mods: {}, nfo: (s, ...r) => console.info("%c "+s, 'color: #b0e', ...r) /*             use with understanding. It's easy. */
}; /* Rule #1: Declare mods UPPER in code as JS objects, and to ENABLE put them... */
[augs, () => core.nfo("ZEL Microcore v1.2"), config, db, httpServer /* HERE */]
.map(m => { /* Rule #2: Mod MAY declare globally unique "name" field. No name = NOT MOUNTED.  Ex.: Mod {name: "A", ...} will */
    m = typeof m == "function"?m():m; m && m.init && m.init(); m && m.name && (core.mods = {...core.mods, [m.name]: m});
}); /* be MOUNTED to core.mods.A Rule #3: Mods MAY have "init" method. Mods initialized in order of appearance in the array. */
core.nfo("Ready Mods: ", Object.keys(core.mods)); /* [Isomorphic]                     ZEL Microcore v1.2 by Camra Labs, 2019 */