import React from "react";

const guardarPedido = (cliente, fechaPedido, productosSeleccionados, total) => {
    const pedidoGuardado = {
      cliente: cliente,
      fechaPedido: fechaPedido,
      productos: productosSeleccionados,
      total: total,
    };
  
    // Imprimir el objeto en la consola
    console.log(pedidoGuardado);
  
    // Aquí puedes realizar cualquier otra acción, como enviar los datos a una API o guardarlos en una base de datos.
  };
  
  export default guardarPedido;