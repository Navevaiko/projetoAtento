<?php
    require_once "conexao.php";
    
    $con = conectar();

    $rg_cpf = $_REQUEST['rg_cpf'];

    $query  = "update colaborador set ativo = 0 where rg_cpf='".$rg_cpf."';";
    $result = mysqli_query($con, $query);

    
    echo intval($result);
?>