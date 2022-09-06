<div class="container-fluid">
    <h4>Promociones</h4>
    <form id="addNewPromotion">
        <div class="row">
            <div class="col-lg-3">
                <label for="productoslist">Seleccionar un producto</label>
                <input list="browsers" name="producto" id="productoslist" class="form-control">
                <datalist id="browsers"></datalist>
                <input type="checkbox" id="addall" name = "addall">Crear para toda la marca
            </div>
            <div class="col-lg-3">
                <label for="tipoPromocion">Seleccionar un tipo de promoción</label>
                <select name="tipoPromocion" id="tipoPromocion" class="form-control">
                    <option value="0" selected disabled>Selecciona una opción</option>
                    <option value="Descuento">Descuento</option>
                    <option value="Producto">Producto gratis</option>
                </select>
            </div>
            <div class="col-lg-3">
                <label for="fechaVencimiento">Fecha de vencimiento</label>
                <input type="date" class="form-control" id="fechaVencimiento" name="fechaVencimiento">
            </div>
        </div><!-- /.row -->
        <div class="row" id="descuento" style="display: none;">
            <div class="col-sm-3">
                <label for="porcentajeDescuento">Porcentaje</label>
                <input type="number" class="form-control" id="porcentajeDescuento" name="descuento">
            </div>
            <div class="col-sm-3">
                <input type="button" class="btn btn-success" value="Guardar" id="guardarPromocionDescuento">
            </div>
        </div>
        <div class="row" id="pGratis" style="display: none;">
            <div class="col-sm-3">
                <label for="minimoCompra">Minimo compra</label>
                <input type="number" class="form-control" id="minimoCompra" name="minimoCompra">
            </div>
            <div class="col-sm-3">
                <label for="cantidadGratis">Cantidad gratis</label>
                <input type="number" class="form-control" id="cantidadGratis" name="cantidadGratis">
            </div>
            <div class="col-sm-3">
                <input type="button" class="btn btn-success" value="Guardar" id="guardarPromocionGratis">
            </div>
        </div>
    </form>
    <br> <br><br>
    <div class="row">
        <div class="container-fluid">
            <div class="table-responsive">
                <table class="table" id="promocionesTable" style="table-layout:fixed;width:100%;">
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    <br><br><br>
</div><!-- /.container-fluid -->
<script src="../../js/promociones.js"></script>