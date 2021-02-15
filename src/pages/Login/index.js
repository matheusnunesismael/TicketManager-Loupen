import React , { useState, useEffect } from 'react';

import logoLoupen from '../../assets/images/logo-Loupen.png';
import logoFreshdesk from '../../assets/images/logo-FreshdeskFull.svg';
import './styles.css';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import Modal from '@material-ui/core/Modal';


export default function Login(){

    const history = useHistory();
    const [emailLogin, setemail] = useState("");
    const [senha, setsenha] = useState("");

    const [open, setopen] = useState(false);

    async function makeLogin() {
        console.log({emailLogin, senha});
        try {
            var auth = {
                username: emailLogin,
                password: senha
            }
            await api.get('tickets', {
                auth
            }).then( response => {
                    if(response.status === 200){
                        localStorage.setItem('authLogin', auth.username);
                        localStorage.setItem('authPass', auth.password);
                        history.push('/home');
                    }
                }
            )
            
        
        } catch (err) {
            toggleModal();
        }
        return false;
    }
    // ativar modal de erro no login
    function toggleModal(){
        setopen(!open);
    }
    useEffect(()=>{
        if(localStorage.getItem('authLogin') != null)
            history.push('/home');
    })
 
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
                        <input value = {emailLogin} onChange={ e=>setemail(e.target.value)} type="email" placeholder="E-mail" className="inputEmailLogin inputLogin"/>
                    </div>
                    <div className="boxInput">
                        <input value={senha} onChange={ e=>setsenha(e.target.value)} type="password" placeholder="Senha" className="inputSenhaLogin inputLogin"/>
                    </div>
                </div>
                <div className="boxButton">
                    <button type="submit" className="buttonEnviar" onClick={makeLogin} >Entrar</button>
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
                        <h2 className="modalTitle">Erro!</h2>
                        <p>
                            O e-mail ou a senha inseridos não foram encontrados.
                            <br/>
                            Verifique se as informações estão corretas.
                        </p>
                        <div className="modalbuttonBox">
                            <button onClick={()=>toggleModal()}>Ok</button>                       
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}