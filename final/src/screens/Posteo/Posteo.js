import {Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'

class Posteo extends Component {

    constructor(){
        super()
        this.state={
            description:''
        }
    }

    mandarPosteo(description){
        db.collection('posteo').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes: [],
            comentarios: []   

        })
        .then(resp=> console.log('realizo un posteo'))
        .catch(error => console.log(error))
    }
    


    render(){
        return(
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
        )
    }
}

const styles = StyleSheet.create({
    input:{
        borderWidth: 2,
        height: 50
    }
})

export default Posteo