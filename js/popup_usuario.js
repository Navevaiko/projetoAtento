$(function() {
    var url = new URL(window.location.href);
    var modo = url.searchParams.get("m");
    var cargo_selecionado = 0;
    var lider_selecionado = 0;
    var id_usuarioEdit = 0;
    usuario = null;

    if(modo == "edit") {
        $("#popup").fadeIn();
        usuario = $.parseJSON(localStorage.getItem("usuario"));
        
        cargo_selecionado = usuario.cargo_id;
        lider_selecionado = usuario.lider_id;
        id_usuarioEdit = usuario.rg_cpf;

        $("#txt_nome").val(usuario.nome);
        $("#edit_imgDetalhes").css("background", "url(" + usuario.caminho_foto + ") center / cover no-repeat");
        $("#txt_rg").val(usuario.rg_cpf);
        $("#txt_dtNascimento").val(formatar_data(usuario.dt_nascimento, "BANCO"));
        $("#txt_dtAdmissao").val(formatar_data(usuario.dt_admissao, "BANCO"));
        $("#txt_email").val(usuario.email);
        $(".salvar").addClass("info");

        $(".salvar").click(salvar_edicao);
    
    }else if(modo == "add"){
        $("#popup").fadeIn();

        $("#txt_rg").prop("disabled", false);
        $(".salvar").addClass("sucesso");
        $(".salvar").text("Salvar cadastro");

        $(".salvar").click(salvar_usuario);
    }

    $("#fake_fileButton").click(function() { $("#fl_imgUsuario").trigger("click"); });
    $("#fl_imgUsuario").change(function() {
        var arquivo = $(this)[0].files[0];

        var reader = new FileReader();

        reader.onload = function(e) {
            $("#edit_imgDetalhes").css("background", "url(" + e.target.result + ") center / cover no-repeat");
        }

        reader.readAsDataURL(arquivo);
    });

    carregarCargo(cargo_selecionado);
    carregarLider(lider_selecionado, id_usuarioEdit);
});

function formatar_data(data, formato) {
    var data_formatada = "";

    switch(formato.toUpperCase()) {
        case 'BANCO':
            data_formatada = data.split("/");
            data_formatada = data_formatada[2] + "-" + data_formatada[1] + "-" + data_formatada[0];
            
            break;
        
        case 'USUARIO':
            break;
    }

    return data_formatada; 
}

function carregarCargo(cargo_selecionado) {
    $.getJSON("db/consultar_cargo.php", function(cargos) {
        for(var x in cargos) {
            var cargo = cargos[x];
            var selecionado = false;

            if(cargo.cargo_id == cargo_selecionado) selecionado = true;
            else selecionado = false;

            var el_op = $(document.createElement("option")).attr("value", cargo.cargo_id);
                el_op.text(cargo.descricao);
                el_op.prop("selected", selecionado);

            $("#sl_cargo").append(el_op);
        }
    });
}

function carregarLider(lider_selecionado, id_usuarioEdit) {
    $.getJSON("db/consultar_lider.php", {id_usuarioEdit: id_usuarioEdit}, function(lideres) {
        for(var x in lideres) {
            var lider = lideres[x];
            var selecionado = false;

            if(lider.rg_cpf == lider_selecionado) selecionado = true;
            else selecionado = false;

            var el_op = $(document.createElement("option")).attr("value", lider.rg_cpf);
                el_op.text(lider.nome);
                el_op.prop("selected", selecionado);

            $("#sl_lider").append(el_op);
        }
    });
}

function validarCampos(modo) {
    var campos_validos = false;
    var campos_txtValidos = true;
    var campos_slValidos = false;
    var img_valido = (modo == "add") ? $("#fl_imgUsuario").val() != "" : true;

    $(".form_txt").each(function() {
        var txt = $(this).val();

        if(txt == "") {
            $(this).css("border", "solid 2px #c79393");
            campos_txtValidos = false;
        }else{
            $(this).css("border", "solid 1px #aaa");
        }
    });

    $(".form_sl").each(function() {
        var txt = $(this).val();

        if(txt == 0) {
            $(this).css("border", "solid 2px #c79393");
            campos_slValidos = false;
        }else{
            $(this).css("border", "solid 1px #aaa");
        }
    });

    campos_validos = campos_txtValidos && campos_txtValidos && img_valido;
    
    return campos_validos;
}

function salvar_edicao() {
    if(validarCampos("edit")) {
        var formData = coletar_dadosUsuario("edit");
        
        $.ajax({
            url:"db/editar_colaborador.php",
            data: formData,
            processData: false,
            type: 'POST',
            contentType: false,
        }).done(function(resultado) {
            resultado = JSON.parse(resultado);

            switch(resultado.cod_resultado) {
                case "0":
                    alert("Arquivo não movido. Por favor, entre em contato com o administrador do sistema"); 
                    break;
                case "1":
                    alert("Ocorreu algum erro. Por favor, entre em contato com o administrador do sistema");  
                    break;
                case "2": 
                    alert("Edição finalizada com sucesso!");
                    var url = new URL(window.location.href);
                    url.searchParams.set('m', "list");

                    localStorage.removeItem("usuario");
                    
                    window.location.href = url.href;
                    break;
            }
            
            console.log(resultado);
        });
    }else{
        alert("Preencha os campos corretamente");
    }
}

function coletar_dadosUsuario(modo) {
    var nome = $("#txt_nome").val();
    var cargo_id = $("#sl_cargo").val();
    var dt_nascimento = $("#txt_dtNascimento").val();
    var dt_admissao = $("#txt_dtAdmissao").val();
    var lider_id = ($("#sl_lider").val() == 0) ? "" : $("#sl_lider").val();
    var email = $("#txt_email").val();
    var img = $("#fl_imgUsuario")[0].files[0];
    var rg_cpf = (modo == "add") ? $("#txt_rg").val() : usuario.rg_cpf;


    var formData = new FormData();
    formData.append("nome", nome);
    formData.append("cargo_id", cargo_id);
    formData.append("rg_cpf", rg_cpf);
    formData.append("dt_nascimento", dt_nascimento);
    formData.append("dt_admissao", dt_admissao);
    formData.append("lider_id", lider_id);
    formData.append("email", email);
    formData.append("img", img);
    return formData;
}

function salvar_usuario() {
    if(validarCampos("add")) {
        var formData = coletar_dadosUsuario("add");
        
        $.ajax({
            url:"db/inserir_colaborador.php",
            data: formData,
            processData: false,
            type: 'POST',
            contentType: false,
        }).done(function(resultado) {
            resultado = JSON.parse(resultado);

            switch(resultado.cod_resultado) {
                case "0":
                    alert("Arquivo não movido. Por favor, entre em contato com o administrador do sistema"); 
                    break;
                case "1":
                    alert("Ocorreu algum erro. Por favor, entre em contato com o administrador do sistema");  
                    break;
                case "2": 
                    alert("Cadastro finalizada com sucesso!");
                    var url = new URL(window.location.href);
                    url.searchParams.set('m', "list");
                    
                    window.location.href = url.href;
                    break;
            }
            
            console.log(resultado);
        });
    }else{
        alert("Preencha os campos corretamente");
    }
}
