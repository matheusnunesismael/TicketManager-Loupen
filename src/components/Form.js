import React , { useState } from 'react';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import agentsIds from '../assets/data/agentsIds.json';
import { Editor } from "react-draft-wysiwyg";
import '../pages/Main/styles.css'
import ChipInput from 'material-ui-chip-input';
import { useHistory } from 'react-router-dom';



const Form =  ({ticket, changeTicket, contentState, setcontentState, saveTicket, isUpdate, changeTokens}) =>{
    const history = useHistory();

    // inicialização do editor de texto da descrição
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
    const [descEditor, setDescEditor] = useState("");

    return(
        <div className="formcontainer">
            <div  className="formNewTicket">
                {
                    isUpdate?
                        <></>
                    :
                        <>
                            <div className="inputDescription">Contato</div>  
                            <input type="text" className="formInput" name="email" onChange={changeTicket} value={ticket.email} placeholder ="E-mail do contato"/>
                            <div className="inputDescription">Cc</div>  
                            <input type="text" className="formInput" name="cc_emails" onChange={changeTicket} value={ticket.cc_emails}/>
                        </>
                }
                <div className="inputDescription">Tipo</div>  
                <select name="type" id="type" className="formInput formSelect" onChange={changeTicket} value={ticket.type}>
                    <option value="">--</option>
                    <option value="Mercado Livre">Mercado Livre</option>
                    <option value="Reclame Aqui">Reclame Aqui</option>
                </select>
                {
                    ticket.type === "Mercado Livre"?
                        <div className="inputsMercadoLivre">
                            <div className="inputDescription">Tipo do ticket</div>  
                            <select name="cf_tipo_do_ticket264377" id="type" className="formInput formSelect" onChange={changeTicket} value={ticket.cf_tipo_do_ticket264377}>
                                <option value="">--</option>
                                <option value="Questões">Questões</option>
                                <option value="Compras">Compras</option>
                                <option value="Mensagem">Mensagem</option>
                            </select>
                            <div className="inputDescription">Usuário</div>  
                            <input name="cf_usurio331473" type="text" className="formInput" onChange={changeTicket} value={ticket.cf_usurio331473}/>
                        </div>
                        :
                        ticket.type === "Reclame Aqui"?
                            <div className="inputsReclameAqui">
                                <div className="inputDescription">Reclame Aqui id</div>  
                                <input name="cf_reclame_aqui_id" type="number" className="formInput" onChange={changeTicket} value={ticket.cf_reclame_aqui_id}/>
                                <div className="inputDescription">source_external_id</div>
                                <input name="cf_source_external_id" type="number" className="formInput" onChange={changeTicket} value={ticket.cf_source_external_id}/>  
                                <div className="inputDescription">Empresa recebendo a reclamação</div>
                                <input name="cf_empresa_recebendo_a_reclamao" type="text" className="formInput" onChange={changeTicket} value={ticket.cf_empresa_recebendo_a_reclamao}/> 
                                <div className="checkboxForm">
                                    <input name="cf_cliente_voltou_a_fazer_negocio" type="checkbox" onChange={changeTicket} />
                                    Cliente voltou a fazer negocio?
                                </div>   
                                <div className="inputDescription">Quantidade de comentarios de outros usuários</div>
                                <input name="cf_quantidade_de_comentarios_de_outros_usuarios" type="number" className="formInput" onChange={changeTicket} value={ticket.cf_quantidade_de_comentarios_de_outros_usuarios}/>
                                <div className="checkboxForm">
                                    <input name="cf_ticket_congelado_mais_de_30_dias_sem_resposta" type="checkbox" onChange={changeTicket}/>
                                    Ticket congelado mais de 30 dias sem resposta
                                </div>
                                <div className="inputDescription">Sentimento do consumidor</div>
                                <input name="cf_sentimento_do_consumidor" type="text" className="formInput" onChange={changeTicket} value={ticket.cf_sentimento_do_consumidor}/>
                                <div className="inputDescription">Motivo da reclamacao</div>
                                <input name="cf_motivo_da_reclamacao" type="text" className="formInput" onChange={changeTicket} value={ticket.cf_motivo_da_reclamacao}/>                 
                                <div className="inputDescription">Status do ticket do reclame aqui</div>
                                <select name="cf_status_do_ticket_no_reclame_aqui" id="type" className="formInput formSelect" onChange={changeTicket} value={ticket.cf_status_do_ticket_no_reclame_aqui}>
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
                                    <input name="cf_solicitacao_para_o_cliente_avaliar_o_ticket" type="checkbox" onChange={changeTicket}/>
                                    Solicitaçãopara o cliente avaliar o ticket?
                                </div>
                                <div className="checkboxForm">
                                    <input name="cf_existe_um_pedido_de_moderacao" type="checkbox" onChange={changeTicket}/>
                                    Existe um pedido de moderação?
                                </div>
                                <div className="inputDescription">Quantidade de solicitações demoderação</div>
                                <input name="cf_quantidade_de_solicitacoes_de_moderacao" type="number" className="formInput" onChange={changeTicket} value={ticket.cf_quantidade_de_solicitacoes_de_moderacao}/>
                                <div className="inputDescription">tipo de resposta</div>
                                <select name="cf_tipo_de_resposta" id="type" className="formInput formSelect" onChange={changeTicket} value={ticket.cf_tipo_de_resposta}>
                                    <option value="">--</option>
                                    <option value="Publica">Publica</option>
                                    <option value="Privada">Privada</option>
                                </select>
                            </div>
                            :
                            <></>
                }
                
                <div className="inputDescription">Assunto</div>
                <input name="subject" type="text" className="formInput" onChange={changeTicket} value={ticket.subject}/>

                <div className="inputDescription">Status</div>
                <select name="status" id="status" className="formInput formSelect" onChange={changeTicket} value={ticket.status}>
                    <option value="2" selected>Aberto</option>
                    <option value="18">Teste</option>
                    <option value="3">Pendente</option>
                    <option value="4">Resolvido</option>
                    <option value="5">Fechado</option>
                    <option value="23">EM DESENV</option>   
                </select>

                <div className="inputDescription">Origem</div>
                <select name="source" id="status" className="formInput formSelect" onChange={changeTicket} value={ticket.source}>
                    <option value="3" selected>Telefone</option> 
                </select>
                {
                    isUpdate?
                        <></>
                    :
                        <>
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
                        </>
                }
                <div className="inputDescription">Prioridade</div>
                <select name="priority" id="status" className="formInput formSelect" onChange={changeTicket} value={ticket.priority}>
                    <option value="1" selected>Baixa</option>
                    <option value="2">Media</option>
                    <option value="3">Alta</option>
                    <option value="4">Urgente</option>  
                </select>

                <div className="inputDescription">Grupo</div>
                <select name="group_id" id="status" className="formInput formSelect" onChange={changeTicket} value={ticket.group_id}>
                    <option value="" selected>--</option>
                    {    
                        agentsIds.data.groups.map(group =>
                            <option value={group.id}>{group.name}</option>  
                        )
                    }     
                </select>
                <div className="inputDescription">Analista</div>
                <select name="responder_id" id="status" className="formInput formSelect" onChange={changeTicket} value={ticket.responder_id}>
                    <option value="">--</option>
                    { 
                        // Percorre o documento que guarda as informações sobre os agentes
                        // em cada grupo e preenche com os agentes pertencentes ao grupo
                    }
                    {
                        agentsIds.data.agents.map( agent => 
                            ticket.group_id !== ""  ?
                                agent.group_ids.includes(parseInt(ticket.group_id))?
                                    <option value={agent.id}>{agent.contact.name}</option>
                                :
                                    <></> 
                            :    
                                <option value={agent.id}>{agent.contact.name}</option>
                        )
                    }
                </select>

                <div className="inputDescription">Tags</div>                        
                <ChipInput
                    value={ticket.tags}
                    onAdd={(chip) => changeTokens(chip)}
                    onDelete={(chip, index) => changeTokens(chip, index)}
                    className="tokenInput formInput"
                />

                <div className="submitContainer">
                    <button className="submitSalvar" type="submit" onClick={()=> saveTicket()}>Salvar</button>
                    <button className="submitCancelar" onClick={()=>history.push('/home')}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default Form;