import './styles.css';

import { Link , useHistory, useParams } from 'react-router-dom';
import React , { useState, useEffect } from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import Contextmenu from '../../components/Contextmenu';

import Topbar from '../../components/Topbar';

import api from '../../services/api';

export default function Main(){
    const { q } = useParams();
    const history = useHistory();

    const [ticketList, setTicketList] = useState([]);

    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');
    var priorityDict = ["", "Baixa", "Media", "Alta", "Urgente"];
    var priorityStyleDict = ["", "lowPriority", "mediumPriority", "highPriority", "urgentPriority"];
    var statusDict = {
        2: "Aberto",
        3: "Pendente",
        4: "Resolvido",
        5: "Fechado",
        18: "Teste",
        23: "EM DESENV"
    }

    useEffect(()=>{
        //controla a seção
        if(localStorage.getItem('authLogin') == null)
            history.push('/');
        
        // carrega os ultimos tickets registrados
        if(ticketList.length === 0){
            let url = "";
            let hasQuery = false;
            if(q && q !== "undefined"){
                hasQuery = true;
                let query = "";
                let qInitUpper = q.charAt(0).toUpperCase() + q.toLowerCase().slice(1);
                if(priorityDict.includes(qInitUpper) === true)
                    query += "priority:"+priorityDict.indexOf(qInitUpper);

                Object.getOwnPropertyNames(statusDict).forEach(function(val, idx, array) {
                    if(statusDict[val] === qInitUpper){
                        query += (query === "" ? "" : " OR ") + "status:"+(idx+2);
                    }
                });   
                //query += (query == ""? "" : " OR ") + "subject:"+q;
                url += `search/tickets?query="${query}"`;
            }
            else{
                url = "tickets";
            }
            api.get(url, {
                "auth": {
                    "username" : authLogin,
                    "password" : authPass
                }
            }).then(async response => {
                
                let ticketsResp = hasQuery ? response.data.results : response.data;
                // busca para cada tiket o nome do usuário queo registrou e adiciona 
                // a informação aos dados do ticket, junto com a url de um icone de perfil
                // os substituindo em requester_id e responder_id
                // já que estes campos não são usados na visualização inicial
                for(let i = 0; i < ticketsResp.length; i++){
                    let requester = ticketsResp[i].requester_id;
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
                    // existem usuarios quepor algum motivo não possuem nome cadastrado
                    // nesse caso será exibido apenas o nome "RequesterName"
                    let nameUserC = requesterResponse == null? "Requester" : requesterResponse.data.name.split('@')[0].split(' ')[0];

                    ticketsResp[i].requester_id = "https://ui-avatars.com/api/?name="+nameUserC+"&size=128&background=random";
                    ticketsResp[i].responder_id = nameUserC;
                }
                // atualiza os tickets na lista para serem visualizados 
                setTicketList(ticketsResp);
            });
        }
    });

    return(
        <div>
            <Contextmenu/>
            <Topbar/>
            <div className="contentContainerMain">
                <div className="ticketsResult">
                    <div className="searchResults">
                        {
                            // carrega placeHolders enquanto não há dados
                            ticketList.length === 0?
                                <div className="">
                                    <Skeleton variant="rect"  className ="compSkelethon" height={130} />
                                    <Skeleton variant="rect" className ="compSkelethon"  height={130} />
                                    <Skeleton variant="rect" className ="compSkelethon"  height={130} />
                                </div>
                            :
                                ticketList.map(ticket => 
                                    <Link to={"/ticket/"+ticket.id} className="linkRoute">
                                        <div className="ticketCard">
                                            <div className="section1">
                                                <div className="remainingTimeticket1">
                                                    Prazo para primeira resposta vence em 5 horas
                                                </div>
                                                <div className="containerRequesterInformations">
                                                    <div className="containerImageTicket">
                                                        <img src={ticket.requester_id} alt={ticket.responder_id} />
                                                    </div>
                                                    <div className="userNameTicket">{ticket.responder_id}</div>
                                                </div>
                                                <div className="tagsContainer">
                                                    {
                                                        ticket.tags.map(tag => 
                                                            <div className="tagTicket">
                                                                • {tag}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="section2">
                                                {ticket.subject}
                                            </div>
                                            <div className="section3">
                                                <div className="containerSection">
                                                    <div className="priorityTicket">
                                                        {priorityDict[ticket.priority]}
                        
                                                        <div className={ "iconePrioridade " + priorityStyleDict[ticket.priority]}></div>
                                                    </div>
                                                    <div className="sectionDivider"></div>
                                                    <div className="containerStatus">
                                                        <div className="statusTicket">
                                                            {statusDict[ticket.status]}
                                                        </div>
                                                    </div>
                                                    <div className="remainingTimeticket2">
                                                        Prazo para primeira resposta vence em 5 horas
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </Link>
                                )
                        }
                        <Pagination count={3} val={2} variant="outlined" shape="rounded"  style={{display:"none"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}