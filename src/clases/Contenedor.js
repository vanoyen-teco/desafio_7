class Contenedor{
    constructor(sqliteConfig, tableName){
        this.sqliteConfig = sqliteConfig;
        this.tableName = tableName;
        this.knex = require('knex')(sqliteConfig);
        this.checkDb();
    }
    async checkDb(){
        const exists_mensajes = await this.knex.schema.hasTable(this.tableName);
        if (!exists_mensajes) {
            await this.knex.schema.createTable(this.tableName, table => {
                table.increments('id').primary().notNull(),
                table.string('user').notNull(),
                table.string('message').notNull(),
                table.string('time')
            })
        }  
    }
    async getAll(){
        try {
            const content = await this.knex.from(this.tableName).select('*');
            return content;
        } catch (error) {
            return false;
        }
    }
    async save(obj){
        await this.knex(this.tableName).insert(obj);
        const res = await this.knex.select().table(this.tableName);
        return (Array.isArray(res) === true)?true:null;
    }
}

module.exports = {
    Contenedor,
};