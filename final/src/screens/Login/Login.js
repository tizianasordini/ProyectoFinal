import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
        if(user !== null){
            this.props.navigation.navigate('TabNavigation')
        }})
      /* auth.signOut() */
    }

    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
          this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }

    render() {
      return (
        <View style={styles.contenedor}>
          <Text>¡Bienvenido!</Text>
          <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Correo electrónico'
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='Contraseña'
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
          />
          <View>
              <TouchableOpacity style={styles.boton} onPress={()=> this.loguear(this.state.email, this.state.password)}>
                  <Text>Iniciar sesión</Text>
              </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
              <Text>¿No tienes una cuenta? Regístrate</Text>
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
    input:{
        borderWidth:1
    },
    boton:{
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        backgroundColor: 'blue'
    }
})

export default Login;