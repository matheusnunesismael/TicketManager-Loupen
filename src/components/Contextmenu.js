import '../pages/Main/styles.css';
import iconeLoupen from '../assets/images/icone-Loupen.png';


const Contextmenu = ()=>{
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
        </>
    )
}

export default Contextmenu; 