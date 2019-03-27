import process from "./mods/process.mjs";
import fakeAjax from "./mods/fake-ajax.mjs";
import client from "./mods/client.mjs";
import augs from "./mods/augs.mjs";

export var core = {    /* World #1 micro modular system, as compact as 8 lines of code. It's fully documented inline, please */
    mods: {}, nfo: (s, ...r) => console.info("%c "+s, 'color: #b0e', ...r) /*             use with understanding. It's easy. */
}; /* Rule #1: Declare mods UPPER in code as JS objects, and to ENABLE put them... */
[augs, () => core.nfo("ZEL Microcore v1.2"), process, fakeAjax, client /* HERE */]
.map(m => { /* Rule #2: Mod MAY declare globally unique "name" field. No name = NOT MOUNTED.  Ex.: Mod {name: "A", ...} will */
    m = typeof m == "function"?m():m; m && m.init && m.init(); m && m.name && (core.mods = {...core.mods, [m.name]: m});
}); /* be MOUNTED to core.mods.A Rule #3: Mods MAY have "init" method. Mods initialized in order of appearance in the array. */
core.nfo("Ready Mods: ", Object.keys(core.mods)); /* [Isomorphic]                     ZEL Microcore v1.2 by Camra Labs, 2019 */

/* Imperatives */
($ => {
    client.queryComments();

    $("section.add-comment").on("click", "button.btn-primary", function(e) {
        e.preventDefault();

        const form = $("section.add-comment form");
        const data = core.gather(form);
        console.log("gathered", data);
        try {
            client.validate(data);
            client.addComment(data);
        } catch(e) {
            console.error(e);
        }
    });
})(jQuery);