<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        
        <title> Lista colaboradores </title>

        <link rel="stylesheet" href="css/index.css">

        <script src="js/Jquery.js"></script>
        <script src="js/index.js"></script>
    </head>

    <body>
        <div id="containerPrincipal">
            <?php require_once "popup_usuario.php" ?>
            <div id="listaLado">
                <div class="botao sucesso novo"> Novo usuário </div>
            </div>

            <div id="detalhes">
                <div id="vazio">
                    <div id="icone"></div>
                    <span id="texto"> Selecione um usuário para exibir os detalhes </span>
                </div>
                <div id="detalhes_usuario">
                    <div id="info_principal">
                        <div id="img_detalhes"></div>
    
                        <div id="dados_detalhes">
                            <span id="nome_detalhes"> </span>
                            <span id="nome_cargo">  </span>
                        </div>
    
                        <span id="ult_acesso"> Ult. Acesso: <span id="valor_ultAcesso">  </span> </span>
                    </div>

                    <hr>
    
                    <div id="info_secundaria">
                        <span class="tit_info"> Informações </span>
    
                        <div id="dados_gerais">
                            
                            <div class="dados_secundarios">
                                <div class="item_dados rgCPF">
                                    RG/CPF: <span class="valor_item">  </span>
                                </div>
        
                                <div class="item_dados nascimento">
                                    Nascimento: <span class="valor_item">  </span>
                                </div>
                            </div>
        
                            <div class="dados_secundarios">
                                <div class="item_dados lider">
                                    Lider: <span class="valor_item">  </span>
                                </div>
        
                                <div class="item_dados admissao">
                                    Dt. Admissão: <span class="valor_item">  </span>
                                </div>
                            </div>
    
                        </div>
    
                        <div id="email_detalhes">  </div>
    
                        <div id="opcoes">
                            <div class="botao info editar"> Editar </div>
                            <div class="botao erro deletar"> Deletar </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </body>
</html>