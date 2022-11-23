import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity,StyleSheet } from "react-native";
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
            }, ()=> this.props.navigation.navigate("Home"))
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
            <View style={styles.contenedor}>
                <TextInput 
                    style={styles.input}
                    placeholder="Descripción"
                    keyboardType="default"
                    onChangeText={ text => this.setState({ description: text }) }
                    value={this.state.description}
                    multiline={true}
                />

                <TouchableOpacity style={styles.boton} onPress={() => this.subirPosteo()}>
                    <Text style={styles.textoBoton}>Postear</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center',
        
        backgroundColor: "#FDFDFF",
        padding: 30
    },
    input: {
        borderWidth: 1,
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
})

export default Posteo