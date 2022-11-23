 import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import Comentarios from '../../screens/Comentarios/Comentarios'
import HomeNavigation from '../../navigation/HomeNavigation'

class Posteos extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount:props.data.likes.length,
            commentCount: props.data.comments,
            miLike: false
        }
    }

    componentDidMount(){
      let miLike = this.props.data.likes.includes(auth.currentUser.email)
      if(miLike){
        this.setState({
          miLike:true
        })
      }
    }

    like(){
      db
      .collection('posteos').doc(this.props.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          miLike:true,
          likesCount: this.state.likesCount.length + 1
        })
      })
      .catch(err => console.log(err))
    }

    borrarLike(){
      db.collection('posteos').doc(this.props.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          miLike:false,
          likesCount: this.state.likesCount.length - 1
        })
      })
      .catch(e => console.log(e))
    }
    
  render() {
    console.log(this.props)
    return (
      <View style={styles.contenedorPosteo}>
        
        <View>
          <TouchableOpacity  onPress={ () => this.props.navigation.navigate('HomeNavigation', {screen: 'PerfilAmigos', params:{email:this.props.data.owner}})}>
            <Text style={styles.nombreUsuario}>{this.props.data.owner}</Text>
          </TouchableOpacity>
        </View>

        <Image style={styles.image} source={this.props.data.foto} resizeMode={'contain'}/>

        <Text>{this.state.likesCount}</Text>
          
        {
          this.state.miLike ?
            <TouchableOpacity onPress={()=> this.borrarLike()}>
              <FontAwesome name='heart' color='black' size={16} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=> this.like()}>
              <FontAwesome style={styles.corazon} name='heart-o' color='red' size={16} />
            </TouchableOpacity>
        }
        
        <View>
          <Text style={styles.descripcion}>{this.props.data.description}</Text>
        </View>
        
        <View>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comentarios',{id:this.props.id})}>
            <Text style={styles.comentario}>Crear Comentario</Text>                
          </TouchableOpacity>
        </View>

      </View>
    )
  }
  
}
const styles = StyleSheet.create({
  contenedorPosteo: {
    flex:1,
    backgroundColor: "#FDFDFF",
    paddingBottom: 40
  },
  nombreUsuario:{
    marginHorizontal: 10,
    fontSize: 20,
  },
  image:{
      height: 350,
      width: 400,
      resizeMode: 'contain',
    },
  corazon:{
    margin: 10,
  },
  descripcion:{
    margin: 10,
    fontSize: 16,
  },
  comentario:{
    margin: 10,
  }
})

export default Posteos 



