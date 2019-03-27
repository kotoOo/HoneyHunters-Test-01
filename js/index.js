import process from "./mods/process.mjs";
import fakeAjax from "./mods/fake-ajax.mjs";
import client from "./mods/client.mjs";

var core = { /* World #1 micro modular system, as compact as 10 lines of code. It's fully documented inline, please use with */
    nfo: (s, ...r) => console.info("%c "+s, 'color: #b0e', ...r) /*  understanding. It's easy. Rule #1: Mods HAVE TO declare */
}; core.nfo("ZEL Microcore v1.0"); coreAugs(); core.mods = ( /* unique "name" field.   Ex.: YOU GIVE {name: "modA", ...} ->  */
    mods => Object.assign({}, ...mods.map(m => ({[m.name]: m.init?(m.init()||m):m}))) /* -> YOU GET core.mods.modA.[methods] */
) /* Rule #2: Mods MAY have "init" method, which returns NOTHING. Rule #3: We declare mods UPPER in code as JS objects, and, */
/* to be ENABLED, put them */ ([process, fakeAjax, client /* HERE */ ]);                                                        
/* Mods initialized in order of appearance in the array. Rule #5: All core.[methods], needed BEFORE mods init you INSTALL in */
core.nfo("Ready Mods: ", Object.keys(core.mods)); function coreAugs() { /* <==== THIS function. Core augmentation is typical */
    core.method = () => {}; /* pattern in ZEL system to provide easy-to-access, often used methods, globally, without global */
    
    ($ => {
        core.gather = selector => {
            var data = {};          
            const dom = (typeof(selector)=='string')?$(selector):selector;
            dom.find("input, textarea, select").each(function() {
                const key = $(this).attr("v-bind");
                const value = $(this).val();
                if ($(this).is('input[type="checkbox"]')) {
                    data[key] = $(this).is(":checked")?1:0;
                } else if ($(this).is('input[type="radio"]')) {
                    if ($(this).is(":checked")) data[key] = value;
                } else {
                    data[key] = value;
                }
            });
            
            return data;
        };
    })(jQuery);
} /* namespace junking.                                                               ZEL Microcore v1.0 by Camra Labs, 2019 */

/* Imperatives */
($ => {
    console.log("Imperatives start...");

    core.mods.client.queryComments();

    $("section.add-comment").on("click", "button.btn-primary", function(e) {
        e.preventDefault();

        const form = $("section.add-comment form");
        const data = core.gather(form);
        console.log("gathered", data);
        core.mods.client.addComment(data);
    });
})(jQuery);

export default core;