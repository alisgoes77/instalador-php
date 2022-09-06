var count = 0;
$(document).on('click', '#mainLogin', function () {
    var user = $("#email").val();
    var pass = $("#password").val();
    if (document.getElementById('provaccess').checked) {
        swal("Alerta", "Proveedor seleccionado", "warning");
        if (user == "" || pass == "") {
            swal("Alerta", "Por favor rellena todos los datos", "warning");
        } else {
            $.ajax({
                url: "../../db/consultas/loginValidatorProvee.php",
                type: "post",
                data: { user: user, pass: pass },
                async: true,
                beforeSend: function () {
                },
                complete: function () {
                },
                error: function (resp) {
                    console.log(resp);
                },
                success: function (resp) {
                    if (resp.return == 1) {
                        location.href = "main2.php"

                    } else {
                        count++;
                        if (count <= 5) {
                            $("#alert").html("Datos equivocados");
                            setTimeout(function () {
                                $('#mydiv').html("");
                            }, 1000); // <-- time in milliseconds
                        } else {
                            $("#alert").html("Si olvido sus datos favor comuniquese a Rosa Mexicano");
                            setTimeout(function () {
                                $('#mydiv').html("");
                            }, 1000);
                        }

                    }
                }
            })
        }
    } else {
        if (user == "" || pass == "") {
            swal("Alerta", "Por favor rellena todos los datos", "warning");
        } else {
            $.ajax({
                url: "../../db/consultas/loginValidator.php",
                type: "post",
                data: { user: user, pass: pass },
                async: true,
                beforeSend: function () {
                },
                complete: function () {
                },
                error: function (resp) {
                    console.log(resp);
                },
                success: function (resp) {
                    if (resp.return == 1) {
                        location.href = "main2.php"
                    } else {
                        count++;
                        if (count <= 5) {
                            $("#alert").html("Datos equivocados");
                            setTimeout(function () {
                                $('#mydiv').html("");
                            }, 1000); // <-- time in milliseconds
                        } else {
                            $("#alert").html("Si olvido sus datos favor comuniquese a Rosa Mexicano");
                            setTimeout(function () {
                                $('#mydiv').html("");
                            }, 1000);
                        }

                    }
                }
            })
        }
    }
})



