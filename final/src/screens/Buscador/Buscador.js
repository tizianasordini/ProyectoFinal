import React, {Component} from 'react'
import { db } from '../../firebase/config'
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'




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

    buscador() {

        let buscarUsuarios = this.state.data.filter(elm => { 

             return elm.data.username.toUpperCase().includes(text.toUpperCase())})

             this.setState({
                
               users: buscarUsuarios,
           
            }) 
    }

    render(){
        return(
            <View>

                <TextInput  
                onChangeText={ text => this.setState( {busqueda:text} )}
                placeholder='Buscar...'
                value={this.state.busqueda}>
                </TextInput>

                <TouchableOpacity onPress={()=> this.buscador(this.state.busqueda)}>
                    <Text> Buscar </Text>
                </TouchableOpacity>

                <FlatList
                data={this.state.users}
                keyExtractor={(item) => item.id}
                renderItem= {({item}) => <Text>{item.data.username}</Text>}
        
                />
        
             
        </View>
        )
    }

} 
export default Buscador
