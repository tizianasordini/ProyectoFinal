import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Register extends Component {

    constructor(){
        super()
        this.state = {
            username:"",
            email:"",
            password:"",
            mensaje: "",
        }
    }

    registrarUsuario(username, email, password){
                auth.createUserWithEmailAndPassword(email, password)
                .then(()=> {
                    return(
                        db.collection("users").add({
                            email: email,
                            username: username,
                            createdAt: Date.now()
                        })
                    )
                })
                .then(resp => this.props.navigation.navigate("TabNavigation"))
                .catch(error => console.log(this.setState({mensaje: error.message})))
    }

  render() {
    return (
    <View style={styles.contenedor}>
        <Text>¡ Registrate !</Text>
        <TextInput
            style={styles.input}
            placeholder="Usuario"
            keyboardType="default"
            onChangeText={text => this.setState({username: text})}
            value={this.state.username}
        />
        <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            keyboardType="default"
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <Text style={styles.textoerror}>{this.state.mensaje}</Text>
        
        <View>
            <TouchableOpacity style={styles.boton} onPress={() => this.registrarUsuario(this.state.username, this.state.email, this.state.password)}>
                <Text>Registrarme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
              <Text>¿Ya tienes una cuenta? Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center',
        padding:100,
    },
    input: {
        borderWidth: 1,
    },
    boton:{
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        backgroundColor: 'blue'
    },
    textoerror: {
        color: "red"
    },
})

export default Register;