import React, { Component } from "react"
import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { auth, db } from "../../firebase/config";
import firebase from "firebase";

class Comentarios extends Component {
    constructor(props){
        super(props)
        this.state= {
            cometario: ''
        }
    }


    onSubmit(){
        db.collection('posteos').doc(this.props.propsData.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                comentarios: this.state.comentario,
                createdAt: Date.now()
            })
        })
        .then(()=> {
            console.log('Se creo un comentario')
        })
        .catch((error)=> console.log(error))
    }       

    render(){
        return(
            <View>
                <Text>Comentarios</Text>
                <FlatList
                data={this.state.comentario}
                keyExtractor={(posteos)=> posteos.id}
                renderItem={({item})=> <Posteos posteosData={item}/>}
                ></FlatList>
                <TextInput
                onChangeText={(text) => this.setState({comentario:text})}
                placeholder= 'Hacer un comentario'
                keyboardType='default'
                ></TextInput>
                <TouchableOpacity onPress={()=> this.onSubmit()}>
                    <Text>Enviar comentario</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default Comentarios