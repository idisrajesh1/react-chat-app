import Join from './components/join/Join';
import Chat from './components/chat/Chat';
import './App.css';

import {BrowserRouter as Router ,Route} from 'react-router-dom'
import { HomeContainer } from './containers/HomeContainer';
import { Register } from './containers/RegisterContainer';
import Login from './components/LogIn/login';
import {ChatFeedBack} from './components/chatFeedBack/chatFeedback';
import MyTabsComponent from './components/TestComponent'
import HrChatFeed from './components/hrchatComponent/HrChatFeed';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/register" component={Register}>
        </Route>
      <Route path="/chat" exact component={ChatFeedBack}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/testCompnent" exact component={MyTabsComponent}></Route>
      <Route path = "/hrChatfeed" exact component={HrChatFeed}></Route>
      <Route path="/chat/:conversationId" component={ChatFeedBack}/>
    </Router>
  );
}

export default App;
