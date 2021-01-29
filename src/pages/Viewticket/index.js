import './styles.css';

import { Link , useHistory, useParams } from 'react-router-dom';
import React , { useState, useEffect } from 'react';

import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import Ticketparam from './Ticketparam.js';

import api from '../../services/api';


export default function Viewticket(){
    const history = useHistory();
    const { id } = useParams();

    const [ticketInfo, setTicketInfo] = useState(null);

    let authLogin = localStorage.getItem('authLogin');
    let authPass = localStorage.getItem('authPass');
    var priorityDict = ["", "Baixa", "Media", "Alta", "Urgente"];
    var priorityStyleDict = ["", "lowPriority", "mediumPriority", "highPriority", "urgentPriority"];
    var sourceDict = {
        3: "Telefone"
    };
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
        // carrega os resultados da busca feita na pagina inicial
        if(ticketInfo == null){
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
                setTicketInfo(ticketResp);
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
                    <div className="contextOption">
                        Listar Tickets
                    </div>
                    <div className="contextOption">
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
                    </div>
                </div>
                <div className="ticketsResult">
                    {
                        ticketInfo == null?
                            <></>
                        :
                        <div className="searchResults">
                            <div className="boxTicketView">
                                <div className="ticketViewCard">
                                    <div className="ticketTitulo">
                                        {ticketInfo.subject}
                                    </div>
                                    <div className="infosIniciais">
                                        <div className="ticketUserRequest">
                                            <div className="containerRequesterInformationsTicket">
                                                <div className="containerTicket">
                                                    <img src={ticketInfo.requester_id} alt={ticketInfo.responder_id} />
                                                </div>
                                                <div className="userTicket">{ticketInfo.responder_id}</div>
                                            </div>
                                            <div className="sourceTicket">
                                                Relatado por {sourceDict[ticketInfo.source]}
                                            </div>
                                        </div>
                                        <div className="ticketPriority">
                                            <div className="containerTicketPriority">
                                                Prioridade {priorityDict[ticketInfo.priority]}
                                            </div>
                                                <div className={ "iconePrioridadeTicket " + priorityStyleDict[ticketInfo.priority]}></div>
                                        </div>
                                    </div>
                                    <div className="ticketDescription">
                                        <div className="legendaDescription">
                                            Descrição
                                        </div>
                                        <div className="boxDescription">
                                            <div dangerouslySetInnerHTML={{ __html: ticketInfo.description }} />
                                        </div>  
                                    </div>
                                    <div className="tiketTimeLeft">
                                        Prazo para primeira resposta vence em 5 horas.
                                    </div>
                                    <div className="tiketMoreInfos">
                                        <Ticketparam title={"Tipo"} name={ticketInfo.type}/>

                                        <Ticketparam title={"Usuario"} name={ticketInfo.cf_usurio331473}/>
                                        <Ticketparam title={"Tipo do ticket"} name={ticketInfo.cf_tipo_do_ticket264377}/>
                                        <Ticketparam title={"Reclame aqui id"} name={ticketInfo.cf_reclame_aqui_id}/>
                                        <Ticketparam title={"Source external id"} name={ticketInfo.cf_source_external_id}/>
                                        <Ticketparam title={"Empresa recebendo reclamação"} name={ticketInfo.cf_empresa_recebendo_a_reclamao}/>
                                        <Ticketparam title={"Cliente voltou a fazer negocio"} name={ticketInfo.cf_cliente_voltou_a_fazer_negocio}/>
                                        <Ticketparam title={"Ticket congelado mais de 30 dias sem resposta"} name={ticketInfo.cf_ticket_congelado_mais_de_30_dias_sem_resposta}/>

                                        <Ticketparam title={"Status"} name={statusDict[ticketInfo.status]}/>
                                        
                                        
                                    </div>
                                    <div className="buttonsActions">
                                        <button className="buttonExcluirTicket" >Excluir</button>
                                        <Link to={"/edit/"+ticketInfo.id} className="linkRoute">
                                            <button className="buttonEditarTicket">Editar</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}