import '../pages/Main/styles.css';
import iconeFreshdesk from '../assets/images/logo-Freshdesk.png';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Link , useHistory } from 'react-router-dom';
import iconeLoupen from '../assets/images/icone-Loupen.png';
import { useState } from 'react';



const Topbar = () =>{

    const [contentSearch, setContentSearch] = useState();
  
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    let authLogin = localStorage.getItem('authLogin');
    const history = useHistory();

    return(
        <div className="topBarContent">
            <img src={iconeFreshdesk} alt="HomeTaskManager" className="logoFrashdeskTopBar" onClick={()=>history.push("/home")} />
            <div className="formContainerInput">
                <form action={"/home/"+contentSearch}>
                    <input type="search"  value={contentSearch} onChange={e=>setContentSearch(e.target.value)} placeholder="Buscar Ticket" className="inputSearchTopBar"/>  
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
            <label htmlFor="iconeUsuarioBox">
                <div id="iconeUsuarioBox" className="iconeUsuarioBox">
                    <div className="iconeUsuario">
                        <img src={iconeLoupen} alt=""/>
                        { authLogin == null? <></> : authLogin.split('@')[0].split(' ')[0]}
                    </div>
                </div>
            
                <div className="contextMainDesktop">
                    <ul>
                        <li onClick={()=>history.push("/home")}>Listar Tickets</li>
                        <li onClick={()=>handleLogout()}>Sair</li>
                    </ul>
                </div>
            </label>
        </div>
    )
}

export default Topbar;