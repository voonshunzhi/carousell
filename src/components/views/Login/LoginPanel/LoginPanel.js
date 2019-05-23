import React, { Component } from 'react';
import { Text,View,StyleSheet,Animated,Easing,Image } from 'react-native';
import BackImage from '../../../../assets/images/loginPanel.jpg';
import LoginForm from '../LoginForm/LoginForm';

class LoginPanel extends Component{

    state = {
        animFinished:false,
        inputForm: new Animated.Value(0),
        backImage: new Animated.Value(0)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.show && !this.state.animFinished){
            Animated.parallel([
                Animated.timing(this.state.backImage,{
                    toValue:1,
                    duration:1000
                }),
                Animated.timing(this.state.inputForm,{
                    toValue:1,
                    duration:1000
                })
            ]).start(() => this.setState({ animFinished: true}));
        }
    }

    render(){
        return(
            <View>
                <Animated.View style={{opacity:this.state.backImage}}>
                    <Image style={this.props.orientation === 'portrait' ? styles.Image : styles.imageLanscape} source={BackImage} resizeMode={"contain"}/>
                </Animated.View>
                <Animated.View style={{opacity:this.state.inputForm,top:this.state.inputForm.interpolate({
                    inputRange:[0,1],
                    outputRange:[100,30]
                })}}>
                    <LoginForm platform={this.props.platform}/>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Image:{
        width:270,
        height:150
    },
    imageLanscape:{
        width:270,
        height:0
    }
})

export default LoginPanel;