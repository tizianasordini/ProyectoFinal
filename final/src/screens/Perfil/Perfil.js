import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state ={
        allPosts: []
      }
    }

    componentDidMount(){
      db.collection('posteos')
        //.where
      .onSnapshot(docs => {

        let posts = []
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
  
        this.setState({
          allPosts: posts
        }, () => console.log(this.state.allPosts))
      })
    }
    //

    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    
    render() { 
        return(
            <View>
                <Text>Perfil</Text>
                <Text >Bienvenido: </Text>
                <TouchableOpacity
                onPress={() => this.signOut()}
                style = {styles.button}
                >
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
      padding:10,
      borderColor:'blue',
      borderWidth: 1
   } })

export default Perfil