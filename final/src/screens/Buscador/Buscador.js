import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native'
import Posteos from '../../components/Posteos/Posteos'



class Buscador extends Component {
    constructor(props){
        super(props)
        this.state ={
            busqueda : '',
            postsUsuario : []
      };
    }

    buscador () {
        db.collection('posteos')
        .where('users', '==', this.state.search)
        .onSnapshot((docs) => {
            let posts = []
            docs.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            this.setState({
                postsUsuario: posts
            })
        })
    }

    render(){
        return(
            <View style={styles.contenedor}>
                <TextInput
                    style={styles.input}
                    onChangeText={(buscarTexto) => this.setState({busqueda:buscarTexto})}
                    placeholder='Buscar'
                />
                <TouchableOpacity style={styles.boton} onPress={() => this.filter()}>
                    <Text style={styles.textoBoton}>Buscar</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.postsUsuario}
                    keyExtractor={(postsUsuario) => postsUsuario.id}
                    renderItem={({item}) => <Posteos postData={item}/>}
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
