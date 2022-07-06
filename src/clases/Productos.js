class Productos{
    constructor(mariaDbConfig, tableName){
        this.mariaDbConfig = mariaDbConfig;
        this.tableName = tableName;
        this.knex = require('knex')(mariaDbConfig);
        this.checkDb();
    }

    async checkDb(){
        const exists_productos = await this.knex.schema.hasTable(this.tableName);
        if (!exists_productos) {
            await this.knex.schema.createTable(this.tableName, table => {
                table.increments('id').primary().notNull(),
                table.string('titulo').notNull(),
                table.float('precio').notNull(),
                table.string('thumbnail')
            })
        }  
    }

    async getAll(){
        const content = await this.knex.from(this.tableName).select();
        const res = Object.values(JSON.parse(JSON.stringify(content)));
        return (content)?res:false;
    }
    isValidProduct(obj){
        let titulo = obj.titulo;
        let precio = obj.precio;
        // validación sencilla.
        if(titulo == '' || precio == ''){
            return false;
        }else{
            return true;
        }
    }
    async save(obj){
        if(this.isValidProduct(obj)){
            await this.knex(this.tableName).insert(obj);
            const res = await this.knex.select().table(this.tableName);
            return (Array.isArray(res) === true)?this.getAll():null;
        }else{
            return false;
        }
    }
}

module.exports = {
    Productos,
};