import './styles.css';

import iconeLoupen from '../../assets/images/icone-Loupen.png';
import iconeFreshdesk from '../../assets/images/logo-Freshdesk.png';
import AddBoxIcon from '@material-ui/icons/AddBox';



export default function Main(){

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
                        <div className="containerNewTicket">
                            <button className="buttonNewTicket">
                                <AddBoxIcon className="iconNewTicket"/>
                                Novo Ticket
                            </button>
                        </div>
                    </div>
                </div>
                <div className="ticketsResult">
                    <div className="searchFilters">
                        <div className="container">

                        </div>
                        <div className="tituloFiltros">
                            Filtros
                        </div>
                        
                    </div>
                    <div className="searchResults">

                        <div className="ticketCard">
                            <div className="section1">
                                <div className="remainingTimeticket1">
                                    Prazo para primeira resposta vence em 5 horas
                                </div>
                                <div className="containerRequesterInformations">
                                    <div className="containerImageTicket">
                                        <img src="https://ui-avatars.com/api/?name=John+Doe&size=128&background=random" alt="" />
                                    </div>
                                    <div className="userNameTicket">userName</div>
                                </div>
                                <div className="tagsContainer">
                                    <div className="tagTicket">
                                        • tag1
                                    </div>
                                    <div className="tagTicket">
                                        • tag2
                                    </div>
                                </div>
                            </div>
                            <div className="section2">
                                Subjectawdawd awdawd awdawd awdawdaw dawd  
                            </div>
                            <div className="section3">
                                <div className="containerSection">
                                    <div className="priorityTicket">
                                        Media
                                        <div className="iconePrioridade mediumPriority"></div>
                                    </div>
                                    <div className="sectionDivider"></div>
                                    <div className="containerStatus">
                                        <div className="statusTicket">
                                            Aberto
                                        </div>
                                    </div>
                                    <div className="remainingTimeticket2">
                                        Prazo para primeira resposta vence em 5 horas
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    )
}