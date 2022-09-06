function verificarPasswords() {

    // Ontenemos los valores de los campos de contraseñas
    pass1 = document.getElementById('pass1');
    pass2 = document.getElementById('pass2');
    const btncompra = document.getElementById('forward');


    // Verificamos si las constraseñas no coinciden
    if (pass1.value != pass2.value) {

        // Si las constraseñas no coinciden mostramos un mensaje
        document.getElementById("error").classList.add("mostrar");
        document.getElementById("ok").classList.add("ocultar");
                // Desabilitamos el botón de login
      //  document.getElementById("forward").;
             btncompra.disabled = true;



        return false;
    } else {

        // Si las contraseñas coinciden ocultamos el mensaje de error
        document.getElementById("error").classList.remove("mostrar");

        // Mostramos un mensaje mencionando que las Contraseñas coinciden
        document.getElementById("ok").classList.remove("ocultar");
             btncompra.disabled = false;



        // Refrescamos la página (Simulación de envío del formulario)
        //setTimeout(function() {
      //      location.reload();
      //  }, 3000);

        //return true;
    }

}