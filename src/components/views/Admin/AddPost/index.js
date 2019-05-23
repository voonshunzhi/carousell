import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,ScrollView,TextInput,Modal } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigatorDrawer,getToken,setToken } from '../../../utils/misc';
import Input from '../../../utils/form/Inputs/Input';
import { validation } from '../../../utils/form/misc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addArticle,autoSignIn,resetArticle } from '../../../store/actions/actionCreator';

class AddPost extends Component{

  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);

    this.state = {
      showModal:false,
      loading:false,
      hasErrors:false,
      modalSuccess:false,
      errorsArray:[],
      form:{
        category:{
          value:"",
          name:"category",
          valid:false,
          type:"picker",
          options:["Select a category","Sports","Music","Clothing","Electronics"],
          rules:{
            isRequired:true
          },
          errorMessage:"You need to select a category"
        },
        title:{
          value:"",
          name:"title",
          valid:false,
          type:"textInput",
          rules:{
            isRequired:true,
            maxLength:50
          },
          errorMessage:"You need to enter a title max of 50"
        },
        description:{
          value:"",
          name:"description",
          valid:false,
          type:"textInput",
          rules:{
            isRequired:true,
            maxLength:200
          },
          errorMessage:"You need to enter a description max of 200"
        },
        price:{
          value:"",
          name:"price",
          valid:false,
          type:"textInput",
          rules:{
            isRequired:true,
            maxLength:6
          },
          errorMessage:"You need to enter a price"
        },
        email:{
          value:"",
          name:"email",
          valid:false,
          type:"textInput",
          rules:{
            isRequired:true,
            isEmail:true
          },
          errorMessage:"You need to enter an email" 
        }
      }
    }
  }

  navigationButtonPressed({ buttonId }){
      navigatorDrawer(buttonId,this.props.componentId,"carousell.AddPost");
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

submitFormHandler = () => {
  let isFormValid = true;
  let dataToSubmit = {} ;
  let errorsArray = []
  const formCopy = this.state.form;
  for(let key in formCopy){
    isFormValid = isFormValid && formCopy[key].valid;
    dataToSubmit[key] = this.state.form[key].value
  }

  if(isFormValid){
    console.log(dataToSubmit);
    this.setState({
      loading:true
    })

    getToken((value) => {
      const dateNow = new Date();
      const expiration = dateNow.getTime();
      const form = {
        ...dataToSubmit,
        uid:value[3][1]
      }

      if(expiration > value[2][1]){
        this.props.autoSignIn(value[1][1]).then(() => {
          setToken(this.props.User.userData,() => {
            this.props.addArticle(form,this.props.User.userData.token).then(() => {
              this.setState({
                modalSuccess:true
              })
            })
          })
        })
      }else{
        this.props.addArticle(form,this.props.User.userData.token).then(() => {
          this.setState({
            modalSuccess:true
          })
        })
      }

    })
  }else{
    for(let key in formCopy){
      if(!formCopy[key].valid){
        errorsArray.push(formCopy[key].errorMessage)
      }
    }

    this.setState({
      loading:false,
      hasErrors:true,
      errorsArray: errorsArray,
      showModal: true
    })
  }

  
}

resetSellItScreen = () => {
  const formCopy = this.state.form
  for(let key in formCopy){
    formCopy[key].valid = false;
    formCopy[key].value = "";
  }
  this.setState({
    modalSuccess:false
  })
}

showErrorsArray = (errorsArray) => {
  let content = null;
  if(errorsArray.length > 0 ){
    content = (
      <View style={{alignItems:"center",justifyContent:"center"}}>
        { errorsArray.map((item,i) => <Text key={i} style={styles.errorItem}>{item}</Text>) }
      </View>
    )
  }
  return content;
}

  render() {
    return (
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={{ flex:1,alignItems:"center"}}>
            <Text style={styles.mainTitle}>Sell your things!</Text> 
          </View>

          <View style={{flexDirection:"row",alignItems:"center"}}>
            <View style={{flex:1}}>
              <Text>Select a category</Text>
            </View>
            <View style={{flex:2}}>
                <Input placeholder="Select a category" 
                onValueChange={(itemValue,itemIndex) => this.updateInput("category",itemValue)} 
                type={this.state.form.category.type}
                value={this.state.form.category.value}
                options={this.state.form.category.options}/>
            </View>
          </View>
          <View style={{flex:1,alignItems:"center"}}>
            <Text style={styles.secondTitle}>Describe what you sell</Text>
          </View>

          <View>
            <Text style={{marginBottom:10}}>Please add the title, be descriptive!</Text>
            <Input placeholder="Enter a title" 
                onChangeText={itemValue=> this.updateInput("title",itemValue)} 
                type={this.state.form.title.type}
                value={this.state.form.title.value}
                options={this.state.form.title.options}
                overrideStyle={styles.inputText}/>
          </View>

          <View style={{marginTop:10}}>
            <Input placeholder="Enter a description" 
                  onChangeText={itemValue=> this.updateInput("description",itemValue)} 
                  type={this.state.form.description.type}
                  value={this.state.form.description.value}
                  options={this.state.form.description.options}
                  multiline={true}
                  numberOfLines={4}
                  overrideStyle={styles.inputTextMultiline}/>
          </View>

          <View>
            <Text style={{marginTop:20,marginBottom:20}}>
              Add here how much you want for the item.
            </Text>
            <Input 
                  placeholder="Enter the price"
                  onChangeText={itemValue=> this.updateInput("price",itemValue)} 
                  type={this.state.form.price.type}
                  value={this.state.form.price.value}
                  options={this.state.form.price.options}
                  overrideStyle={styles.inputText}
                  keyboardType={"numeric"}/>
          </View>

          <View style={{flex:1,alignItems:"center"}}>
            <Text style={styles.secondTitle}>Describe add your contact data</Text>
          </View>

          <View>
            <Text>Please enter the email where users can contact</Text>
            <Input 
                  placeholder="Enter the email"
                  onChangeText={itemValue=> this.updateInput("email",itemValue)} 
                  type={this.state.form.email.type}
                  value={this.state.form.email.value}
                  options={this.state.form.email.options}
                  overrideStyle={styles.inputText}
                  autoCapitalize={"none"}
                  keyboardType={"email-address"}/>
          </View>

          {
            !this.state.loading && <Button title="Submit Post" onPress={() => this.submitFormHandler()} color="lightgrey"/>
          }


          <Modal animationType="slide" visible={this.state.showModal} onRequestClose={() => {}}>
            <View style={{padding:50}}>
              {this.showErrorsArray(this.state.errorsArray)}
              <Button title="Got it" onPress={() => this.setState({
                hasErrors:false,
                showModal:false,
                errorsArray:[] 
              })}/>
            </View>
          </Modal>


          <Modal animationType="slide" visible={this.state.modalSuccess} onRequestClose={() => {}}>
              <View style={{padding:50}}>
                <Text>Good Job!!!</Text>
                <Button title="Go Back Home" onPress={() => {
                  this.resetSellItScreen();
                  Navigation.mergeOptions(this.props.componentId,{
                    bottomTabs:{
                      currentTabIndex:0
                    }
                  })
                }}/>
              </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }

  componentDidMount(){
    Icon.getImageSource("bars",30,'#fff').then(image => {
      Navigation.mergeOptions(this.props.componentId,{
        topBar:{
          leftButtons:[
            {
              id:"toggleMenu",
              icon: image,
              color:"#fff"
            }
          ]
        }
      })
    })
  }
}

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    flexDirection:"column",
    padding:20
  },
  mainTitle:{
    fontFamily:"Roboto-Black",
    fontSize:30,
    color:"#00ADA9"
  },
  secondTitle:{
    fontFamily:"Roboto-Black",
    fontSize:20,
    color:"#00ADA9",
    marginBottom:30,
    margin:30
  },
  inputText:{
    backgroundColor:"#f2f2f2",
    borderBottomWidth:0,
    padding:10
  },
  inputTextMultiline:{
    backgroundColor:"#f2f2f2",
    borderBottomWidth:0,
    padding:10,
    height:100
  },
  errorItem:{
    fontFamily:"Roboto-Black",
    fontSize:16,
    color:"red",
    marginBottom:10
  }
});

const mapStateToProps = state => {
  return{
    Article:state.Article,
    User:state.User
  }
}

const mapDispatchToActions = (dispatch) => {
  return bindActionCreators({autoSignIn,addArticle,resetArticle},dispatch)
}

export default connect(mapStateToProps,mapDispatchToActions)(AddPost)