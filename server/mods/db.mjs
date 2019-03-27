import { core } from "../index";
import mysql from "mysql";
export default {
    name: "db",
    init() {
        this.pool = mysql.createPool({
            host: core.mods.config.db.host,
            user: core.mods.config.db.login,
            password: core.mods.config.db.password,
            database: core.mods.config.db.database   
        });

        core.query = (sql, data, debug = 0) => {
			return new Promise((resolve, reject) => {
				this.pool.query(sql, data, function(err, rows) {
					if (debug) console.log(this.sql);
					err && reject(err);
					!err && resolve(rows);
				});
			});
        };
    }
};