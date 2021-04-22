import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { setUpdate, initalGlobalState, GlobalContext } from './app/GlobalState';

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
        <GlobalContext.Provider value={{state:this.state, update:(o)=>{this.update(o)}}}>
          <GlobalContext.Consumer>
            {({state, update}) => {
              return <View style={styles.container}>
                <Text>{state.timetableData.info.headerText}</Text>
                <StatusBar style="auto" />
              </View>
            }}
          </GlobalContext.Consumer>
        </GlobalContext.Provider>
        
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
