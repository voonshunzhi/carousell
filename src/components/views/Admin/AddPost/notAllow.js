import React,{ Component } from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';

class NotAllow extends Component{
    render(){
        return(
            <View style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Icon name="frown-o" size={60} color="#F44336"/>

                <Text>
                    You need to login or register to sell !
                </Text>

                <Button title="LOGIN/REGISTER" color="#FD9727" onPress={() => {
                    Navigation.setRoot({
                        root: {
                          stack: {
                            children: [{
                              component: {
                                name: 'carousell.Login'
                              }
                            }],
                            options: {
                              topBar: {
                                visible:false,
                                title: {
                                  text: 'Carousell'
                                },
                                background: {
                                  color: 'transparent'
                                }
                              }
                            }
                          }
                        }
                      });
                }}/>
                
            </View>
        )
    }
}

export default NotAllow;