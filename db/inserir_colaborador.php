<?php
    require_once "conexao.php";

    $con = conectar();


    $nome = $_REQUEST['nome'];
    $cargo_id = $_REQUEST['cargo_id'];
    $rg_cpf = $_REQUEST['rg_cpf'];
    $dt_nascimento = $_REQUEST['dt_nascimento'];
    $dt_admissao = $_REQUEST['dt_admissao'];
    $lider_id = $_REQUEST['lider_id'];
    $email = $_REQUEST['email'];
    $img = $_FILES['img'];
    
    $lider_id = ($lider_id == "") ? "null" : "'".$lider_id."'";

    $resposta = array("cod_resultado" => "0", "mensagem" => 'Arquivo não movido');

    $caminho_banco = "img/usuarios/".basename($img['name']);
    
    if(move_uploaded_file($img['tmp_name'], "../".$caminho_banco)) {
        $query  = "insert into colaborador(rg_cpf, nome, cargo_id, dt_nascimento, dt_admissao, lider_id, email, caminho_foto, ult_acesso) ";
        $query .= "values('".$rg_cpf."', '".$nome."', ".$cargo_id.", '".$dt_nascimento."', '".$dt_admissao."', ".$lider_id.", '".$email."', '".$caminho_banco."', now());";

        $result = mysqli_query($con, $query) or die(json_encode($resposta = array('cod_resultado' => '1', 'mensagem' => mysqli_error($con))));

        $resposta = array("cod_resultado" => "2", "mensagem" => 'Usuario cadastrado com sucesso');
    }else{
        die(json_encode($resposta));
    }

    echo json_encode($resposta);
?>