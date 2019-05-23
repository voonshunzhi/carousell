import React,{ Component } from 'react';
import {Text,View,StyleSheet,Button,TextInput} from 'react-native';
import { validation } from '../../../utils/form/misc';
import { connect } from 'react-redux';
import { setToken,getToken } from '../../../utils/misc';
import { signUp,signIn } from '../../../store/actions/actionCreator';
import { bindActionCreators } from 'redux';
import LoadTabs from '../../Tabs/index';

class LoginForm extends Component{

    state = {
        type:"Login",
        action:"Login",
        actionMode:"Not a user,? Register!",
        hasError:false,
        form:{
            email:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    isRequired: true,
                    isEmail:true
                }
            },
            password:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    minLength:6,
                    isRequired: true
                }
            },
            confirmPassword:{
                value:"",
                valid:false,
                type:"textinput",
                rules:{
                    confirmPass:""
                }
            }
        }
    }

    updateInput = (name,value) => {
        this.setState({
            hasError: false
        })
        const formCopy = this.state.form
        formCopy[name].value = value;

        if(name === "password"){
            formCopy["confirmPassword"].rules.confirmPass = value;
        }

        rules = formCopy[name].rules

        let valid = validation(value,rules)

        formCopy[name].valid = valid;

        this.setState({
            form: formCopy
        })
    }

    changeFormType = () => {
        this.setState((prevState,props) => {
            return {
                type: prevState.type === "Login" ? "Register" : "Login",
                action: prevState.type === "Login" ? "Register" : "Login",
                actionMode: prevState.type === "Login" ? "Registered? Login!" : "Not a user? Register!" 
            }
    })
    }

    confirmPassword = () => {
        return this.state.type != "Login" ? <TextInput style={styles.Input} secureTextEntry placeholder="Confirm your password" type={this.state.form.confirmPassword.type} onChangeText={(val) => this.updateInput("confirmPassword",val)}/> : null
    }

    manageAccess = () => {
        if(!this.props.User.userData.uid){
            this.setState({
                hasError:true
            })
        }else{
            setToken(this.props.User.userData,() => {
                this.setState({
                    hasError:false
                })
                LoadTabs(true)
            })
        }
    }


    submitUser = () => {
        let formIsValid = true;
        let formCopy = this.state.form
        let formToSubmit = {}
        for(let key in formCopy){
            if(this.state.type === "Login"){
                if(key !== 'confirmPassword'){
                    formIsValid = formIsValid && formCopy[key].valid
                    formToSubmit[key] = formCopy[key].value
                }
            }else{
                formIsValid = formIsValid && formCopy[key].valid
                formToSubmit[key] = formCopy[key].value
            }
        }

        if(formIsValid){
            if(this.state.type === "Login"){
                this.props.signIn(formToSubmit).then(() => {
                    this.manageAccess();
                })
            }else{
                this.props.signUp(formToSubmit).then(() => {
                    this.manageAccess();
                })
            }
        }else{
            this.setState({
                hasError: true
            })
        }
    }

    formHasErrors = () => {
        const errorMessage = (
            <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessageText}>Opps! Check your info!</Text>
            </View>
        )
        return this.state.hasError ? errorMessage : null
    }

    render(){
        return(
            <View style={styles.formInput}>
                <TextInput style={styles.Input} placeholder="Enter your email" type={this.state.form.email.type} value={this.state.form.email.value} autoCapitalize={"none"} keyboardType={"email-address"} 
                onChangeText={(val) => this.updateInput('email',val)}/>
                <TextInput style={styles.Input} secureTextEntry placeholder="Enter your password" type={this.state.form.password.type} 
                value={this.state.form.password.value} onChangeText={(val) => this.updateInput("password",val)}/>

                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={styles.Button}>
                    <Button title={this.state.action} color="#fd9727"
                    onPress={this.submitUser}/>
                </View>
                <View style={styles.Button}>
                    <Button title={this.state.actionMode} color="lightgrey" onPress={this.changeFormType}/>
                </View>
                <View style={styles.Button}>
                    <Button title="I'll do it later" color="lightgrey" onPress={() => LoadTabs(false)}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formInput:{
        minHeight:500,
        flex:1,
        alignItems:"center"
    },
    Input:{
        height:50,
        borderBottomColor:"lightgrey",
        borderBottomWidth:1,
        width:"100%"  
    },
    Button:{
        marginTop:10,
        width:"100%"
    },
    errorMessageContainer:{
        marginBottom:20,
        marginTop:10
    },
    errorMessageText:{
        color:'red',
        fontFamily:'Roboto-Black'
    }
})

const mapStateToProps = (state) => {
    return{
        User:state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({signUp,signIn },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);