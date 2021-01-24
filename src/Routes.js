import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Paginas
import Login from './pages/Login';
import Main from './pages/Main';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact  component={ Login }/>
                <Route path='/home' exact  component={ Main }/>
            </Switch>
        </BrowserRouter>
    )
}
