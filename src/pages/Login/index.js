
import logoLoupen from '../../assets/images/logo-Loupen.png';
import logoFreshdesk from '../../assets/images/logo-FreshdeskFull.svg';
import './styles.css';


export default function Login(){
    return(
        <div className="containerPage">
            <div className="pageLogin">  
                <div className="boxLogos">
                    <div className="boxImage">
                        <img src={ logoLoupen } className="logoLoupenLogin" alt="Loupen"/> 
                    </div>
                    <div className="boxImage">
                        <img src={ logoFreshdesk } className="logoFreshdesklogin" alt="Fresshdesk"/>
                    </div>
                </div>
                <div className="boxInputsLogin">
                    <div className="boxInput">
                        <input type="email" placeholder="E-mail" className="inputEmailLogin inputLogin"/>
                    </div>
                    <div className="boxInput">
                        <input type="password" placeholder="Senha" className="inputSenhaLogin inputLogin"/>
                    </div>
                </div>
                <div className="boxButton">
                    <button type="submit" className="buttonEnviar">Entrar</button>
                </div>

            </div>
        </div>
    )
}