import React,{ Component } from 'react';
import { Text,View,StyleSheet,Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { navigateToTab,navigateToModal } from '../../utils/misc'; 

class SideDrawer extends Component{

    state = {
        buttons:[
            {
                value:"Home",
                iconName:"home",
                shouldGoto:"carousell.Home",
                typeLink:"tab",
                index:0,
                privacy:false
            },
            {
                value:"Sell",
                iconName:"dollar",
                shouldGoto:"carousell.AddPost",
                typeLink:"tab",
                index:1,
                privacy:false
            },
            {
                value:"My Posts",
                iconName:"th-list",
                shouldGoto:"carousell.UserPosts",
                typeLink:"view",
                index:null,
                privacy:true   
            }
        ]
    }

    navigateTo = (button) => {
        if(button.typeLink == "tab"){
            navigateToTab(button.index)    
        }else{
            navigateToModal(button.shouldGoto)
        }
    }

    button = (button) => {
        return (
            <Icon.Button key={button.value} name={button.iconName} backgroundColor="#474143" color="#fff" 
            size={18} onPress={() => {
                this.navigateTo(button);
            }}>
                <Text style={styles.text}>{button.value}</Text>
            </Icon.Button>
        )
    }

    showButtons = (buttons) => {
        return buttons.map(button => (
            !button.privacy ? this.button(button) : this.props.User.userData ? this.button(button):null
        ))
    }

    render(){
        return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                {this.showButtons(this.state.buttons)}
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#474143",
        paddingTop:50
    },
    buttonContainer:{
        margin:15
    },
    text:{
        color:"#fff",
        marginLeft:10
    }
})

const mapStateToProps = (state) => {
    return{
        User:state.User
    }
}


export default connect(mapStateToProps,null)(SideDrawer);