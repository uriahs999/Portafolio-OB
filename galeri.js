//variables que mantienen estado visible car

var car_visible = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

function ready() {

  
    //funcionalidad de botones eliminar dentro del car

    var botones_eliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i=0; i < botones_eliminarItem.length; i++){
      
    var button = botones_eliminarItem[i];
        button.addEventListener('click', eliminarItem_car);
        
    }


    //    funcionalidad del boton sumar
    var boton_sumarcantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < boton_sumarcantidad.length; i++){
        var button = boton_sumarcantidad[i];
        button.addEventListener('click', sumarcantidad);
    }


    //    funcionalidad del boton resta
    var boton_restarcantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < boton_restarcantidad.length; i++) {
        var button = boton_restarcantidad[i];
        button.addEventListener('click', restarcantidad);
    }

    // // funcionalidad de botones agregar al car
    var botonesagregaralcar = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesagregaralcar.length; i++) {
        var button = botonesagregaralcar[i];
        button.addEventListener('click', agregaralcarclicked);
    }


}

//eliminar Item seleccionando del car

function eliminarItem_car(event) {
    var button_clicked = event.target;
    button_clicked.parentElement.remove();
  

    //si se elimina algo del car se debe actualizar el total

    actualizar_totalcar();

    //para ocultar car si no hay nada seleccionado o si se elimina

    ocultar();

}

//actualiza el total del car
function actualizar_totalcar() {

    //seleccion de contenedor car
    var car_contenedor = document.getElementsByClassName('car')[0];
    var car_items = car_contenedor.getElementsByClassName('car-item');
    var total = 0;

    //recorre todos los elementos del car para actualizar total
    for (var i = 0; i < car_items.length; i++){
        var item = car_items[i];
        var precio_elemento = item.getElementsByClassName('car-item-precio')[0];
        console.log(precio_elemento);

        //se quita el simbolo de dolar y los puntos
        var precio = parseFloat(precio_elemento.innerText.replace('$', '').replace('.', ''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('car-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);

        
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('car-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ' ,00';


}

function ocultar() {
    var car_items = document.getElementsByClassName('car-items')[0];

   if (car_items.childElementCount == 1){
        var car = document.getElementsByClassName('car')[0];
        car.style.marginRigth = '-100%';
        car.style.opacity = '0';
       car_visible = false;
    //    se maximiza el contendor de los elementos
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '1000%';  
   }

}

// Aumento uno a uno  elemento seleccionado
function sumarcantidad(event) {
    var button_clicked = event.target;
    var selector = button_clicked.parentElement;
    var cantidad_actual = selector.getElementsByClassName('car-item-cantidad')[0].value;
    console.log(cantidad_actual);
    cantidad_actual++;
    selector.getElementsByClassName('car-item-cantidad')[0].value = cantidad_actual;
   
    // actualizar total
    actualizar_totalcar();
    
}

// restar uno a uno los elementos
function restarcantidad(event) {
    var button_clicked = event.target;
    var selector = button_clicked.parentElement;
    var cantidad_actual = selector.getElementsByClassName('car-item-cantidad')[0].value;
    console.log(cantidad_actual);
    cantidad_actual--;

    // control que no sea menor a uno
    if (cantidad_actual >= 1) {
        
    selector.getElementsByClassName('car-item-cantidad')[0].value = cantidad_actual;

    // actualizar total
        actualizar_totalcar();
    }  
}

function agregaralcarclicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    // agregar elementos al carrito, se manda por parametros los valores
    agregaritemalcar(titulo, precio, imagenSrc);

    
}


function agregaritemalcar(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = 'items';
    var itemscar = document.getElementsByClassName('car-item')[0]; 
        
    

    // control de item que se ingresan al car para no repeicion
    var nombre_itemscar = itemscar.getElementsByClassName('car-item-titulo');
    for (var i = 0; i < nombre_itemscar.length;i++){
     if(nombre_itemscar[i].innerText==titulo) {
        alert("ya se encuentra en el car");
          return;
         
     }
    }

   
     var itemscar_conte= `
    

    <div class="car-item">
        <img src="${imagenSrc}
" width="80px" alt="" >


   

        <div class="car-item-detalles">

            <span class="car-item-titulo">${titulo}</span>
            <div class="selector-cantidad">

            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="1" class="car-item-cantidad" disabled>

            <i class="fa-solid fa-plus sumar-cantidad"></i>
            </div>
<span class="car-item-precio">${precio}</span>

        </div>

        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>

           `

        item.innerHTML =  itemscar_conte;
        itemscar.append(item);

 



    }


// function agregarItemAlCarrito(titulo, precio, imagenSrc) {
//     var elemento = documento.crearElement('div');
//     elemento.classList.add = ('elemento');
//     var itemscar = documento.getElementsByClassName('car-items')[0];

//     var nombresItemscar = itemcar.getElementsByClassName('car-item-titulo');
//     for (var i = 0; i < nombresItemscar.length; i++) {
//         if (nombresItemscar[i].InnerText == titulo) {
//             alert("El artículo ya se encuentra en el carrito");
//             return;
//         }
// }

//     var itemscar_conte = `
    

//     <div class="car-item">
//         <img src="galery/skinglam.png" width="80px" alt="" >

//         <div class="car-item-detalles">

//             <span class="car-item-titulo">Box Engasse</span>
//             <div class="selector-cantidad">

//             <i class="fa-solid fa-minus restar-cantidad"></i>
//             <input type="text" value="1" class="car-item-cantidad" disabled>

//             <i class="fa-solid fa-plus sumar-cantidad"></i>
//             </div>
// <span class="car-item-precio">$120.000</span>

//         </div>

//         <span class="btn-eliminar">
//             <i class="fa-solid fa-trash"></i>
//         </span>
//     </div>

//            `
    
//     item.innerHTML = itemscar_conte;
//     itemscar.append(item);
    
