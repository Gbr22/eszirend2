import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { setUpdate, initalGlobalState, GlobalContext } from './app/GlobalState';
import { HomeScreen } from './app/screens/home/screen';
import { ViewerScreen } from './app/screens/viewer/screen';



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle:{
          backgroundColor: "#fff",
        }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, title: "Kezdőlap"}} />
      <Stack.Screen name="Viewer" component={ViewerScreen} options={{headerShown: false, title: "Órarend"}} />
    </Stack.Navigator>
  );
}

let linking = {
  config:{
    screens:{
      Home:{
        path: "",
      },
      Viewer:{
        path: "timetable/:type/:id",
        parse: {
          id: s=>unescape(s),
          type: String,
        },
        stringify: {
          id: s=>escape(s),
        }
      }
    }
  }
}

export default class App extends React.Component {

  state=Object.assign({},initalGlobalState);
  componentDidMount(){
    
    setUpdate((o)=>{
      this.update(o);
    });
    console.log("App mounted");
  }
  update(o){
    this.setState(o);
  }
  render() {
    if (this.state.timetableData){
      return (
        <NavigationContainer linking={linking}>
          <GlobalContext.Provider value={{state:this.state, update:(o)=>{this.update(o)}}}>
            <MyStack />
            <StatusBar style="auto" />
          </GlobalContext.Provider>
        </NavigationContainer>
        
      );
    }
    return <View></View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
