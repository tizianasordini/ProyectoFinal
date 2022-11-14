import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import React, { Component } from "react";
import { auth } from "../../firebase/config";

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            mensaje: "",
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
        if(user !== null){
            this.props.navigation.navigate("TabNavigation")
        }})
    }

    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
          this.props.navigation.navigate("TabNavigation")
        })
        .catch(error => console.log(this.setState({mensaje: error.message})))
    }

    render() {
      return (
        <View style={styles.contenedor}>
          <Image
          style={styles.image}
          source={require("../../../assets/global.png")}
          resizeMode="contain"
          />
          <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Correo electrónico"
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Contraseña"
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
          />
          
          <Text style={styles.textoerror}>{this.state.mensaje}</Text>

          <View>
              <TouchableOpacity style={styles.boton} onPress={()=> this.loguear(this.state.email, this.state.password)}>
                  <Text style={styles.textoBoton}>Iniciar sesión</Text>
              </TouchableOpacity>
          </View>

          <View>
            <Text>¿No tienes una cuenta? <TouchableOpacity onPress={()=> this.props.navigation.navigate("Register")}>
              <Text style={styles.textoLink}>Regístrate</Text>
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
image: {
  height: 100,
},
})

export default Login;