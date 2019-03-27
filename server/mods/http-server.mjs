import { core } from "../index";
import http from "http";
import url from "url";

/* ToDo: escapeHTML */

const capitalize = s => s.charAt(0).toUpperCase() + s.substring(1);

export default {
    name: "http",
    init() {
        const port = core.mods.config.httpPort || 8000;
        const server = http.createServer((req, res) => {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                'Access-Control-Max-Age': 2592000,
                'Content-Type': 'text/json'
            };
            
            if (req.method === 'OPTIONS') {
                res.writeHead(204, headers);
                res.end();
                return;
            }

            const reqURL = url.parse(req.url, true);
            console.log("[HTTP]", req.method, reqURL.pathname);

            const a = reqURL.pathname.split("/");
            if (a.length > 1) {
                const name = capitalize(a[1]);
                const type = req.method.toLowerCase();
                const method = type + name;

                if (this[method]) {
                    this[method](req, res).then(a => {
                        if (!a) a = {};
                        if (!a.code) a = {code: "ok", ...a};
                        res.writeHead(200, headers);
                        res.end(JSON.stringify(a));
                    });
                    return;
                }
            }
            
            res.end();
        });

        server.on('clientError', (err, socket) => {
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
          });
        server.listen(port);
        core.nfo("Listening on port "+port);
    },
    getFoo: async (req, res) => {
        return {foo: "bar"};
    },
    getComments: async (req, res) => {
        var rows = await core.query("SELECT * FROM `comments` ORDER BY dtCreated ASC");
        return {comments: rows};
    },
    postComment: async (req, res) => {
        const a = await new Promise(resolve => {
            var jsonString = '';

            req.on('data', function (data) {
                jsonString += data;
            });

            req.on('end', function () {
                const body = JSON.parse(jsonString);
                console.log("Got JSON data", body);
                resolve(body);
            });
        });

        const id = await core.query("INSERT INTO `comments` SET ?", a).then(r => r.insertId);

        return {id: id};
    }
};