import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Paginas
import Login from './pages/Login';
import Main from './pages/Main';
import Newticket from './pages/Newticket';
import Viewticket from './pages/Viewticket';
import Changeticket from './pages/Changeticket';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact  component={ Login }/>
                <Route path='/home' exact  component={ Main }/>
                <Route path='/new' exact  component={ Newticket }/>
                <Route path='/ticket/:id' exact  component={ Viewticket }/>
                <Route path='/edit/:id' exact  component={ Changeticket }/>
            </Switch>
        </BrowserRouter>
    )
}
