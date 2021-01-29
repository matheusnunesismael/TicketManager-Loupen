import './styles.css';

import { Link , useHistory } from 'react-router-dom';
import React , { useState, useEffect } from 'react';

import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';

import api from '../../services/api';

export default function Main(){
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

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    useEffect(()=>{
        
    });
    useEffect(()=>{
        // carrega os ultimos tickets registrados
        if(ticketList.length == 0){
            console.log("carregou")
            api.get('tickets?per_page=10&page=1', {
                "auth": {
                    "username" : authLogin,
                    "password" : authPass
                }
            }).then(async response => {

                let ticketsResp = response.data;
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
                    let nameUserC = requesterResponse == null? "RequesterName" : requesterResponse.data.name.split('@')[0].split(' ')[0];

                    ticketsResp[i].requester_id = "https://ui-avatars.com/api/?name="+nameUserC+"&size=128&background=random";
                    ticketsResp[i].responder_id = nameUserC;
                    console.log(ticketsResp[i])
                }
                // atualiza os tickets na lista para serem visualizados 
                setTicketList(ticketsResp);
            });
        }
    });

    return(
        <div>
            <input id="menu-hamburguer" type="checkbox" className="inputHamburguer"/>
            <label htmlFor="menu-hamburguer">
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
                    <div className="contextOption" onClick={()=>history.push('/home')}>
                        Listar Tickets
                    </div>
                    <div className="contextOption" onClick={()=>history.push('/new')}>
                        Novo Ticket
                    </div>
                    <div className="contextOptionExit" onClick={handleLogout}>
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
                        <div className="containerNewTicket">
                            <Link to="/new" className="linkRoute">
                                <button className="buttonNewTicket" >
                                    <AddBoxIcon className="iconNewTicket"/>
                                    Novo Ticket
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="ticketsResult">
                    <div className="searchResults">
                        {
                            // carrega placeHolders enquanto não há dados
                            ticketList.length == 0?
                                <div className="">
                                    <Skeleton variant="rect"  className ="compSkelethon" height={118} />
                                    <Skeleton variant="rect" className ="compSkelethon"  height={118} />
                                    <Skeleton variant="rect" className ="compSkelethon"  height={118} />
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
                        <Pagination count={10} variant="outlined" shape="rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}