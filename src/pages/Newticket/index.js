import React , { useState, useEffect } from 'react';

import '../Main/styles.css'
import './styles.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import  draftToHtml  from 'draftjs-to-html';

// informações obtidas em https://loupendemo.freshdesk.com/api/_/bootstrap/agents_group
import agentsIds from './agentsIds.json';

import api from '../../services/api';


import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';
import { Editor } from "react-draft-wysiwyg";

export default function Newticket(){
    const [email, setemail] = useState(null);
    const [cc_emails, setcc_emails] = useState(null);
    const [type, settype] = useState(null);
    const [cf_tipo_do_ticket264377, setcf_tipo_do_ticket264377] = useState(null);
    const [cf_usurio331473, setcf_usurio331473] = useState(null);
    const [cf_reclame_aqui_id, setcf_reclame_aqui_id] = useState(null);
    const [cf_source_external_id, setcf_source_external_id] = useState(null);
    const [cf_empresa_recebendo_a_reclamao, setcf_empresa_recebendo_a_reclamao] = useState(null);
    const [cf_cliente_voltou_a_fazer_negocio, setcf_cliente_voltou_a_fazer_negocio] = useState(null);
    const [cf_quantidade_de_comentarios_de_outros_usuarios, setcf_quantidade_de_comentarios_de_outros_usuarios] = useState(null);
    const [cf_ticket_congelado_mais_de_30_dias_sem_resposta, setcf_ticket_congelado_mais_de_30_dias_sem_resposta] = useState(null);
    const [cf_sentimento_do_consumidor, setcf_sentimento_do_consumidor] = useState(null);
    const [cf_motivo_da_reclamacao, setcf_motivo_da_reclamacao] = useState(null);
    const [cf_status_do_ticket_no_reclame_aqui, setcf_status_do_ticket_no_reclame_aqui] = useState(null);
    const [cf_solicitacao_para_o_cliente_avaliar_o_ticket, setcf_solicitacao_para_o_cliente_avaliar_o_ticket] = useState(null);
    const [cf_existe_um_pedido_de_moderacao, setcf_existe_um_pedido_de_moderacao] = useState(null);
    const [cf_quantidade_de_solicitacoes_de_moderacao, setcf_quantidade_de_solicitacoes_de_moderacao] = useState(null);
    const [cf_tipo_de_resposta, setcf_tipo_de_resposta] = useState(null);
    const [subject, setsubject] = useState(null);
    const [status, setstatus] = useState(null);
    const [source, setsource] = useState(null);
    const [description, setdescription] = useState(null);
    const [priority, setpriority] = useState(null);
    const [group_id, setgroup_id] = useState("");
    const [responder_id, setresponder_id] = useState(null);
    const [tags, settags] = useState([]);

    const [descEditor, setDescEditor] = useState("");
    const [contentState, setcontentState] = useState("");

    const content = {
        entityMap: {},
        blocks: [
          {
            key: "637gr",
            text: "Initialized from content state.",
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      }


    async function saveTicket(){
        let description_text = contentState.blocks[0].text;
        setdescription(draftToHtml(contentState));
        let ticket ={
            email,
            "cc_emails": [cc_emails],
            type,
            "custom_fields": {
                cf_tipo_do_ticket264377,
                cf_usurio331473,
                cf_reclame_aqui_id,
                cf_source_external_id,
                cf_empresa_recebendo_a_reclamao,
                cf_cliente_voltou_a_fazer_negocio,
                cf_quantidade_de_comentarios_de_outros_usuarios,
                cf_ticket_congelado_mais_de_30_dias_sem_resposta,
                cf_sentimento_do_consumidor,
                cf_motivo_da_reclamacao,
                cf_status_do_ticket_no_reclame_aqui,
                cf_solicitacao_para_o_cliente_avaliar_o_ticket,
                cf_existe_um_pedido_de_moderacao,
                cf_quantidade_de_solicitacoes_de_moderacao,
                cf_tipo_de_resposta
            },
            subject,
            "status" : parseInt(status),
            source,
            "description" : ""+description,
            "priority" : parseInt(priority),
            "group_id" : group_id == "" ? null : group_id,
            responder_id,
            "tags" : tags == []? [] : [""+tags]
        }
        console.log(ticket);
        try {
            await api.post('api/v2/tickets', ticket, {
                auth: {
                    username: "mlmainardes@gmail.com",
                    password: "loupendev"
                }
            })
    
        
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
        return false;
    }




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
                        <div  className="formNewTicket">

                            <div className="inputDescription">Contato</div>  
                            <input type="text" className="formInput" name="email" onChange={e => setemail(e.target.value)} value={email} placeholder ="E-mail do contato"/>

                            <div className="inputDescription">Cc</div>  
                            <input type="text" className="formInput" name="cc_emails" onChange={e => setcc_emails(e.target.value)} value={cc_emails}/>

                            <div className="inputDescription">Tipo</div>  
                            <select name="type" id="type" className="formInput formSelect" onChange={e => settype(e.target.value)} value={type}>
                                <option value="">--</option>
                                <option value="Mercado Livre">Mercado Livre</option>
                                <option value="Reclame Aqui">Reclame Aqui</option>
                            </select>
                            {
                                type === "Mercado Livre"?
                                    <div className="inputsMercadoLivre">
                                        <div className="inputDescription">Tipo do ticket</div>  
                                        <select name="cf_tipo_do_ticket264377" id="type" className="formInput formSelect" onChange={e => setcf_tipo_do_ticket264377(e.target.value)} value={cf_tipo_do_ticket264377}>
                                            <option value="">--</option>
                                            <option value="Questões">Questões</option>
                                            <option value="Compras">Compras</option>
                                            <option value="Mensagem">Mensagem</option>
                                        </select>
                                        <div className="inputDescription">Usuário</div>  
                                        <input name="cf_usurio331473" type="text" className="formInput" onChange={e => setcf_usurio331473(e.target.value)} value={cf_usurio331473}/>
                                    </div>
                                    :
                                    type === "Reclame Aqui"?
                                        <div className="inputsReclameAqui">
                                            <div className="inputDescription">Reclame Aqui id</div>  
                                            <input name="cf_reclame_aqui_id" type="number" className="formInput" onChange={e => setcf_reclame_aqui_id(e.target.value)} value={cf_reclame_aqui_id}/>
                                            <div className="inputDescription">source_external_id</div>
                                            <input name="cf_source_external_id" type="number" className="formInput" onChange={e => setcf_source_external_id(e.target.value)} value={cf_source_external_id}/>  
                                            <div className="inputDescription">Empresa recebendo a reclamação</div>
                                            <input name="cf_empresa_recebendo_a_reclamao" type="text" className="formInput" onChange={e => setcf_empresa_recebendo_a_reclamao(e.target.value)} value={cf_empresa_recebendo_a_reclamao}/> 
                                            <div className="checkboxForm">
                                                <input name="cf_cliente_voltou_a_fazer_negocio" type="checkbox" onChange={e => setcf_cliente_voltou_a_fazer_negocio(e.target.value)} value={cf_cliente_voltou_a_fazer_negocio}/>
                                                Cliente voltou a fazer negocio?
                                            </div>   
                                            <div className="inputDescription">Quantidade de comentarios de outros usuários</div>
                                            <input name="cf_quantidade_de_comentarios_de_outros_usuarios" type="number" className="formInput" onChange={e => setcf_quantidade_de_comentarios_de_outros_usuarios(e.target.value)} value={cf_quantidade_de_comentarios_de_outros_usuarios}/>
                                            <div className="checkboxForm">
                                                <input name="cf_ticket_congelado_mais_de_30_dias_sem_resposta" type="checkbox" onChange={e => setcf_ticket_congelado_mais_de_30_dias_sem_resposta(e.target.value)} value={cf_ticket_congelado_mais_de_30_dias_sem_resposta}/>
                                                Ticket congelado mais de 30 dias sem resposta
                                            </div>
                                            <div className="inputDescription">Sentimento do consumidor</div>
                                            <input name="cf_sentimento_do_consumidor" type="text" className="formInput" onChange={e => setcf_sentimento_do_consumidor(e.target.value)} value={cf_sentimento_do_consumidor}/>
                                            <div className="inputDescription">Motivo da reclamacao</div>
                                            <input name="cf_motivo_da_reclamacao" type="text" className="formInput" onChange={e => setcf_motivo_da_reclamacao(e.target.value)} value={cf_motivo_da_reclamacao}/>                 
                                            <div className="inputDescription">Status do ticket do reclame aqui</div>
                                            <select name="cf_status_do_ticket_no_reclame_aqui" id="type" className="formInput formSelect" onChange={e => setcf_status_do_ticket_no_reclame_aqui(e.target.value)} value={cf_status_do_ticket_no_reclame_aqui}>
                                                <option value="">--</option>
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
                                                <input name="cf_solicitacao_para_o_cliente_avaliar_o_ticket" type="checkbox" onChange={e => setcf_solicitacao_para_o_cliente_avaliar_o_ticket(e.target.value)} value={cf_solicitacao_para_o_cliente_avaliar_o_ticket}/>
                                                Solicitaçãopara o cliente avaliar o ticket?
                                            </div>
                                            <div className="checkboxForm">
                                                <input name="cf_existe_um_pedido_de_moderacao" type="checkbox" onChange={e => setcf_existe_um_pedido_de_moderacao(e.target.value)} value={cf_existe_um_pedido_de_moderacao}/>
                                                Existe um pedido de moderação?
                                            </div>
                                            <div className="inputDescription">Quantidade de solicitações demoderação</div>
                                            <input name="cf_quantidade_de_solicitacoes_de_moderacao" type="number" className="formInput" onChange={e => setcf_quantidade_de_solicitacoes_de_moderacao(e.target.value)} value={cf_quantidade_de_solicitacoes_de_moderacao}/>
                                            <div className="inputDescription">tipo de resposta</div>
                                            <select name="cf_tipo_de_resposta" id="type" className="formInput formSelect" onChange={e => setcf_tipo_de_resposta(e.target.value)} value={cf_tipo_de_resposta}>
                                                <option value="">--</option>
                                                <option value="Publica">Publica</option>
                                                <option value="Privada">Privada</option>
                                            </select>
                                        </div>
                                        :
                                        <></>
                            }
                            
                            

                            <div className="inputDescription">Assunto</div>
                            <input name="subject" type="text" className="formInput" onChange={e => setsubject(e.target.value)} value={subject}/>

                            <div className="inputDescription">Status</div>
                            <select name="status" id="status" className="formInput formSelect" onChange={e => setstatus(e.target.value)} value={status}>
                                <option value="2" selected>Aberto</option>
                                <option value="18">Teste</option>
                                <option value="3">Pendente</option>
                                <option value="4">Resolvido</option>
                                <option value="5">Fechado</option>
                                <option value="23">EM DESENV</option>   
                            </select>

                            <div className="inputDescription">Origem</div>
                            <select name="source" id="status" className="formInput formSelect" onChange={e => setsource(e.target.value)} value={source}>
                                <option value="3" selected>Telefone</option> 
                            </select>





                            <div className="inputDescription">Descrição</div>
                            <Editor
                                initialContentState={content}
                                editorState={descEditor}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={setDescEditor}

                                
                                editorContent={contentState}
                                onContentStateChange={setcontentState}
                            />



                            <div className="inputDescription">Prioridade</div>
                            <select name="priority" id="status" className="formInput formSelect" onChange={e => setpriority(e.target.value)} value={priority}>
                                <option value="1" selected>Baixa</option>
                                <option value="2">Media</option>
                                <option value="3">Alta</option>
                                <option value="4">Urgente</option>  
                            </select>

                            <div className="inputDescription">Grupo</div>
                            <select name="group_id" id="status" className="formInput formSelect" onChange={e => {setgroup_id(e.target.value)}} value={group_id}>
                                <option value="" selected>--</option>
                                {    
                                    agentsIds.data.groups.map(group =>
                                            <option value={group.id}>{group.name}</option>  
                                    )
                                }
                                
                                
                            </select>

                            <div className="inputDescription">Analista</div>
                            <select name="responder_id" id="status" className="formInput formSelect" onChange={e => setresponder_id(e.target.value)} value={responder_id}>
                                <option value="">--</option>
                                { 
                                    // Percorre o documento que guarda as informações dobre os agentes
                                    // em cada grupo e preenche com os agentes pertencentes ao grupo
                                }
                                {
                                    agentsIds.data.agents.map( agent => 
                                        group_id !== ""  ?
                                            agent.group_ids.includes(parseInt(group_id))?
                                                <option value={agent.id}>{agent.contact.name}</option>
                                            :
                                                <></> 
                                        :    
                                            <option value={agent.id}>{agent.contact.name}</option>
                                    )
                                }
                            </select>

                            <div className="inputDescription">Tags</div>                        
                            <input name="tags" type="text" className="formInput" onChange={e => settags(e.target.value)} value={tags}/>

                            <div className="submitContainer">
                                <button className="submitSalvar" type="submit" onClick={()=> saveTicket()}>Salvar</button>
                                <button className="submitCancelar">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}