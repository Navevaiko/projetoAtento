<?php
    require_once "conexao.php";
    
    $con = conectar();

    $query   = "select * from cargo;";
    $result  = mysqli_query($con, $query);

    $lst_cargos = [];

    while($rs = mysqli_fetch_array($result)) {
        array_push($lst_cargos, $rs);
    }

    echo json_encode($lst_cargos);
?>