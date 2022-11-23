import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity, } from "react-native";
import {auth, db} from '../../firebase/config';
import Camara from "../../components/Camara/Camara";

class Posteo extends Component {
    constructor(){
        super();
        this.state = {
            description: '',
            url: '',
            mostrarCamara: true,
        }
    }

    subirPosteo(){
        db.collection('posteos').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: this.state.description,
            likes: [],
            comentarios: [],
            foto: this.state.url,     //declaro metodo onImageupload
        })
        .then(() => {
            console.log('Creo un posteo');
            this.setState({
                titulo:'',
                description: ''
            })
        })
        .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            url: url, 
            mostrarCamara: false,
        })

    }

    render() {
        console.log(this.props);
        return this.state.mostrarCamara ? 
        (<Camara onImageUpload={(url)=> this.onImageUpload(url)}/>) :(
            <View >
                <TextInput 
                    
                    placeholder="Descripción"
                    keyboardType="default"
                    onChangeText={ text => this.setState({ description: text }) }
                    value={this.state.description}
                    multiline={true}
                />

                <TouchableOpacity  onPress={() => this.subirPosteo()}>
                    <Text >Postear</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

export default Posteo