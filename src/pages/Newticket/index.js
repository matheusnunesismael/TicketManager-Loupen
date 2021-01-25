
import '../Main/styles.css'
import './styles.css'

import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';

export default function Newticket(){
    return(
        <div>
            <input id="menu-hamburguer" type="checkbox" className="inputHamburguer"/>
            <label for="menu-hamburguer">
                <div className="menu">
                    <span className="hamburguer"></span>
                </div>
            </label>
            <div className="contextMenu">
                <div className="conatinerContext">
                    <div className="topBarContext">
                        <div className="topBarContainer">
                            <img src={ iconeLoupen } alt="userImage" className="imageIconContext"/>
                            <div className="textUserName">
                                NomeUsuario
                            </div>
                        </div>  
                    </div>
                    <div className="contextOption">
                        Listar Tickets
                    </div>
                    <div className="contextOption">
                        Novo Ticket
                    </div>
                    <div className="contextOptionExit">
                        Sair
                    </div>
                </div>
                <label htmlFor="">
                    <div>

                    </div>
                </label>
            </div>
            
            <div className="contentContainerMain">
                <div className="topBarContent">
                    <img src={iconeFreshdesk} alt="FreshdeskTaskManager" className="logoFrashdeskTopBar"/>
                    <div className="formContainerInput">
                        <form action="">
                            <input type="search" placeholder="Buscar Ticket" className="inputSearchTopBar"/>  
                        </form>
                    </div>
                </div>
                <div className="formContent">
                    <div className="tituloNewticket">
                        Novo Ticket
                    </div>
                    
                    <div className="formcontainer">
                        <form action="" className="formNewTicket">

                            <div className="inputDescription">Contato</div>  
                            <input type="text" className="formInput" name="contato"/>

                            <div className="inputDescription">Cc</div>  
                            <input type="text" className="formInput" name="cc_emails"/>

                            <div className="inputDescription">Tipo</div>  
                            <select name="type" id="type" className="formInput formSelect">
                                <option value="null">--</option>
                                <option value="Mercado Livre">MercadoLivre</option>
                                <option value="Reclame Aqui">Reclame Aqui</option>
                            </select>

                            <div className="inputsMercadoLivre">

                                <div className="inputDescription">Tipo do ticket</div>  
                                <select name="cf_tipo_do_ticket264377" id="type" className="formInput formSelect">
                                    <option value="null">--</option>
                                    <option value="Questões">Questões</option>
                                    <option value="Compras">Compras</option>
                                    <option value="Mensagem">Mensagem</option>
                                </select>

                                <div className="inputDescription">Usuário</div>  
                                <input name="cf_usurio331473" type="text" className="formInput"/>
                            </div>
                            <div className="inputsReclameAqui">

                                <div className="inputDescription">Reclame Aqui id</div>  
                                <input name="cf_reclame_aqui_id" type="number" className="formInput"/>
                                
                                <div className="inputDescription">source_external_id</div>
                                <input name="cf_source_external_id" type="number" className="formInput"/>
                                
                                <div className="inputDescription">Empresa recebendo a reclamação</div>
                                <input name="cf_empresa_recebendo_a_reclamao" type="text" className="formInput"/>
                                
                                <div className="checkboxForm">
                                    <input name="cf_cliente_voltou_a_fazer_negocio" type="checkbox"/>
                                    Cliente voltou a fazer negocio?
                                </div>
                                
                                <div className="inputDescription">Quantidade de comentarios de outros usuários</div>
                                <input name="cf_quantidade_de_comentarios_de_outros_usuarios" type="number" className="formInput"/>
                                
                                <div className="checkboxForm">
                                    <input name="cf_ticket_congelado_mais_de_30_dias_sem_resposta" type="checkbox"/>
                                    Ticket congelado mais de 30 dias sem resposta
                                </div>

                                <div className="inputDescription">Sentimento do consumidor</div>
                                <input name="cf_sentimento_do_consumidor" type="text" className="formInput"/>
                                
                                <div className="inputDescription">Motivo da reclamacao</div>
                                <input name="cf_motivo_da_reclamacao" type="text" className="formInput"/>
                                
                                <div className="inputDescription">Status do ticket do reclame aqui</div>
                                <select name="cf_status_do_ticket_no_reclame_aqui" id="type" className="formInput formSelect">
                                    <option value="null">--</option>
                                    <option value="Não respondido">Não respondido</option>
                                    <option value="Respondido">Respondido</option>
                                    <option value="Réplica do consumidor">Réplica do consumidor</option>
                                    <option value="Réplica da empresa">Réplica da empresa</option>
                                    <option value="Avaliado">Avaliado</option>
                                    <option value="Congelado">Congelado</option>
                                    <option value="Desativado pelo consumidor">Desativado pelo consumidor</option>
                                    <option value="Inativa no ReclameAQUI">Inativa no ReclameAQUI</option>
                                    <option value="Avaliado Resolvido">Avaliado Resolvido</option>
                                    <option value="Avaliado Não Resolvido">Avaliado Não Resolvido</option>
                                    <option value="Resposta">Resposta</option>   
                                </select>
                                <div className="checkboxForm">
                                    <input name="cf_solicitacao_para_o_cliente_avaliar_o_ticket" type="checkbox"/>
                                    Solicitaçãopara o cliente avaliar o ticket?
                                </div>
                                <div className="checkboxForm">
                                    <input name="cf_existe_um_pedido_de_moderacao" type="checkbox"/>
                                    Existe um pedido de moderação?
                                </div>

                                <div className="inputDescription">Quantidade de solicitações demoderação</div>
                                <input name="cf_quantidade_de_solicitacoes_de_moderacao" type="number" className="formInput"/>
                                
                                <div className="inputDescription">tipo de resposta</div>
                                <select name="cf_tipo_de_resposta" id="type" className="formInput formSelect">
                                    <option value="null">--</option>
                                    <option value="Publica">Publica</option>
                                    <option value="Privada">Privada</option>
                                </select>
                            </div>

                            <div className="inputDescription">Assunto</div>
                            <input name="subject" type="text" className="formInput" />

                            <div className="inputDescription">Status</div>
                            <select name="status" id="status" className="formInput formSelect">
                                <option value="2" selected>Aberto</option>
                                <option value="18">Teste</option>
                                <option value="3">Pendente</option>
                                <option value="4">Resolvido</option>
                                <option value="5">Fechado</option>
                                <option value="23">EM DESENV</option>   
                            </select>

                            <div className="inputDescription">Origem</div>
                            <select name="source" id="status" className="formInput formSelect">
                                <option value="3" selected>Telefone</option> 
                            </select>                
                            <select name="group_id" id="status" className="formInput formSelect">
                                <option value="null">--</option>
                                <option value="8000080433">Acesso de cliente</option>
                                
                            </select>
                            <select name="responder_id" id="status" className="formInput formSelect">
                                <option value="null">--</option>
                                <option value="idanalista">analista</option>
                            </select>

                            <input name="tags" type="text" className="formInput"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}