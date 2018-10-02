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
    @$img = $_FILES['img'];
    
    $upload_foto = "";
    $lider_id = ($lider_id == "") ? "null" : "'".$lider_id."'";

    $resposta = array("cod_resultado" => "0", "mensagem" => 'Arquivo não movido');

    if($img != null) {
        $caminho_banco = "img/usuarios/".basename($img['name']);
        
        if(!move_uploaded_file($img['tmp_name'], "../".$caminho_banco)) {
            die(json_encode($resposta));
        }else{
            $upload_foto = ", caminho_foto = '".$caminho_banco."' ";
        }
    }

    $query  = "update colaborador set nome = '".$nome."', cargo_id = ".$cargo_id.", email = '".$email."', ";
    $query .= "dt_nascimento = '".$dt_nascimento."', dt_admissao = '".$dt_admissao."', lider_id = ".$lider_id.", ult_acesso = now() ";
    $query .= $upload_foto. "where rg_cpf = '".$rg_cpf."';";
    
    $result = mysqli_query($con, $query) or die(json_encode($resposta = array('cod_resultado' => '1', 'mensagem' => mysqli_error($con))));

    $resposta = array("cod_resultado" => "2", "mensagem" => 'Edição concluida com sucesso');

    echo json_encode($resposta);
?>