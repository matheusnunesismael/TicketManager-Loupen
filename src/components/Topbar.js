import '../pages/Main/styles.css';
import iconeFreshdesk from '../assets/images/logo-Freshdesk.png';

const Topbar = () =>{
    return(
        <div className="topBarContent">
            <img src={iconeFreshdesk} alt="FreshdeskTaskManager" className="logoFrashdeskTopBar"/>
            <div className="formContainerInput">
                <form action="">
                    <input type="search" placeholder="Buscar Ticket" className="inputSearchTopBar"/>  
                </form>
            </div>
        </div>
    )
}

export default Topbar;