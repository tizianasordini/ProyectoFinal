import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'
import {FontAwesome} from '@expo/vector-icons'

class Comentarios extends Component {
  constructor(props){
    super(props)
    this.state = {
      comentarioNuevo:'',
      id:'',
      data:{}
    }
  }

  componentDidMount(){  
    db.collection('posteos').doc(this.props.route.params.id)
    .onSnapshot(doc => {
      this.setState({
        id: doc.id,
        data: doc.data(),
      }, ()=> console.log(this.state.data))
      console.log(doc)
    })
  }

  nuevoComentario(idDoc, text){
    console.log(idDoc, text)
    if (this.state.comentarioNuevo === "" || this.state.comentarioNuevo === false){
      alert('enviar campos completos') // || es or , basicamente es para que no se envien campos vacios 
    } else { 
      db.collection('posteos')
    .doc(idDoc)
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comentario: text
      })
    })
    .then(()=>{
      this.setState({
        comentarioNuevo: '',
      })
    })
    .catch((error)=> console.log(error))
    }
    
  }

  render() {
   console.log(this.state.id)
   console.log(this.props)
   return(
    <View style={styles.contenedor}>
      <View>
        <FlatList
        data={this.state.data?.comentarios}  //singo de pregunta sirve para que si esta undifined el codigo no se rompa
        keyExtractor={item => item.createdAt.toString()}
        renderItem={({item})=> <View style={styles.contenedor}>
          <Text style={styles.nombreUsuario}>{item.owner}</Text>
          <Text style={styles.comentario}>{item.comentario}</Text>
          </View>
          }
        />
      </View>
      <View>
        <TextInput
        onChangeText={text => this.setState({comentarioNuevo:text})}
        style={styles.input}
        keyboardType='default'
        placeholder='Hace tu comentario...'
        value={this.state.nuevoComentario}
        />
        <TouchableOpacity style={styles.boton} onPress={()=> this.nuevoComentario(this.state.id, this.state.comentarioNuevo)}>
          <Text style={styles.textoBoton}>Enviar Comentario</Text>
        </TouchableOpacity>
      </View>
    </View>  
    )
      
  }
}

const styles = StyleSheet.create({
  contenedor:{
    padding: 15,
    backgroundColor: "#FDFDFF",
  },
  input: {
    borderWidth:1,
    borderColor: "grey",
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "white",
    padding: 7
  },
  boton:{
    alignItems: 'center',
    borderRadius: 10,
    padding: 7,
    backgroundColor: 'black',
    marginTop: 8,
    marginBottom: 8,
  },
  textoBoton: {
    color: "white"
  },
  nombreUsuario:{
    fontSize: 22,
  },
  comentario:{
    fontSize: 20,
  }
})

export default Comentarios


