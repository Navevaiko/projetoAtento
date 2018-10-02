<?php
    require_once "conexao.php";
    
    $con = conectar();

    $query   = "select cl.rg_cpf, cl.nome, cr.descricao, if(isNull(cl2.nome), '-', cl2.nome) as 'lider', cl.email, cl.caminho_foto, cr.cargo_id, cl.lider_id, ";
    $query  .= "date_format(cl.dt_nascimento, '%d/%m/%Y') as 'dt_nascimento', date_format(cl.ult_acesso, '%d/%m/%Y %H:%i:%s') as 'ult_acesso', ";
    $query  .= "date_format(cl.dt_admissao, '%d/%m/%Y') as 'dt_admissao' from colaborador as cl ";
    $query  .= "inner join cargo cr on(cr.cargo_id=cl.cargo_id) ";
    $query  .= "left join colaborador cl2 on(cl2.rg_cpf=cl.lider_id) where cl.ativo = 1;";
    $result  = mysqli_query($con, $query);

    $lst_usuarios = [];

    while($rs = mysqli_fetch_array($result)) {
        array_push($lst_usuarios, $rs);
    }
    echo json_encode($lst_usuarios);
?>