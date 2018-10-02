<link rel="stylesheet" href="css/popup_usuario.css">

<script src="js/popup_usuario.js"></script>
    
<div id="popup">
    <div id="container">
        <form action="#" method="post">
            <div id="edit_infoPrincipal">
                <div id="edit_imgDetalhes">
                    <div id="fake_fileButton"></div>
                    <input type="file" name="img_usuario" id="fl_imgUsuario" />
                </div>

                <div id="edit_dadosDetalhes">
                    <label class="form_lbl">Nome:</label>
                    <input type="text" name="txt_nome" id="txt_nome" class="form_txt" placeholder="Nome" />

                    <label class="form_lbl">Cargo:</label>
                    <select name="sl_cargo" id="sl_cargo" class="form_sl">
                        <option value="0"> Selecione um cargo </option>
                    </select>
                </div>
            </div>

             <hr>

             <div id="edit_infoSecundaria">
                <span class="tit_info"> Informações </span>

                <div id="edit_dadosGerais">
                    
                    <div class="dados_secundarios">
                        <label class="form_lbl">RG/CPF:</label>
                        <input type="text" name="txt_rg" id="txt_rg" placeholder="RG/CPF" class="form_txt" disabled="true"/>

                        <label class="form_lbl">Nascimento:</label> 
                        <input type="date" name="txt_dtNascimento" id="txt_dtNascimento" class="form_txt" />
                    </div>

                    <div class="dados_secundarios">
                        <label class="form_lbl">Lider:</label>
                        <select name="sl_lider" id="sl_lider" class="form_sl">
                            <option value="0"> Selecione um líder </option>
                        </select>

                        <label class="form_lbl">Admissão:</label> 
                        <input type="date" name="txt_dtAdmissao" id="txt_dtAdmissao" class="form_txt" />
                    </div>

                </div>

                <label class="form_lbl lbl_email">Email:</label>
                <input type="text" name="txt_email" id="txt_email" placeholder="Email" class="form_txt" />

                <div class="botao salvar"> Salvar edição </div>
            </div>
        </form>
    </div>
</div>