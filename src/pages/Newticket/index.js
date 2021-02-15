import React , { useState, useEffect } from 'react';

import '../Main/styles.css'
import './styles.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import  draftToHtml  from 'draftjs-to-html';
import Contextmenu from '../../components/Contextmenu';
import Topbar from '../../components/Topbar';
import Form from '../../components/Form';
import Modal from '@material-ui/core/Modal';
import { useHistory } from 'react-router-dom';


import api from '../../services/api';

export default function Newticket(){
    const history = useHistory();

    // dados de acesso à API
    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');

    // estado do modal
    const [open, setopen] = useState(false);
    const [modalTitle, setmodalTitle] = useState("");
    const [modalBody, setmodalBody] = useState("");
    const [modalAction, setmodalAction] = useState(false);

    useEffect(()=>{
        //controla a seção
        if(localStorage.getItem('authLogin') == null)
            history.push('/');
    })

    function toggleModal(){
        setopen(!open);
    }

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

    
    // adiciona e remove os tokens inseridos ao formulario de dados
    function changeTokens(token, index = null){
        let newTags = ticket.tags;
        if(newTags === undefined)
            newTags = [];
        if(index == null)
            newTags =  [].concat(newTags, token);
        else
            newTags.splice(index, 1);
        
        setticket((prevState) => ({
            ...prevState,
            "tags": newTags
        })); 
    }


    // pega o conteudo do editor de texto da descrição
    function changeStateDesc(state) {
        setcontentState(state);

        setticket((prevState) => ({
            ...prevState,
            "description": draftToHtml(state)
        }));
    }

    // campos numericos
    let numberFields = ["priority", "requester_id", "responder_id", "group_id", "status"];

    const changeTicket = (event) => {

        let value = event.target.value;
        let fieldName = event.target.name;

        if(event.target.type === "number" || numberFields.includes(fieldName))
            value = parseInt(value);
        else if(event.target.type === "checkbox"){
            if(ticket[fieldName] == null)
                value = true
            else
                value = null
        }
        if(fieldName.split('_')[0] === 'cf'){
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
    const saveNewTicket = async () => {

        let cleanTicket = ticket;

        // romoção dos campos vazios
        
        for(let field in cleanTicket){
            if(cleanTicket[field] === null || cleanTicket[field] === undefined || cleanTicket[field] === "")
                delete cleanTicket[field]
            else if(field === 'custom_fields')
                for(let sub_field in cleanTicket[field]){
                    if(cleanTicket[field][sub_field] === null || cleanTicket[field][sub_field] === undefined || cleanTicket[field][sub_field] === "")
                        delete cleanTicket[field][sub_field]
                }
        }

        console.log(ticket)
        
        try {
            await api.post('tickets', cleanTicket, {
                auth: {
                    username: authLogin,
                    password: authPass
                }
            }).then( response=>{
                if(response.status === 201){
                    setmodalTitle("Salvo!")
                    setmodalBody("O ticket foi Salvo");
                    setmodalAction(true);
                    toggleModal();
                }
                console.log(response)
            })
    
        } catch (err) {
            setmodalTitle("Erro!")
            setmodalBody("Não foi possivel cadastrar o ticket, os campos Contato, Assunto e Descrição devem ser preenchidos.");
            setmodalAction(false);
            toggleModal();
        }
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
                        setcontentState = {changeStateDesc}
                        saveTicket = {saveNewTicket}
                        isUpdate = {false}
                        changeTokens = {changeTokens}
                    />
                    
                    <Modal
                        open={open}
                        onClose={toggleModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div  className="modalDialog">
                            <div className="modalBox">
                                <h2 className="modalTitle">{modalTitle}</h2>
                                <p>
                                {modalBody}
                                </p>
                                <div className="modalbuttonBox">
                                    {
                                    modalAction?
                                        <button onClick={()=>history.push('/home')}>Ok</button>
                                    :
                                        <></>
                                    }                       
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}