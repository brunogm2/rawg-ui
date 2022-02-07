import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ViewGame from './pages/ViewGame'

export default function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/games/:id" component={ViewGame} />
        </Switch>
    );
}