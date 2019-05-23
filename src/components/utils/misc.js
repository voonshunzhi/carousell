import { Dimensions,Platform,AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export const API_KEY = "AIzaSyCzYt8JCkJQmKJs222J4zb7aeLTXSDFJEw";
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape"
}

export const setOrientationListener = (callback) => {
    return Dimensions.addEventListener("change",callback)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
    if(Platform.OS === "ios"){
        return "ios"
    }else if(Platform.OS === "android"){
        return "android"
    }
}

export const setToken = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);
    AsyncStorage.multiSet([
        ["@carousell@token",values.token],
        ["@carousell@refreshToken",values.refToken],
        ["@carousell@expireToken",expiration.toString()],
        ["@carousel@uid",values.uid]
    ]).then(response => {
        cb()
    })
} 

export const getToken = (cb) => {
    AsyncStorage.multiGet([
        "@carousell@token",
        "@carousell@refreshToken",
        "@carousell@expireToken",
        "@carousel@uid"
    ]).then(response => {
        cb(response)
    })
}

export const navigatorDrawer = () => {
    if(buttonId = "toggleMenu"){
        Navigation.mergeOptions("leftSideDrawer",{
            sideMenu:{
                left:{
                    visible:true
                }
            }
        })
    }
}

export const navigateToTab = (index) => {
    Navigation.mergeOptions("bottomTabs", {
        bottomTabs: {
          currentTabIndex: index
        }
      });
      Navigation.mergeOptions("leftSideDrawer",{
        sideMenu:{
            left:{
                visible:false
            }
        }
      })
}

export const navigateToModal = (name) => {
    Navigation.showModal({
        stack:{
            children:[
                {
                    component:{
                        id:"Modal",
                        name:name,
                        options:{
                            topBar:{
                                title:{
                                    text:"My Posts",
                                    color:"#fff"
                                },
                                background:{
                                    color:"#00ADA9"
                                }
                            }
                        }
                    }
                }
            ]
        }
    })
}

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {}

    if(articles){
        articles.forEach(element => {
            if(count == 1){
                vessel["blockOne"] = element;
                count++;
            }else{
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel = {}
            }
        });
    }

    return newArticles;
}