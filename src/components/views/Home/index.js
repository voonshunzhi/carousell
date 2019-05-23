import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigatorDrawer,gridTwoColumns } from '../../utils/misc';
import HorizontalScrollIcons from './horizontal_scroll_icon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../store/actions/actionCreator';
import BlockItem from './BlockItem';

class Home extends Component{

  constructor(props){
    super(props);
    Navigation.events().bindComponent(this);

    this.state = {
      categories:[
        "All","Sports","Music","Clothing","Electronics"
      ],
      categorySelected: "All",
      articles:[],
      isLoading: true
    }
  }

  navigationButtonPressed({ buttonId }){
    navigatorDrawer();
  }

  updateCategoryHandler = (cat) => {
    this.setState({
      categorySelected: cat,
      isLoading: true,
      articles:[]
    })

    this.props.getArticles(cat).then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.payload);
      this.setState({
        articles: newArticles,
        isLoading: false
      })
    })
  }

  gotoArticleHandler = (props) => {
    Navigation.push(this.props.componentId,
      {
        component:{
          name:"carousell.Article",
          passProps:{
            ArticleData:props
          },
          options:{
            topBar:{
              visible:true,
              backgroundColor:"#00ADA9"
            },
            title:{
              text:"Carousell",
              fontSize:20,
              fontFamily:"RobotoCondensed-Bold",
              color:"#fff"
            }
          }
        }
      }
    )
  }

  showArticles = () => {
    return this.state.articles.map((item,i) => {
      return <BlockItem key={`columnHome-${i}`} item={item} iteration={i} goTo={this.gotoArticleHandler}/>
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <HorizontalScrollIcons categories={this.state.categories}
            categorySelected={this.state.categorySelected}
            updateCategoryHandler={this.updateCategoryHandler}
          />
          {
            this.state.isLoading ?  
              <View style={styles.isLoading}>
                <Icon name="gears" size={30} color="lightgrey"/>
                <Text style={{color:"lightgrey"}}>Loading ... </Text>
              </View>
            : null
          }
          <View style={styles.articlesContainer}>
              {this.showArticles()}
          </View>
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

    this.props.getArticles("All").then(() => {
      const newArticles = gridTwoColumns(this.props.Articles.payload);
      this.setState({
        articles: newArticles,
        isLoading: false
      })
    })
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:5
  },
  isLoading:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    marginTop: 100
  },
  articlesContainer:{
    flex:1,
    padding:10,
    flexDirection:"column",
    justifyContent:"space-between"
  }
});

const mapStateToProps = state => {
  return {
    Articles: state.Article
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({getArticles},dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(Home)