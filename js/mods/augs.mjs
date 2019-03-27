import { core } from "../index.js";

export default {
    init() {
        window.core = core;
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
    }
};