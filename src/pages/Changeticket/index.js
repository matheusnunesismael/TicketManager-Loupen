import React , { useState, useEffect } from 'react';
import { Link , useHistory, useParams } from 'react-router-dom';


import '../Main/styles.css'
import './styles.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import  draftToHtml  from 'draftjs-to-html';

// informações obtidas em https://loupendemo.freshdesk.com/api/_/bootstrap/agents_group
import agentsIds from '../../assets/data/agentsIds.json';

import api from '../../services/api';


import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';
import { Editor } from "react-draft-wysiwyg";

export default function Changeticket(){
    const history = useHistory();
    // id do ticket a ser alterado
    const id = useParams('id')

    // dados de acesso à API
    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');

    // dados do ticket 
    const [ticket, setticket] = useState({});


    // campos para o editor de descrição
    const [descEditor, setDescEditor] = useState("");
    const [contentState, setcontentState] = useState("");

    const changeTicket = (event) => {
        setticket((prevState) => ({
           ...prevState,
           [event.target.name]: event.target.value
        }));
        console.log(ticket)
    }


    useEffect(()=>{
        // carrega os resultados da busca feita na pagina inicial
        if(ticket == false){
            console.log("carregou")
            api.get("tickets/"+id, {
                "auth": {
                    "username" : authLogin,
                    "password" : authPass
                }
            }).then(async response => {
                let ticketResp = response.data;
                let requester = ticketResp.requester_id;
                let requesterResponse;
                try{
                    requesterResponse = await api.get('contacts/'+requester, {  
                        "auth": {
                            "username" : authLogin,
                            "password" : authPass
                        }
                    })
                }catch(err){
                    requesterResponse = null;
                }
                
                let nameUserC = requesterResponse == null? "RequesterName" : requesterResponse.data.name.split('@')[0].split(' ')[0];

                ticketResp.requester_id = "https://ui-avatars.com/api/?name="+nameUserC+"&size=128&background=random";
                ticketResp.responder_id = nameUserC;
                
                console.log(ticketResp);
              
            });
        }
    });

    // ibicialização do editor de texto da descrição
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
        // monta o ticket e o envia para a API
        let description_text = contentState.blocks[0].text;
        console.log(priority);
        setdescription(draftToHtml(contentState));
        let ticket ={
            email,
            "cc_emails": [cc_emails],
            type,
            "custom_fields": {
                cf_tipo_do_ticket264377,
                cf_usurio331473,
                "cf_reclame_aqui_id": cf_reclame_aqui_id == "" ? null : parseInt(cf_reclame_aqui_id),
                "cf_source_external_id" : cf_source_external_id == "" || cf_source_external_id == null ? null : parseInt(cf_source_external_id),
                cf_empresa_recebendo_a_reclamao,
                cf_cliente_voltou_a_fazer_negocio,
                "cf_quantidade_de_comentarios_de_outros_usuarios": cf_quantidade_de_comentarios_de_outros_usuarios=="" || cf_quantidade_de_comentarios_de_outros_usuarios == null? null : parseInt(cf_quantidade_de_comentarios_de_outros_usuarios),
                cf_ticket_congelado_mais_de_30_dias_sem_resposta,
                cf_sentimento_do_consumidor,
                cf_motivo_da_reclamacao,
                cf_status_do_ticket_no_reclame_aqui,
                cf_solicitacao_para_o_cliente_avaliar_o_ticket,
                cf_existe_um_pedido_de_moderacao,
                "cf_quantidade_de_solicitacoes_de_moderacao" : cf_quantidade_de_solicitacoes_de_moderacao== "" || cf_quantidade_de_solicitacoes_de_moderacao == null? null : parseInt(cf_quantidade_de_solicitacoes_de_moderacao),
                cf_tipo_de_resposta
            },
            subject,
            'status' : parseInt(status),
            source,
            "description" : ""+description,
            "description_text" : description_text,
            "priority" : parseInt(priority),
            group_id,
            responder_id,
            "tags" : tags == []? [] : [""+tags]
        }
        // checa os campos e romove os campos vazios e muda os tipos para os tipos requeridos
        for(let field in ticket){
            if(ticket[field] == null || ticket[field] == undefined || ticket[field] == "")
                delete ticket[field]
            else if(field == 'custom_fields')
                for(let sub_field in ticket[field]){
                    if(ticket[field][sub_field] == null || ticket[field][sub_field] == undefined || ticket[field][sub_field] == "")
                        delete ticket[field][sub_field]
                    
                }
        }
        console.log(cf_cliente_voltou_a_fazer_negocio);
        console.log(ticket);
        try {
            await api.post('tickets', ticket, {
                auth: {
                    username: authLogin,
                    password: authPass
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
                            <input type="text" className="formInput" name="email" onChange={changeTicket} value={ticket.email} placeholder ="E-mail do contato"/>

                            <div className="inputDescription">Cc</div>  
                            <input type="text" className="formInput" name="cc_emails" onChange={e => setcc_emails(e.target.value)} value={ticket.cc_emails}/>

                            <div className="inputDescription">Tipo</div>  
                            <select name="type" id="type" className="formInput formSelect" onChange={e => settype(e.target.value)} value={ticket.type}>
                                <option value="">--</option>
                                <option value="Mercado Livre">Mercado Livre</option>
                                <option value="Reclame Aqui">Reclame Aqui</option>
                            </select>
                            {
                                type === "Mercado Livre"?
                                    <div className="inputsMercadoLivre">
                                        <div className="inputDescription">Tipo do ticket</div>  
                                        <select name="cf_tipo_do_ticket264377" id="type" className="formInput formSelect" onChange={e => setcf_tipo_do_ticket264377(e.target.value)} value={ticket.cf_tipo_do_ticket264377}>
                                            <option value="">--</option>
                                            <option value="Questões">Questões</option>
                                            <option value="Compras">Compras</option>
                                            <option value="Mensagem">Mensagem</option>
                                        </select>
                                        <div className="inputDescription">Usuário</div>  
                                        <input name="cf_usurio331473" type="text" className="formInput" onChange={e => setcf_usurio331473(e.target.value)} value={ticket.cf_usurio331473}/>
                                    </div>
                                    :
                                    type === "Reclame Aqui"?
                                        <div className="inputsReclameAqui">
                                            <div className="inputDescription">Reclame Aqui id</div>  
                                            <input name="cf_reclame_aqui_id" type="number" className="formInput" onChange={e => setcf_reclame_aqui_id(e.target.value)} value={ticket.cf_reclame_aqui_id}/>
                                            <div className="inputDescription">source_external_id</div>
                                            <input name="cf_source_external_id" type="number" className="formInput" onChange={e => setcf_source_external_id(e.target.value)} value={ticket.cf_source_external_id}/>  
                                            <div className="inputDescription">Empresa recebendo a reclamação</div>
                                            <input name="cf_empresa_recebendo_a_reclamao" type="text" className="formInput" onChange={e => setcf_empresa_recebendo_a_reclamao(e.target.value)} value={ticket.cf_empresa_recebendo_a_reclamao}/> 
                                            <div className="checkboxForm">
                                                <input name="cf_cliente_voltou_a_fazer_negocio" type="checkbox" onChange={() => {setcf_cliente_voltou_a_fazer_negocio(cf_cliente_voltou_a_fazer_negocio == null? (true) : (null))}} />
                                                Cliente voltou a fazer negocio?
                                            </div>   
                                            <div className="inputDescription">Quantidade de comentarios de outros usuários</div>
                                            <input name="cf_quantidade_de_comentarios_de_outros_usuarios" type="number" className="formInput" onChange={e => setcf_quantidade_de_comentarios_de_outros_usuarios(e.target.value)} value={ticket.cf_quantidade_de_comentarios_de_outros_usuarios}/>
                                            <div className="checkboxForm">
                                                <input name="cf_ticket_congelado_mais_de_30_dias_sem_resposta" type="checkbox" onChange={() => setcf_ticket_congelado_mais_de_30_dias_sem_resposta(cf_ticket_congelado_mais_de_30_dias_sem_resposta == null? (true) : (null))} value={ticket.cf_ticket_congelado_mais_de_30_dias_sem_resposta}/>
                                                Ticket congelado mais de 30 dias sem resposta
                                            </div>
                                            <div className="inputDescription">Sentimento do consumidor</div>
                                            <input name="cf_sentimento_do_consumidor" type="text" className="formInput" onChange={e => setcf_sentimento_do_consumidor(e.target.value)} value={ticket.cf_sentimento_do_consumidor}/>
                                            <div className="inputDescription">Motivo da reclamacao</div>
                                            <input name="cf_motivo_da_reclamacao" type="text" className="formInput" onChange={e => setcf_motivo_da_reclamacao(e.target.value)} value={ticket.cf_motivo_da_reclamacao}/>                 
                                            <div className="inputDescription">Status do ticket do reclame aqui</div>
                                            <select name="cf_status_do_ticket_no_reclame_aqui" id="type" className="formInput formSelect" onChange={e => setcf_status_do_ticket_no_reclame_aqui(e.target.value)} value={ticket.cf_status_do_ticket_no_reclame_aqui}>
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
                                                <input name="cf_solicitacao_para_o_cliente_avaliar_o_ticket" type="checkbox" onChange={()=>cf_solicitacao_para_o_cliente_avaliar_o_ticket == null? (true) : (null)}/>
                                                Solicitaçãopara o cliente avaliar o ticket?
                                            </div>
                                            <div className="checkboxForm">
                                                <input name="cf_existe_um_pedido_de_moderacao" type="checkbox" onChange={() => cf_existe_um_pedido_de_moderacao == null? (true) : (null)} value={ticket.cf_existe_um_pedido_de_moderacao}/>
                                                Existe um pedido de moderação?
                                            </div>
                                            <div className="inputDescription">Quantidade de solicitações demoderação</div>
                                            <input name="cf_quantidade_de_solicitacoes_de_moderacao" type="number" className="formInput" onChange={e => setcf_quantidade_de_solicitacoes_de_moderacao(e.target.value)} value={ticket.cf_quantidade_de_solicitacoes_de_moderacao}/>
                                            <div className="inputDescription">tipo de resposta</div>
                                            <select name="cf_tipo_de_resposta" id="type" className="formInput formSelect" onChange={e => setcf_tipo_de_resposta(e.target.value)} value={ticket.cf_tipo_de_resposta}>
                                                <option value="">--</option>
                                                <option value="Publica">Publica</option>
                                                <option value="Privada">Privada</option>
                                            </select>
                                        </div>
                                        :
                                        <></>
                            }
                            
                            <div className="inputDescription">Assunto</div>
                            <input name="subject" type="text" className="formInput" onChange={e => setsubject(e.target.value)} value={ticket.subject}/>

                            <div className="inputDescription">Status</div>
                            <select name="status" id="status" className="formInput formSelect" onChange={e => setstatus(e.target.value)} value={ticket.status}>
                                <option value="2" selected>Aberto</option>
                                <option value="18">Teste</option>
                                <option value="3">Pendente</option>
                                <option value="4">Resolvido</option>
                                <option value="5">Fechado</option>
                                <option value="23">EM DESENV</option>   
                            </select>

                            <div className="inputDescription">Origem</div>
                            <select name="source" id="status" className="formInput formSelect" onChange={e => setsource(e.target.value)} value={ticket.source}>
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
                            <select name="priority" id="status" className="formInput formSelect" onChange={e => setpriority(e.target.value)} value={ticket.priority}>
                                <option value="1" selected>Baixa</option>
                                <option value="2">Media</option>
                                <option value="3">Alta</option>
                                <option value="4">Urgente</option>  
                            </select>

                            <div className="inputDescription">Grupo</div>
                            <select name="group_id" id="status" className="formInput formSelect" onChange={e => {changeTicket} value={ticket.group_id}>
                                <option value="" selected>--</option>
                                {    
                                    agentsIds.data.groups.map(group =>
                                            <option value={group.id}>{group.name}</option>  
                                    )
                                }
                                
                                
                            </select>

                            <div className="inputDescription">Analista</div>
                            <select name="responder_id" id="status" className="formInput formSelect" onChange={changeTicket(e.target.value)} value={ticket.responder_id}>
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
                            <input name="tags" type="text" className="formInput" onChange={e => settags(e.target.value)} value={ticket.tags}/>

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