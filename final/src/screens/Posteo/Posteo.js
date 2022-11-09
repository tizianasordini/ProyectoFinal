import {Text, View, TextInput, TouchableOpacity, StyleSheet, PushNotificationIOS} from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import Camara from '../../components/Camara/Camara'

class Posteo extends Component {

    constructor(){
        super()
        this.state={
            description:'',
            showCamara: true,
            url: ''
        }
    }

    mandarPosteo(description){
        db.collection('posteo').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes: [],
            comentarios: [],
            foto: this.state.url

        })
        .then(resp=> console.log('realizo un posteo'))
        .catch(error => console.log(error))
    }
    
    subirFoto(url){
        this.setState({
            showCamara: false,
            url:url
        })
    }


    render(){
        return(
            <View style = {styles.container}>
            {
                this.state.showCamara ?
                <Camara subirFoto = {(url)=> this.subirFoto(url)} />
                :
             <View>
                <TextInput
                    keyboardType='default'
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    style={styles.input}
                    placeholder='Inserta tu descripcion'
                />
                <TouchableOpacity
                onPress={() => this.mandarPosteo(this.state.description)}
                >
                    <Text>Mandar Posteo</Text>
                </TouchableOpacity>
             </View>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        height: 50
    },
    container:{
        flex:1
    },
})

export default Posteo