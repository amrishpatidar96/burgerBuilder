import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import {authCheckState} from './store/actions/index';

class App extends Component {
  
  render(){

  //console.log("App.js");
  
  let routes ;

  routes = (
    <Switch>      
      <Route path="/auth"    component={Auth}/>
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>);
  
    if(this.props.token)
    {
      routes = (
        <Switch>      
          <Route path="/checkout"    component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>);
    }

    //if i remove routes variable from above and go with below commented code than 
    //i did not face any problem .but if i comment below routes variable and work with the above 
    //than i am facing problem that when i click on submit button of Auth.js file or /auth route
    //(without or with selecting any ingredient from /burgerBuilder route.
    // when user click on submit button of Auth.js file .it will dispatch auth action in redux store 
    //than that will dispatch authStart than after receiving response from firebase than we dispatch authSuccess which changes token and some other data in redux.
    //than this changes will rerender all component who has auth object state in their mapStateToProps.but token is not updating in mapStateToProps in Auth.js file    
    //where am i wrong .




    // routes = (
    //   <Switch>      
    //     <Route path="/auth"    component={Auth}/>
    //     <Route path="/checkout"    component={Checkout} />
    //       <Route path="/orders" component={Orders} />
    //       <Route path="/logout" component={Logout} />
    //     <Route path="/" exact component={BurgerBuilder} />
    //   </Switch>);
    

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

  componentDidMount() {
    this.props.onAuthCheck();
  }
  
}

const mapStateToProps = (state)=>{
  return {
    token:state.auth.token
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    onAuthCheck:() =>dispatch(authCheckState()) //when try to auto signin
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
