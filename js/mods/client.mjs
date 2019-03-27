import { core } from "../index.js";

export default {
    name: "client",
    api: "https://neutrinobank.io",
    init() {
        core.nfo("Mod [ "+this.name+" ] init.");
        this.queryComments = this.queryComments.bind(this);
    },
    renderComments: values => $("section.comments div.box").html(
        values.map(item => `
    <div class="comment col-12 col-sm-6 col-md-4 col-lg-3" data-id="${item.id}">
        <header class="comment-header"><div>${item.name}</div></header>
        <div class="comment-body">
            <div class="email">${item.email}</div>
            <div class="msg">${item.msg}</div>
        </div>
    </div>
        `)
    ),
    queryComments() {
        const mod = this;
        $.ajax({
            url: mod.api+"/comments",
            success: function(data) {
                console.log("Success query comments.");
                mod.renderComments(data.comments);
            },
            error: function() {
                console.log("Failed query comments.");
            }
        });
    },
    addComment(data) {
        const mod = this;
        $.ajax({
            url: mod.api+"/comment",
            method: "POST", 
            data: data,
            /* data: JSON.stringify(data),
            datatype : "json", */
            success: function(a) {
                console.log("Success adding comment.");
                mod.queryComments();
            },
            error: function() {
                console.log("Failed adding comment.");
            }
        });
    },
    _validateEmail: email => {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
    },
    shakeField: bind => {
        const scope = $('section.add-comment');
        const el = $('input[v-bind="'+bind+'"],textarea[v-bind="'+bind+'"],select[v-bind="'+bind+'"]', scope);
        el.focus().addClass("apply-shake");
        setTimeout(function() {el.removeClass("apply-shake")}, 820);
    },
    validate(data) {
        data.name = data.name.trim();
        if (!data.name) {
            this.shakeField("name");
            throw "Не указано имя.";
        }

        data.email = data.email.trim();
        if (!this._validateEmail(data.email)) {
            this.shakeField("email");
            throw "Недействительный E-Mail."
        }
        
        if (!data.msg.trim()) {
            this.shakeField("msg");
            throw "Пустое сообщение.";
        }
    }
};