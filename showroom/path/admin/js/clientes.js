$(document).ready(function () {
    var datatable = $('#clientes-table').DataTable({
        "processing": true,
        "serverSide": true,
        "order": [],
        "cache": true,
        "ajax": {
            url: "../../db/consultas/clientesFetch.php",
            type: "POST",
            "dataSrc": "data"
        },
        createdRow: function (row, data, rowIndex) {
            $.each($('td', row), function (colIndex) {
                if (colIndex == 1) {
                    $(this).attr('data-name', 'nombre');
                    $(this).attr('class', 'nombre');
                    $(this).attr('data-type', 'text');
                    $(this).attr('data-pk', data[0]);
                    $(this).attr('data-action', 'update');
                }
                if (colIndex == 2) {
                    $(this).attr('data-name', 'email');
                    $(this).attr('class', 'email');
                    $(this).attr('data-type', 'text');
                    $(this).attr('data-pk', data[0]);
                    $(this).attr('data-action', 'update');
                }
            });
        }
    });
    $('#clientes-table').on('click', '#deleteRow', function () {
        var id = 0;
        var $conceptos = $(this).closest("tr");
        $valores = $conceptos.find("td");
        $.each($valores, function (index) {
            cellValue = $(this).text();
            if (index == 0) {
                id = cellValue;
            }
        });
        console.log(id);
        swal({
            title: "Estas seguro?",
            text: "Confirma por favor",
            icon: "warning",
            buttons: [
                'No',
                'Yes'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: 'Exito!',
                    text: 'Cliente borrado',
                    icon: 'success'
                }).then(function () {


                    $.ajax({
                        type: "POST",
                        url: "../../db/consultas/clientesAction.php",
                        data: { pk: id, action: 'delete' },
                        error: function (resp) {
                            console.log(resp);
                        },
                        success: function (data) {
                            datatable.ajax.reload();
                        }
                    });
                });
            } else {
                swal("Cancelled", "cancelado", "error");
            }
        })
    });
    $('#clientes-table').editable({
        mode: 'inline',
        container: 'body',
        selector: 'td.nombre',
        url: '../../db/consultas/clientesAction.php',
        title: 'nombre',
        value: {
            action: 'update'
        },
        ajaxOptions: {
            type: 'post'
        },
        success: function (data) {
            console.log(data);

        },
        validate: function (value) {
            if ($.trim(value) == '') {
                return 'This field is required';
            }
        }
    });

    $('#clientes-table').editable({
        mode: 'inline',
        container: 'body',
        selector: 'td.email',
        url: '../../db/consultas/clientesAction.php',
        title: 'email',
        value: {
            action: 'update'
        },
        ajaxOptions: {
            type: 'post'
        },
        success: function (data) {
            console.log(data);
        },
        validate: function (value) {
            if ($.trim(value) == '') {
                return 'This field is required';
            }
        }
    });
    $(document).on("click", "#guardarcliente", function () {
        var email = $("#emailcliente").val();
        var cliente = $("#nomcliente").val();
        var nombre = $("#nombre").html();
        $.ajax({
            method: 'POST',
            type: 'text',
            url: '../../db/consultas/guardarcliente.php',
            data: { email: email, cliente: cliente, nombre: nombre },
            success: function (data) {
                swal("Alerta", "Exito", "success");
                datatable.ajax.reload();
            },
            error: function (resp) {
                swal("Alerta", resp, "warning");
                console.log(resp);
            }
        });
    });

}); 