import React,{ Component } from 'react';
import {Text,View,StyleSheet,TextInput,Picker } from 'react-native';

const Input = (props) => {
    let template = null;
    switch(props.type){
        case "textInput":
            template = <TextInput underlineColorAndroid="transparent" {...props} style={[styles.input,props.overrideStyle]} />    
            return template;
            break;
        case "picker" :
            template = (
                <Picker selectedValue={props.value} {...props}>
                    {
                        props.options.map((item,index) => {
                            return <Picker.Item key={index} label={item} value={item}/>
                        })
                    }
                </Picker>
            )
            return template
        break;
        default:
        return template;
    }
}

const styles = StyleSheet.create({
    input:{
        
    }
})

export default Input;