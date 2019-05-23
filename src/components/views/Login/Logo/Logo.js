import React,{ Component } from 'react';
import { View,Text,StyleSheet,ScrollView,Animated,Easing} from 'react-native';

class Logo extends Component {

    state = {
        sellAnim: new Animated.Value(0),
        itAnim: new Animated.Value(0)
    }

    componentDidMount(){
        Animated.sequence([
            Animated.timing(this.state.sellAnim,{
                toValue:1,
                duration:1000,
                easing: Easing.easeOutCubic
            }),
            Animated.timing(this.state.itAnim,{
                toValue:1,
                duration:500,
                easing: Easing.easeOutCubic
            })
        ]).start(() => {
            this.props.showLogin()
        })
    }

    render(){
        console.log(this.props.orientation)
        return(
            <View>
                <View style={this.props.orientation === "portrait" ? styles.portraitLogo : styles.landScapeLogo}>
                    <Animated.View style={{opacity: this.state.sellAnim,top:this.state.sellAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[100,0]
                    })}}>
                        <Text style={styles.sell}>Sell</Text>
                    </Animated.View>
                    <Animated.View style={{opacity: this.state.itAnim,top:this.state.sellAnim.interpolate({
                        inputRange:[0,1],
                        outputRange:[100,0]
                    })}}>
                        <Text style={styles.it}>It</Text>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    portraitLogo:{
        marginTop:50,
        flex:1,
        flexDirection:'row',
        maxHeight:100
    },
    landScapeLogo:{
        marginTop:10,
        flex:1,
        flexDirection:'row',
        maxHeight:50
    },
    sell:{
        fontSize:40,
        fontFamily:"RobotoCondensed-Regular",
        color:"#555555"
    },
    it:{
        fontSize:40,
        fontFamily:"RobotoCondensed-Regular",
        color:"#00ADA9"
    }
})

export default Logo;