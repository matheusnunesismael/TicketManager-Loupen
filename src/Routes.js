import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Paginas
import Login from './pages/Login';
import Main from './pages/Main';
import Newticket from './pages/Newticket';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact  component={ Login }/>
                <Route path='/home' exact  component={ Main }/>
                <Route path='/new' exact  component={ Newticket }/>
            </Switch>
        </BrowserRouter>
    )
}
