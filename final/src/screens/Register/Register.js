import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

class Register extends Component {

    constructor(){
        super()
        this.state = {
            bio: "",
            username:"",
            email:"",
            password:"",
            mensaje: "",
        }
    }

    registrarUsuario(username, email, password, bio){
                auth.createUserWithEmailAndPassword(email, password)
                .then(()=> {
                        db.collection("users").add({
                            bio:bio,
                            email: email,
                            username: username,
                            createdAt: Date.now()
                        })
                        .catch(err => console.log(err))
                })
                .then(resp => this.props.navigation.navigate("TabNavigation"))
                .catch(error => console.log(this.setState({mensaje: error.message})))
    }

    render() {
        return (
            <View style={styles.contenedor}>

                <Text style={styles.titulo}>¡Únete a la comunidad digital viajera!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    keyboardType="default"
                    onChangeText={text => this.setState({username: text})}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Biografía"
                    keyboardType="default"
                    onChangeText={text => this.setState({bio: text})}
                    value={this.state.bio}
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
                    <TouchableOpacity style={styles.boton} onPress={() => this.registrarUsuario(this.state.username, this.state.email, this.state.password, this.state.bio)}>
                        <Text style={styles.textoBoton}>Registrarme</Text>
                    </TouchableOpacity>

                    <Text>¿Ya tienes una cuenta? <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text style={styles.textoLink}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: "7%",
        backgroundColor: "#FDFDFF",
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
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
    textoerror: {
        color: "red"
    },
    textoBoton: {
        color: "white"
    },
    textoLink: {
        textDecorationLine: "underline",
    },
})

export default Register;