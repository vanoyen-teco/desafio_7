const { Productos } = require('./clases/Productos.js');
const { Producto } = require('./clases/Producto.js');
const { mariaDbConfig } = require('./modules/knewCongif.js');


const productos = new Productos(mariaDbConfig, 'productos');

async function getProductos(){
    const prods = await productos.getAll();
    return (prods)?prods:{ error : 'No hay productos' };
    
}

function saveProducto(params){
    try {  
        if(typeof params.titulo !== 'undefined' && typeof params.precio !== 'undefined' && typeof params.thumbnail !== 'undefined'){
            const {titulo, precio, thumbnail} = params; 
            const prod = new Producto(titulo, precio, thumbnail);
            return productos.save(prod);
        }else{
            return false;
        }
    } catch (e) {  
        return false;  
    }  
}


module.exports = {
    getProductos,
    saveProducto,
};