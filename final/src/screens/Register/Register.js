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
        .then(resp => this.props.navigation.navigate("Login"))
        .catch(err => console.log(err))
    }

  render() {
    return (
    <View style={styles.contenedor}>
        <Text>¡ Registrate !</Text>
        <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre de usuario"
            keyboardType="default"
            onChangeText={text => this.setState({username: text})}
            value={this.state.username}
        />
        <TextInput
            style={styles.input}
            placeholder="Escribe tu email"
            keyboardType="email-address"
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
        />
        <TextInput
            style={styles.input}
            placeholder="Escribe tu contraseña"
            keyboardType="default"
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
        />
        <View>
            <TouchableOpacity style={styles.boton} onPress={() => this.registrarUsuario(this.state.username, this.state.email, this.state.password)}>
                <Text>Registrarme</Text>
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
        paddingHorizontal:100,
    },
    input: {
        borderWidth: 2,
    },
    boton:{
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'blue'
    }
})

export default Register;