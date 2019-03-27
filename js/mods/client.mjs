import core from "../index.js";

export default {
    name: "client",
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
        $.fakeAjax({
            url: "/comments",
            success: function(data) {
                console.log("Success query comments.");
                mod.renderComments(data.comments);
            },
            error: function() {
                console.log("Failed query comments.");
            }
        });
    },
    addComment: data => {
        $.fakeAjax({
            url: "/comment",
            method: "POST", 
            data: data,
            success: function(a) {
                console.log("Success adding comment.");
            },
            error: function() {
                console.log("Failed adding comment.");
            }
        });
    }
};