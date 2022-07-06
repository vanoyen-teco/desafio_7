const socket = io();
let user;
function $ (selector){
    return document.querySelector(selector);
}
function getFormProd(){
    const prod = {};
    prod.titulo = $("input[name='titulo']").value;
    prod.precio = $("input[name='precio']").value;
    prod.thumbnail = $("input[name='thumbnail']").value;
    return prod;
}

(function () {
'use strict'
let forms = document.querySelectorAll('.needs-validation');
Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        }else{
            event.preventDefault();
            event.stopPropagation();
            if(event.target.id == 'altaProducto'){
                socket.emit('new-product', getFormProd());
            }else if(event.target.id == 'formUser'){
                if($("#inp_user").value != ''){
                    user = $("#inp_user").value;
                    $("#userSetted").innerHTML = user;
                    $(".badge-user").classList.remove('d-none');
                    $("#inp_user").blur();
                    $("#formUser").classList.remove('was-validated');
                    $("#formMsg").classList.remove('d-none');
                    $("#formMsg").scrollIntoView();
                    $("#formUser").reset();
                    
                }
            }else if(event.target.id == 'formMsg'){
                let msg = $("#inp_msj").value;
                socket.emit('new-message', msg, user);
            }
        }        
    }, false)
    })
})();

document.querySelectorAll(".btnScrollTo").forEach(btn => {
    btn.addEventListener('click', function handleClick(e) {
        e.preventDefault();
        document.getElementById(this.getAttribute("href")).scrollIntoView();
    });
});

async function refreshProductos (productos){
    const tpl = await fetch('./hbs/items.hbs');
    const baseItems = await tpl.text();
    let fillProds = Handlebars.compile(baseItems);
    $(".productsContainer").innerHTML = fillProds({ productos: productos });
    $("#altaProducto").classList.remove('was-validated');
    $("#altaProducto").reset();
}
async function refreshMessages (messages){
    const tpl = await fetch('./hbs/message.hbs');
    const baseMsgs = await tpl.text();
    let fillMsgs = Handlebars.compile(baseMsgs);
    $("#chatContainer").innerHTML = fillMsgs({ mensajes: messages });
    $("#formMsg").classList.remove('was-validated');
    $("#formMsg").reset();
}


socket.on('refreshProductos', refreshProductos);

//socket.on('refreshUser', refreshUser);

socket.on('refreshMessages', refreshMessages);