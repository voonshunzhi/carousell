import { Navigation } from 'react-native-navigation';
import configureStore from './src/components/store/config';
import { Provider } from 'react-redux';

import Home from './src/components/views/Home/index';
import Login from './src/components/views/Login/index';
import AddPost from './src/components/views/Admin/AddPost/index';
import SideDrawer from './src/components/views/SideDrawer/SideDrawer';
import UserPosts from './src/components/views/Admin/UserPosts/UserPosts';
import Article from './src/components/views/Articles/index';
import NotAllow from './src/components/views/Admin/AddPost/notAllow';

const store = configureStore();

Navigation.registerComponentWithRedux("carousell.Home",() => Home,Provider,store);

Navigation.registerComponentWithRedux("carousell.Login",() => Login,Provider,store);

Navigation.registerComponentWithRedux("carousell.AddPost",() => AddPost,Provider,store);

Navigation.registerComponentWithRedux("carousell.Drawer",() => SideDrawer,Provider,store)

Navigation.registerComponentWithRedux("carousell.UserPosts",() => UserPosts,Provider,store);

Navigation.registerComponentWithRedux("carousell.Article",() => Article,Provider,store);

Navigation.registerComponentWithRedux("carousell.NotAllow",() => NotAllow,Provider,store);

export default () => Navigation.events().registerAppLaunchedListener(() => {
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
  });