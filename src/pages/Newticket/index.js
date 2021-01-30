import React , { useState, useEffect } from 'react';

import '../Main/styles.css'
import './styles.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import  draftToHtml  from 'draftjs-to-html';
import Contextmenu from '../../components/Contextmenu';
import Topbar from '../../components/Topbar';
import Form from '../../components/Form';

import api from '../../services/api';

export default function Newticket(){
    // dados de acesso à API
    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');

    // campos do formulario
    const [ ticket, setticket] = useState(
        {
            "email": null,
            "cc_emails": null,
            "type":null,
            "custom_fields": {
                "cf_tipo_do_ticket264377": null,
                "cf_usurio331473": null,
                "cf_reclame_aqui_id": null,
                "cf_source_external_id" : null,
                "cf_empresa_recebendo_a_reclamao" : null,
                "cf_cliente_voltou_a_fazer_negocio" : null,
                "cf_quantidade_de_comentarios_de_outros_usuarios": null,
                "cf_ticket_congelado_mais_de_30_dias_sem_resposta" : null,
                "cf_sentimento_do_consumidor" : null,
                "cf_motivo_da_reclamacao" : null,
                "cf_status_do_ticket_no_reclame_aqui" : null,
                "cf_solicitacao_para_o_cliente_avaliar_o_ticket" : null,
                "cf_existe_um_pedido_de_moderacao": null,
                "cf_quantidade_de_solicitacoes_de_moderacao" : null ,
                "cf_tipo_de_resposta" : null
            },
            "subject" : null,
            "status" : 2,
            "source" : 3,
            "description" : null,
            "description_text" : null,
            "priority" : 1,
            "group_id" : null,
            "responder_id" : null,
            "tags" : []
        }
    )
    
    // conteudo da descrição
    const [contentState, setcontentState] = useState("");

    // campos numericos
    let numberFields = ["priority", "requester_id", "responder_id", "group_id", "status"];

    const changeTicket = (event) => {
        let value = event.target.value;
        let fieldName = event.target.name;

        if(event.target.type == "number" || numberFields.includes(fieldName))
            value = parseInt(value);
        else if(event.target.type == "checkbox"){
            if(ticket[fieldName] == null)
                value = true
            else
                value = null
        }
        if(fieldName.split('_')[0] == 'cf'){
            setticket((prevState) => ({
                ...prevState,
                "custom_fields": {
                    ...prevState["custom_fields"],
                    [fieldName]: ""+value
                }
            }));
        }
        else{
            setticket((prevState) => ({
                ...prevState,
                [fieldName]: value
            }));
        } 
    }
  
    // monta o ticket e o envia para a API
    async function saveTicket(){
        let description_text = contentState.blocks[0].text;

        setticket((prevState) => ({
            ...prevState,
            ["description"]: draftToHtml(contentState),
            ["macarrao"]: description_text
        }));
        
        console.log(ticket)
        let cleanTicket = ticket;

        // romoção dos campos vazios
        for(let field in cleanTicket){
            if(cleanTicket[field] == null || cleanTicket[field] == undefined || cleanTicket[field] == "")
                delete cleanTicket[field]
            else if(field == 'custom_fields')
                for(let sub_field in cleanTicket[field]){
                    if(cleanTicket[field][sub_field] == null || cleanTicket[field][sub_field] == undefined || cleanTicket[field][sub_field] == "")
                        delete cleanTicket[field][sub_field]
                }
        }

        setticket(cleanTicket);
        console.log(ticket)
        
        /*
        try {
            await api.post('tickets', ticket, {
                auth: {
                    username: authLogin,
                    password: authPass
                }
            }).then( response=>{
                console.log(response.data)
            })
    
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
        */
    }

    return(
        <div>
            <Contextmenu/>
            
            <div className="contentContainerMain">
                <Topbar/>
                <div className="formContent">
                    <div className="tituloNewticket">
                        Novo Ticket
                    </div>
                    <Form 
                        ticket = {ticket} 
                        changeTicket = {changeTicket} 
                        contentState= {contentState} 
                        setcontentState = {setcontentState}
                        saveTicket = {saveTicket}
                        isUpdate = {false}
                    />
                    
                </div>
            </div>
        </div>
    )
}