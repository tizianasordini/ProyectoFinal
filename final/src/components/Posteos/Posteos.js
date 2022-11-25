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
          likesCount: this.state.likesCount + 1
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
          likesCount: this.state.likesCount - 1
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

        
          
        {
          this.state.miLike ?
            <View style={styles.container1}>
              <Text style={styles.descripcion}>{this.props.data.description}</Text>
              
                <TouchableOpacity onPress={()=> this.borrarLike()}>
                  <Text>{this.state.likesCount}
                  <FontAwesome style={styles.corazon} name='heart' color='red' size={20} />
                  </Text>
                </TouchableOpacity>
              
            </View>
            :
            <View style={styles.container1}>
              <Text style={styles.descripcion}>{this.props.data.description}</Text>
              
                <TouchableOpacity onPress={()=> this.like()}>
                  <Text>{this.state.likesCount}
                  <FontAwesome style={styles.corazon} name='heart-o' color='red' size={20} />
                  </Text>
                </TouchableOpacity>
              
            </View>
        }
        
        
        <View>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Comentarios',{id:this.props.id})}>
            <Text style={styles.comentario}>Crear Comentario...</Text>                
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
    paddingBottom: 15,
	
  },
  container1:{
		flexDirection:'row', 
		justifyContent:'space-between'
	},
  containerIconos:{
		flexDirection:'row',
	},
  nombreUsuario:{
    marginHorizontal: 15,
    fontSize: 22,
  },
  image:{
      height: 350,
      width: 400,
      resizeMode: 'contain',
    },
  corazon:{
    margin: 15,
  },
  descripcion:{
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 20,
  },
  comentario:{
    margin: 15,
  }
})

export default Posteos 



