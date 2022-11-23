import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import {db} from '../../firebase/config'
import Posteos from '../../components/Posteos/Posteos'
import { TouchableOpacity } from 'react-native-gesture-handler'


class Home extends Component {
  constructor(){
    super()
    this.state={
      losPosteos:[]
    }
  }

  componentDidMount(){
    db.collection('posteos').onSnapshot(docs =>{
      let posteo = []
      docs.forEach(doc => {
        posteo.push({
          id:doc.id,
          data:doc.data()
        })
      })
      
      this.setState({
        losPosteos: posteo
      })
    })
  }
  render() {
    return (
      <>
        <View style={styles.container2}>
          <FlatList
            data={this.state.losPosteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Posteos data={item.data} navigation={this.props.navigation} id={item.id}    />}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container2:{
    flex: 1
  }
})

export default Home
