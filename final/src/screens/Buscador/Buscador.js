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
            <View style={styles.contenedor}>

                <TextInput
                style={styles.input}  
                onChangeText={ amigos => this.setState( {busqueda:amigos} )}
                placeholder='Buscar...'
                value={this.state.busqueda}>
                </TextInput>

                <TouchableOpacity style={styles.boton} onPress={()=> this.buscador(this.state.busqueda)}>
                    <Text style={styles.textoBoton}> Buscar </Text>
                </TouchableOpacity>

                { this.state.resultado == false ?
                    <Text> No se encontraron resultados de búsqueda.</Text> :
                    <FlatList
                    data={this.state.users}
                    keyExtractor={(item) => item.id}
                    renderItem= {({item}) => (
                        <View>
                            <TouchableOpacity  onPress={ ()=> this.props.navigation.navigate('HomeNavigation', {screen: 'PerfilAmigos', params: {email:item.data.username}                  
                            })}>
                                <Text>{item.data.username}</Text>
                            </TouchableOpacity>
                        </View>)}
                        
            
                    />
                }
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
