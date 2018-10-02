<?php
    require_once "conexao.php";
    
    $con = conectar();

    $id_usuarioEdit = $_REQUEST['id_usuarioEdit'];

    $query   = "select * from colaborador where rg_cpf <> '".$id_usuarioEdit."';";
    $result  = mysqli_query($con, $query);

    $lst_lideres = [];

    while($rs = mysqli_fetch_array($result)) {
        array_push($lst_lideres, $rs);
    }
    echo json_encode($lst_lideres);
?>