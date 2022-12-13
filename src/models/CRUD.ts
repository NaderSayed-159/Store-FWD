import Client from "../database";

export class Crud {
    // constructor(tableObject) {
    //     this.tableObject = tableObject;
    // }
    async fetchAll(tableName: string) {
        try {
            const con = await Client.connect();
            const sql = `SELECT * FROM ${tableName}`;
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cant't Fetch ${tableName}: ${err}`)
        }
    }

    async fetchById(tableName: string, id: String) {
        try {
            const con = await Client.connect();
            const sql = `SELECT * FROM ${tableName} WHERE id=($1)`;
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Can't get item form ${tableName}: ${err}`)
        }
    }

}