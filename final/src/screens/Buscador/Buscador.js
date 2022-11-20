import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Posteos from '../../components/Posteos/Posteos'
import { TextInput } from 'react-native-gesture-handler'


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
            <View>
                <TextInput
                    onChangeText={(buscarTexto) => this.setState({busqueda:buscarTexto})}
                    placeholder='Buscar'
                />
                <TouchableOpacity onPress={() => this.filter()}>
                    <Text>Buscar</Text>
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
export default Buscador
