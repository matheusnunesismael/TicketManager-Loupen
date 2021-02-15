import '../pages/Main/styles.css';
import iconeLoupen from '../assets/images/icone-Loupen.png';
import { useHistory } from 'react-router-dom';


const Contextmenu = ()=>{
    const history = useHistory();
    let authLogin = localStorage.getItem('authLogin');

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
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
                                { authLogin == null? <></> : authLogin.split('@')[0].split(' ')[0]}
                            </div>
                        </div>  
                    </div>
                    <div className="contextOption" onClick={()=> history.push('/home')}>
                        Listar Tickets
                    </div>
                    <div className="contextOption" onClick={()=> history.push('/new')}>
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
        </>
    )
}

export default Contextmenu; 