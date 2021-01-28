import React , { useState, useEffect } from 'react';

import logoLoupen from '../../assets/images/logo-Loupen.png';
import logoFreshdesk from '../../assets/images/logo-FreshdeskFull.svg';
import './styles.css';
import { Link , useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Login(){

    const history = useHistory();
    const [emailLogin, setemail] = useState("");
    const [senha, setsenha] = useState("");

    async function makeLogin() {
        console.log({emailLogin, senha});
        try {
            var auth = {
                username: emailLogin,
                password: senha
            }
            const resultLogin = await api.get('api/v2/tickets', {
                auth
            }).then( response => {
                    if(response.status == 200){
                        localStorage.setItem('authLogin', auth.username);
                        localStorage.setItem('authPass', auth.password);
                        history.push('/home');
                    }
                }
            )
            
        
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
        return false;
    }

 

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
        </div>
    )
}