import core from "../index.js";

export default {
    name: "fakeAjax",
    data: {},
    init() {
        core.nfo("Mod [ "+this.name+" ] init.");
        this.data = this.loadFromLoadStorage() || {
            comments: [
                {id: 1, name: "Вася", email: "vasya@mail.ru", msg: "Сообщение от Василия Пупкина."},
                {id: 2, name: "Маруся", email: "marysia@mail.ru", msg: "Всем привет, я Маруся"},
                {id: 3, name: "Вася", email: "vasya@mail.ru", msg: "Сообщение от Василия Пупкина."},
                {id: 4, name: "Маруся", email: "marysia@mail.ru", msg: "Всем привет, я Маруся"},
                {id: 5, name: "Вася", email: "vasya@mail.ru", msg: "Сообщение от Василия Пупкина."},
            ]
        }; 
        $.fakeAjax = opts => {
            core.mods.process.nextTick(() => {
                opts.url == "/comments" && opts.success(this.data);
                opts.url == "/comment" && opts.method == "POST" && this.faAddComment(opts.data) && opts.success({code: "ok"});
            });
        };
    },
    faAddComment(data) {
        console.log("Adding comment to fake DB.", data);

        data.id = this.data.comments.length+1;
        this.data.comments.push(data);
        this.saveToLocalStorage();

        core.mods.client.renderComments(this.data.comments);
    },
    saveToLocalStorage() {
        localStorage.fakeDB = JSON.stringify(this.data);
    },
    loadFromLoadStorage() {
        if (localStorage.fakeDB) return JSON.parse(localStorage.fakeDB);
        return false;
    }
};