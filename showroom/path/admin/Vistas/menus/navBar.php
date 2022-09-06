
  <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3" id = "openmodal"></span>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:;">Rosa Mexicano</a>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navigation" style = "background:#f4f3ef">
           
            <ul class="navbar-nav">
              <li class="nav-item">
                <p>
                    <span class = "content-desktop" id = "btn1caja" >
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#cajaModal" id="modal1">Abrir/Cerrar caja</button>
                    </span>
                </p>
                <p>
                    <span class="content-mobile">
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#cajaModal" id="modal1">Abrir/Cerrar caja</button>
                    </span>
                </p>
             </li>
             <li class="nav-item">
                  <p>
                    <span class = "content-desktop" id = "btn2sal">
                        <button type="button" class="btn btn-danger" id="salidasModalbtn">Salidas de caja</button>
                    </span>
                  </p>
                  <p>
                    <span class="content-mobile">
                        <button type="button" class="btn btn-danger" id="salidasModalbtn">Salidas de caja</button>
                    </span>
                  
                  </p>
                </li>
                
                
               
                
                
                <li class="nav-item">
                <p>
                 <span class = "content-desktop" id="salirbtn">
                     <a class="btn btn-danger" href="../../db/conexiones/cerrarSesion.php"> Salir</a></span>
                  </p>
                  <p>
                    <span class="content-mobile"> 
                    <a class="btn btn-danger" href="../../db/conexiones/cerrarSesion.php"> Salir</a></span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>  <!-- Modal -->

  <div class="modal fade" id="cajaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Abrir/cerrar caja</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
          <div class="col-lg-5">
            <label>Fecha</label>
            <input type="date" id="fechaCaja" class="form-control">
            <label>Acción</label>
            <select class="form-control" id="accioncaja">
              <option value="1">Abrir día</option>
              <option value="2">Cerrar día</option>
            </select>
            <label>Saldo</label>
            <input type="number" id="saldocaja" class="form-control">
          </div>
          </div><br>
          <h5>Consulta</h5>
           <input type="date" class="form-control"  id="consultacaja"><br>
          <div class="row">
           
                      <div id = "cortecajadiv" class="table-responsive">
                              <table class="table tblpol" id = "cortecaja">
                              
                              <tfoot>
                                          <tr>
                                              <th></th>
                                              <th></th>
                                              <th></th>
                                              <th></th>
                                              <th></th>
                                             
                                               
                                         </tr>
                                      </tfoot>
                          </table>
                      </div>

                      <div id="notaaper" style="display: none">
                      <table class="table">
                        <tr>
                          <th scope="col">Fecha</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Saldo</th>
                          <th scope="col">Sistema</th>
                          <th scope="col">Usuario</th>
                        </tr>
                        <tr>
                          <td id="fecha0"></td>
                          <td id="estado0"></td>
                          <td id="saldo0"></td>
                          <td id="saldosistema0"></td>
                          <td id="usuario0"></td>
                        </tr>
                        <tr>
                          <td id = "fecha1"></td>
                          <td id = "estado1"></td>
                          <td id = "saldo1"></td>
                          <td id = "saldosistema1"></td>
                          <td id = "usuario1"></td>
                        </tr>
                      </table>
                      </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" id="cajaguardar">Guardar</button>
          <button type="button" class="btn btn-default" id="cajaconsulta">Consultar</button>
          <button type="button" class="btn btn-default" id="impNota">Imprimir</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="salidasModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Egresos caja</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="col-lg-5">
            <label>ID</label>
            <p id = "idEgreso"></p>
            <label>Fecha</label>
            <input type="date" id="fechaEgreso" class="form-control">
            <label>Concepto</label>
            <input type="text" id="concEgreso" class="form-control"><br>
            <div class="form-group">
                        <input class="form-control" type="text" name="key" id="key" placeholder="Proveedor..." autocomplete="false">
                                <span class="input-group-btn">
                                </span>
                                <div id="suggestions"></div>
                   </div>
            <label>Monto</label>
            <input type="number" id="saldoEgreso" class="form-control">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="cerrarEgreso">Cerrar</button>
          <button type="button" class="btn btn-primary" id="egresosguardar">Guardar</button> 
        </div>

      </div>
    </div>
  </div>
