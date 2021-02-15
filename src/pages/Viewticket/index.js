import './styles.css';

import { Link , useHistory, useParams } from 'react-router-dom';
import React , { useState, useEffect } from 'react';

import Contextmenu from '../../components/Contextmenu';
import Topbar from '../../components/Topbar';
import Skeleton from '@material-ui/lab/Skeleton';
import Ticketparam from '../../components/Ticketparam.js';
import Modal from '@material-ui/core/Modal';

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

    // estado do modal
    const [open, setopen] = useState(false);
    const [modalTitle, setmodalTitle] = useState("");
    const [modalBody, setmodalBody] = useState("");
    const [modalAction, setmodalAction] = useState(false);

    function toggleModal(){
        setopen(!open);
    }

    useEffect(()=>{
        //controla a seção
        if(localStorage.getItem('authLogin') == null)
            history.push('/');
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

    function dialogExclude(){
        console.log("teste")
        setmodalTitle("Excluir?");
        setmodalBody("Deseja realmente excluir o ticket?");
        setmodalAction(true);
        toggleModal();
    }

    function excluirTicket(){
        
        try{
            api.delete('tickets/'+id, {  
                "auth": {
                    "username" : authLogin,
                    "password" : authPass
                }
            }).then(response =>{
                history.push('/home');
            })
        }catch(err){
            console.log(err);
            
        }
    }

    return(
        <div>
            <Contextmenu/>
            <div className="contentContainerMain">
                <Topbar/>
                <div className="ticketsResult">
                    <div className="searchResults">
                        <div className="boxTicketView">
                        {
                            ticketInfo == null?
                                <Skeleton className="skeletonViewTicket" height={300}/>
                            :
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
                                        <button className="buttonExcluirTicket" onClick={dialogExclude}>Excluir</button>
                                        <Link to={"/edit/"+ticketInfo.id} className="linkRoute">
                                            <button className="buttonEditarTicket">Editar</button>
                                        </Link>
                                    </div>
                                </div>
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
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
                        <div className="modalbuttonBoxEdit">
                            {
                            modalAction?
                                <>
                                    <button onClick={()=>excluirTicket()} className="buttonModalExclude">Excuir</button>
                                    <button onClick={()=>toggleModal()} className="buttonModalCancel">Cancelar</button>
                                </>
                            :
                                <></>
                            }                       
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}