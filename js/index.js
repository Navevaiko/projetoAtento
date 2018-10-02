$(function() {
    lst_usuarios = [];
    carregarUsuarios();

    $(".novo").click(function() {
        window.location.href = "?m=add";
    });
})

function carregarUsuarios()  {
    $.getJSON("db/consultar_colaborador.php", function(retorno) {
        $(".usuario").remove();
        $("#detalhes_usuario").fadeOut(200, function() { $("#vazio").fadeIn(200); });

        lst_usuarios = retorno;

        for(var x in lst_usuarios) {
            var usuario = lst_usuarios[x];
            var primeiro = (x == 0) ? "primeiro" : "";
            $("#listaLado").append(criar_usuario(usuario).addClass(primeiro));
        }
    });
}

function criar_usuario(info) {
    var el_usuario = $(document.createElement("div")).addClass("usuario");
    var el_imgUsuario  = $(document.createElement("div")).addClass("img_usuario");
    var el_nomeUsuario  = $(document.createElement("span")).addClass("nome_usuario");


    el_imgUsuario.css("background", "url(" + info.caminho_foto + ") center / cover no-repeat");
    el_nomeUsuario.text(info.nome);
    
    el_usuario.attr("id", info.rg_cpf);
    el_usuario.append(el_imgUsuario);
    el_usuario.append(el_nomeUsuario);

    el_usuario.click(abrirDetalhes);

    return el_usuario;
}

function abrirDetalhes() {
    var id = $(this).attr("id");

    $("#vazio").fadeOut(200, function() { $("#detalhes_usuario").fadeIn(200); });

    $(this).addClass("selecionado");

    var index = lst_usuarios.map(function(e) { return e.rg_cpf; }).indexOf(id);
    var usuario = lst_usuarios[index];

    localStorage.setItem("usuario", JSON.stringify(usuario));

    $("#img_detalhes").css("background", "url(" + usuario.caminho_foto + ") center / cover no-repeat");
    $("#nome_detalhes").text(usuario.nome);
    $("#nome_cargo").text(usuario.descricao);
    $("#ult_acesso").children("#valor_ultAcesso").text(usuario.ult_acesso);
    

    $(".rgCPF").children(".valor_item").text(usuario.rg_cpf);
    $(".nascimento").children(".valor_item").text(usuario.dt_nascimento);
    $(".lider").children(".valor_item").text(usuario.lider);
    $(".admissao").children(".valor_item").text(usuario.dt_admissao);
    $("#email_detalhes").text(usuario.email);

    $(".deletar").click(deletar_usuario);
    $(".editar").click(editar_usuario);
}

function deletar_usuario() {
    $.ajax({
        url: "db/deletar_colaborador.php",
        data: {rg_cpf: JSON.parse(localStorage.getItem("usuario")).rg_cpf}
    }).done(function(retorno) {
        if(retorno == 1) {
            alert("Usuário deletado com sucesso");
            carregarUsuarios();
        }else{
            alert("Ocorreu um erro");
        }
    });
}

function editar_usuario() {
    window.location.href = "?m=edit";
}