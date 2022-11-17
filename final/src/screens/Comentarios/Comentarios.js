import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comentarios extends Component {
  constructor(props){
    super(props)
    this.state = {
      posteaComentario:'',
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
      })
    })
  }

  nuevoComentario(idDoc, text){
    db.collection('posteos')
    .doc(idDoc)
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comentario: text
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <View>
        <Text>Seccion de Comentarios</Text>
        <View>

          <FlatList
          data={this.state.data.comentarios}
          keyExtractor={ item => item.createdAt.toString()}
          renderItem={ ({item}) => 
          <Text> {item.comentario} </Text>}/>

          {
            this.state.data.comentarios ?
            <Text>Cantidad de Comentarios: {this.state.data.comentarios.length}</Text>
            :
            ''
          }
          

        </View>
        <View>
          <TextInput
            onChangeText={text => this.setState({posteaComentario: text})}
            style = {styles.input}
            keyboardType='default'
            placeholder='Crea un comentario'
            value={this.state.posteaComentario}
          />
          <TouchableOpacity onPress={()=> this.nuevoComentario(this.state.id, this.state.posteaComentario)}>
            <Text>postear comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth:1,
    height:32
  }
})

export default Comentarios


