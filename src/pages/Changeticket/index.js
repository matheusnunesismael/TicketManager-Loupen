import React , { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Form from '../../components/Form';
import Contextmenu from '../../components/Contextmenu';
import Topbar from '../../components/Topbar';
import Modal from '@material-ui/core/Modal';


import './styles.css'


// informações obtidas em https://loupendemo.freshdesk.com/api/_/bootstrap/agents_group

import api from '../../services/api';


export default function Changeticket(){
    const history = useHistory();
    // id do ticket a ser alterado
    const { id } = useParams('id')

    // dados de acesso à API
    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');

    // dados do ticket 
    const [ticket, setticket] = useState(null);

    // estado do modal
    const [open, setopen] = useState(false);
    const [modalTitle, setmodalTitle] = useState("");
    const [modalBody, setmodalBody] = useState("");
    const [modalAction, setmodalAction] = useState(false);

    // campos para o editor de descrição
    const [contentState, setcontentState] = useState("");

    // campos para filtrar os tipos do form de dados
    let numberFields = ["priority", "requester_id", "responder_id", "group_id", "status"];
    let unusedFields = ["updated_at", "created_at", "responder_id", "description", "description_text", "id", "due_by", "fr_due_by", "ticket_cc_emails", "fr_escalated", "spam", "is_escalated", "nr_escalated", "cc_emails", "fwd_emails", "reply_cc_emails", "attachments"];

    function toggleModal(){
        setopen(!open);
    }

    // atualiza a variavel ticket com os dadosinseridos no form
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
                    [fieldName]: value
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

    // carrega os dados atuais do ticket
    useEffect(()=>{
        //controla a seção
        if(localStorage.getItem('authLogin') == null)
            history.push('/');
        // Carrega as informações do ticket
        if(ticket == null){
            console.log(id)
            api.get("tickets/"+id, {
                "auth": {
                    "username" : authLogin,
                    "password" : authPass
                }
            }).then(async response => {
                setticket(response.data)             
            });
        }
    });

    
    // salva o ticket com os dados alterados no form
    async function saveTicket(){
        let cleanTicket = ticket;
        // checa os campos e romove os campos vazios
        for(let field in cleanTicket){
            if(cleanTicket[field] === null || cleanTicket[field] === undefined || cleanTicket[field] === "" || unusedFields.includes(field))
                delete cleanTicket[field]
            else if(field === 'custom_fields')
                for(let sub_field in cleanTicket[field]){
                    if(cleanTicket[field][sub_field] === null || cleanTicket[field][sub_field] === undefined || cleanTicket[field][sub_field] === "")
                        delete cleanTicket[field][sub_field]
                }
        }
        
        try {
            await api.put('tickets/'+id, cleanTicket, {
                auth: {
                    username: authLogin,
                    password: authPass
                }
            }).then(response =>{
                if(response.status === 201 || response.status === 200){
                    setmodalTitle("Salvo!")
                    setmodalBody("O ticket foi Salvo");
                    setmodalAction(true);
                    toggleModal();
                }
            })
        } catch (err) {
            setmodalTitle("Erro!")
            setmodalBody("Houve um erro ao alterar o ticket.");
            setmodalAction(false);
            toggleModal();
        }
        return false;
    }

    return(
        <div>
            <Contextmenu/>
            <div className="contentContainerMain">
                <Topbar/>
                <div className="formContent">
                    <div className="tituloNewticket">
                        Alterar Ticket
                    </div>
                    {
                        ticket == null?
                            <></>
                        :
                            <>
                                <Form 
                                    ticket = {ticket} 
                                    changeTicket = {changeTicket} 
                                    contentState= {contentState} 
                                    setcontentState = {setcontentState}
                                    saveTicket = {saveTicket}
                                    changeTokens = {changeTokens}
                                    isUpdate = {true}
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
                            </>
                    }
                </div>
            </div>
        </div>
    )
}