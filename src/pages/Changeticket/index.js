import React , { useState, useEffect } from 'react';
import { Link , useHistory, useParams } from 'react-router-dom';

import  draftToHtml  from 'draftjs-to-html';
import Form from '../../components/Form';
import Contextmenu from '../../components/Contextmenu';
import Topbar from '../../components/Topbar';

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


    // campos para o editor de descrição
    const [contentState, setcontentState] = useState("");

    let numberFields = ["priority", "requester_id", "responder_id", "group_id", "status"];
    let unusedFields = ["updated_at", "created_at", "responder_id", "description", "description_text", "id"];

    // atualiza a variavel ticket com os dadosinseridos no form
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

    // carrega os dados atuais do ticket
    useEffect(()=>{
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
        // monta o ticket e o envia para a API
        let description_text = contentState.blocks[0].text;

        setticket((prevState) => ({
            ...prevState,
            ["description"]: draftToHtml(contentState),
            ["description_text"]: description_text
        }));
        
        let cleanTicket = ticket;
        // checa os campos e romove os campos vazios
        for(let field in cleanTicket){
            if(cleanTicket[field] == null || cleanTicket[field] == undefined || cleanTicket[field] == "" || unusedFields.includes(field))
                delete cleanTicket[field]
            else if(field == 'custom_fields')
                for(let sub_field in cleanTicket[field]){
                    if(cleanTicket[field][sub_field] == null || cleanTicket[field][sub_field] == undefined || cleanTicket[field][sub_field] == "")
                        delete cleanTicket[field][sub_field]
                }
        }




        setticket(cleanTicket);
        
        try {
            await api.put('tickets/'+id, ticket, {
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
            <Contextmenu/>
            <div className="contentContainerMain">
                <Topbar/>
                <div className="formContent">
                    <div className="tituloNewticket">
                        Novo Ticket
                    </div>
                    {
                        ticket == null?
                            <></>
                        :
                            <Form 
                                ticket = {ticket} 
                                changeTicket = {changeTicket} 
                                contentState= {contentState} 
                                setcontentState = {setcontentState}
                                saveTicket = {saveTicket}
                                isUpdate = {true}
                            />
                    }
                    
                </div>
            </div>
        </div>
    )
}