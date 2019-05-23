import { Navigation } from 'react-native-navigation';
import FalseIcon from '../../../assets/images/circle.png';
import Icon from 'react-native-vector-icons/FontAwesome';


const LoadTabs = (allow) => {
  //Convert icon to actual images
  Icon.getImageSource('search',15,'#fff').then(source1 => {
    Icon.getImageSource('dollar',15,'#fff').then(source2 => {
      Navigation.setRoot({
        root: {
          sideMenu:{
            left:{
              component:{
                name:"carousell.Drawer",
                id:"leftSideDrawer"
              }
            },
            center:{
              bottomTabs: {
                id:"bottomTabs",
                children: [{
                  stack: {
                    children: [{
                      component: {
                        name: 'carousell.Home',
                        options:{
                          topBar:{
                            visible:true,
                            background:{
                              color:"#00ADA9"
                            },
                            title:{
                              text:"Carousell",
                              fontSize:20,
                              fontFamily:"RobotoCondensed-Bold",
                              color:"#fff"
                            }
                          },
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        text: 'Home',
                        testID: 'Home',
                        fontFamily:"Roboto-Light",
                        fontSize:15,
                        icon:source1,
                        textColor:"#fff"
                      },
                      bottomTabs:{
                        backgroundColor:"#00ADA9"
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [{
                      component: {
                        name: allow ? 'carousell.AddPost' : 'carousell.NotAllow',
                        options:{
                          topBar:{
                            visible:true,
                            background:{
                              color:"#00ADA9"
                            },
                            title:{
                              text:"Carousell",
                              fontSize:20,
                              fontFamily:"RobotoCondensed-Bold",
                              color:"#fff"
                            }
                          },
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        text: 'Sell Now',
                        testID: 'Sell Now',
                        fontFamily:"Roboto-Light",
                        fontSize:15,
                        icon:source2,
                        textColor:"#fff"
                      },
                      bottomTabs:{
                        backgroundColor:"#00ADA9"
                      }
                    }
                  }
                }
              ]
          }
            },
            options:{
              sideMenu:{
                left:{
                  width:250
                }
              }
            }
          }
        }
      })


    })

    
  })
    
}

export default LoadTabs;