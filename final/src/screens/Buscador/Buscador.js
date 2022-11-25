import React, {Component} from 'react'
import { db } from '../../firebase/config'
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native'




class Buscador extends Component {
    constructor(props){
        super(props)
        this.state ={
            users: [],
            busqueda : '',
            data: [],
            id: '',
            loading: false
      };
    }

    componentDidMount () {
        db.collection('users')
        .onSnapshot((docs) => {
            let usuarios = []
            docs.forEach((doc) => {
                usuarios.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            this.setState({
                data: usuarios
            })
        })
    }

    buscador(amigos) {

        let buscarUsuarios = this.state.data.filter(elm => { 

             return elm.data.username.toUpperCase().includes(amigos.toUpperCase())})

             this.setState({
                
               users: buscarUsuarios,
           
            }) 
    }

    render(){
        return(
            <View>

                <TextInput  
                onChangeText={ amigos => this.setState( {busqueda:amigos} )}
                placeholder='Buscar...'
                value={this.state.busqueda}>
                </TextInput>

                <TouchableOpacity onPress={()=> this.buscador(this.state.busqueda)}>
                    <Text> Buscar </Text>
                </TouchableOpacity>

                <FlatList
                data={this.state.users}
                keyExtractor={(item) => item.id}
                renderItem= {({item}) => <TouchableOpacity onPress={
                    ()=> this.props.navigation.navigate('HomeNavigation', {screen: 'PerfilAmigos', params: {email:this.props.data.owner}                  })

                }>
                    {item.data.username}
                    </TouchableOpacity>}
        
                />
        
             
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

export default Buscador
