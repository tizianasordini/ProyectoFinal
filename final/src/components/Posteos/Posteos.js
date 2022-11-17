 import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import Comentarios from '../../screens/Comentarios/Comentarios'

class Posteos extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount:props.data.likes,
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
      <View style={styles.posteo}>
        <Text>{this.props.username}</Text>
        <Image style={styles.image} source={this.props.data.foto} resizeMode={'contain'}/>
        <View style={styles.datosPost}>
        <Text style={styles.tituloPost} >{this.props.data.description}</Text>
        <View>
        <Text>{this.state.likesCount}</Text>  
       
        {
           this.state.miLike ?
                <TouchableOpacity onPress={()=> this.borrarLike()}>
                    <FontAwesome name='heart' color='black' size={16} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={16} />
                </TouchableOpacity>

        }
        </View>
        <View>
            <TouchableOpacity>
                
            </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
  
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      marginBottom: 20,
      
  },
  camarabody:{
      height:500
  },
  image:{
      height: 300,
      width: 300,
      resizeMode: 'contain',
      margin: 15,
      
      
  },
  posteo:{
    marginBottom: 60,
    backgroundColor: 'lightgrey',
    borderEndWidth: 10,
    borderEndColor: 'black',
  },
  tituloPost:{
    fontSize: '16px',
    marginBottom: 10
    
  },
  usuario:{
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '',
    textAlign: 'center',
    marginTop: 15
  },
  datosPost:{
    margin: 10
  }
})

export default Posteos 



