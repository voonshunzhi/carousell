import React,{ Component } from 'react';
import { TouchableOpacity,View,Text,StyleSheet,Image } from 'react-native';

const BlockItem = props => {

    const itemText = (item) => {
        return (
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemTextTitle}>
                    {item.title}
                </Text>
                <Text style={styles.itemTextPrice}>
                    $ {item.price}
                </Text>
            </View>
        )
    }

    const itemImage = () => {
        return (
            <View>
                <Image resizeMode={"cover"} 
                style={styles.itemImage}
                source={{ uri:'https://loremflickr.com/400/400/football,bowling,dog'}}
                />
            </View>
        )
    }

    const block = ({item,i}) => {
        return (
            <View style={styles.blockRow}>
                <TouchableOpacity style={{ flex:1}} onPress={() => props.goTo(item.blockOne)}>
                    <View style={[styles.BlockGridStyle,styles.BlockGridStyleRight]}>
                        {itemImage()}
                        {itemText(item.blockOne)}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex:1}} onPress={() => props.goTo(item.blockTwo)}>
                    <View style={[styles.BlockGridStyle,styles.BlockGridStyleLeft]}>
                        {itemImage()}
                        {itemText(item.blockTwo)}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return block(props);
}

const styles = StyleSheet.create({
    blockRow:{
        flexDirection:'row',
        justifyContent:"space-around",
        marginBottom:10
    },
    itemImage:{
        width:"100%",
        height:150
    },
    itemTextContainer:{
        padding:10,
        borderLeftWidth:4,
        borderLeftColor:'#FF6444'
    },
    itemTextTitle:{
        fontFamily:"Roboto-Black",
        color:"#4C4C4C",
        marginBottom: 5
    },
    itemTextPrice:{
        fontFamily:"Roboto-Black",
        color:"#00ada9",
        marginBottom:5
    },
    BlockGridStyle:{
        backgroundColor:"#f1f1f1"
    },
    BlockGridStyleLeft:{
        marginLeft:2.5
    },
    BlockGridStyleRight:{
        marginRight:2.5
    }
})

export default BlockItem;