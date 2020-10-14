import React,{ Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';

const withErrorHandler = (WrappedComponent , axios) =>{
    return class extends Component {
        
        constructor(props)
        {   
            super(props);
            this.state = {
                error: null
            }

            axios.interceptors.request.use(request =>{
                this.setState(()=> {
                   return {error: null} 
                });
                //console.log(request);
                return request;
            });

            axios.interceptors.response.use(response=>response,error=>{
                this.setState({error: error});
                //console.log(error);
            });
        }
        
     

        errorConfirmedHandler = ()=> { 
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                    show = {this.state.error}
                    modalClosed = {this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
    
            );
        }
    }
}

export default withErrorHandler ;