import React,{ Component } from 'react';
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Modal,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from 'react-native-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUserPosts,deleteUserPost} from '../../../store/actions/actionCreator';

class UserPosts extends Component{

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
        this.state = {
            posts:[],
            modal:false,
            toDelete:null
        }
    }

    navigationButtonPressed({ buttonId }){
        if(buttonId == "DismissModal"){
            Navigation.dismissModal("Modal");
        }
    }

    deletePost = (ID) => {
        this.props.deleteUserPost(ID,this.props.User.userData).then(() => {
            this.props.getUserPosts(this.props.User.userData.uid).then(() => {
                this.setState({
                    posts: this.props.User.userPosts,
                    modal:false,
                    toDelete:null
                })
            })
        })
    } 

    showConfirm = ID => {
        this.setState({
            toDelete:ID,
            modal:true
        })
    }

    showPosts = (posts) => {
        return posts.length > 0 ? 
        posts.map((item,index) => {
            return (<View style={styles.itemWrapper} key={item.id}>
                    <View style={styles.itemTitle}>
                        <Text style={{
                            fontFamily:"Roboto-Black"
                        }}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={styles.itemDescription}>
                        <Text>{item.description}</Text>
                        <View style={{marginTop:10}}>
                            <Text style={styles.small}>PRICE: ${item.price}</Text>
                            <Text style={styles.small}>CATEGORY: {item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.Button}>
                        <TouchableOpacity onPress={() => this.showConfirm(item.id)}>
                            <Text style={{fontFamily:"Roboto-Black",color:"#F44336",paddingBottom:10}}>
                                Delete this post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>)
        }):<Text>Tap on Sell now to create your 1st listing!</Text>
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={{marginBottom:30}}>
                        <Text style={{marginBottom:10}}>You have {this.state.posts.length } posts</Text>
                        {this.showPosts(this.state.posts)}
                    </View>
                </View>
                <Modal visible={this.state.modal}>
                    <View style={styles.Modal}>
                        <Text>Are you sure you want to delete the post?</Text>
                        <Button title="Yes please delete it!" onPress={() => this.deletePost(this.state.toDelete)}/>
                        <Button title="No i don't want to delete it!" onPress={() => this.setState({modal:false,toDelete:null})}/>
                    </View>
                </Modal>
            </ScrollView>
        )
    }

    componentDidMount = () => {
        this.props.getUserPosts(this.props.User.userData.uid).then(() => {
            this.setState({
                posts: this.props.User.userPosts
            })
        })
        Icon.getImageSource("chevron-left",20,"#fff").then(source => {
            Navigation.mergeOptions(this.props.componentId,{
                topBar:{
                    leftButtons:[
                        {
                            id:"DismissModal",
                            icon: source,
                            color:"#fff"
                        }
                    ]
                }
            })
        })
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        User:state.User
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getUserPosts,deleteUserPost},dispatch);
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    },
    itemWrapper:{
        borderWidth:1,
        borderColor:"#ececec",
        borderRadius:2,
        marginBottom:20
    },
    itemTitle:{
        borderBottomWidth:1,
        borderColor:"#ececec",
        padding:10,
        backgroundColor:"#f5f5f5"
    },
    small:{
        fontSize:12
    },
    Button:{
        alignItems:"center"
    },
    Modal:{
        marginTop: 100,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(UserPosts);