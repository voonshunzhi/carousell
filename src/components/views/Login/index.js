import React, { Component } from 'react';
import {Text,View,StyleSheet,Button,ScrollView,ActivityIndicator} from 'react-native';
import Logo from './Logo/Logo';
import LoginPanel from './LoginPanel/LoginPanel';
import { setToken,getOrientation,setOrientationListener,removeOrientationListener,getPlatform,getToken } from '../../utils/misc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autoSignIn } from '../../store/actions/actionCreator';
import LoadTabs from '../Tabs';

class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            orientation: getOrientation(500),
            logoAnimation:false,
            platfrom: getPlatform(),
            loading:true
        }

        setOrientationListener(this.changeOrientation)
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    }

    showLogin = () => {
        this.setState({
            logoAnimation: true
        })
    }

    render(){
        if(this.state.loading){
            loading = (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            )
            return loading;
        }else{
            let { navigation } = this.props
            return(
                <ScrollView>
                    <View style={styles.container}>
                        <Logo
                        showLogin={this.showLogin} 
                        orientation={this.state.orientation}/>
                        <LoginPanel  platform={this.state.platform} show={this.state.logoAnimation} orientation={this.state.orientation} />
                    </View>
                </ScrollView>
            )
        }
    }

    componentWillUnmount(){
        removeOrientationListener();
    }

    componentDidMount(){
        getToken((value) => {
            if(value[0][1] === null){
                this.setState({
                    loading:false
                })
            }else{
                this.props.autoSignIn(value[1][1]).then(() => {
                    if(!this.props.User.userData.token){
                        this.setState({
                            loading:false
                        })
                    }else{
                        setToken(this.props.User.userData,() => {
                            LoadTabs(true);
                        })
                    }
                })
            }
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center"
    },
    loading:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    }
})

const mapStateToProps = (state) => {
    return{
        User: state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({autoSignIn},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);