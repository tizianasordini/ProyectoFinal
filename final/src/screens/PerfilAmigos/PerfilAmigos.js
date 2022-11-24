import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import Posteos from '../../components/Posteos/Posteos'

class PerfilAmigos extends Component {
    
        constructor(props){
            super(props)
            this.state ={
                user: [],
                postsAmigo: []
          }
        }
    
        componentDidMount(){
            

            db.collection('users')
            .where('email', '==', this.props.route.params.email )
            .onSnapshot(docs => {
                let usuarios = []
                docs.forEach(doc => {
                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    user: usuarios[0],
                },
                () => console.log(this.state.user)
                )
                
            })

            db.collection('posteos')
            .where('owner', '==', this.props.route.params.email )
            .onSnapshot(docs => {
                let posteos = []
                docs.forEach(doc => {
                  posteos.push({
                    id: doc.id,
                    data: doc.data()
                  })
                })
          
                this.setState({
                  postsAmigo: posteos,
                },
                () => console.log(this.state.postsAmigo)
                )
              })
              
            }

            render(){
                return(
                    <View>
                        {
                        this.state.user.data ?
                            <Text>{this.state.user.data.email}</Text>
                            : ""
                        }
                        {
                        this.state.user.data ?
                            <Text>{this.state.user.data.bio}</Text>
                            : ""
                        }
                        {
                            this.state.user.data ?
                                <Text>Posteos: {this.state.postsAmigo.length}</Text>
                                : ""
                        }

                        {
                            this.state.user.data ?
                                <FlatList
                                    data = {this.state.postsAmigo}
                                    keyExtractor = { item => item.id.toString()}
                                    renderItem = {({item}) => <Posteos navigation={this.props.navigation} data={item.data} id={item.id}/>}
                                />
                                : ""
                        }
                    </View>
                )
            }
    
        
    
        
    }
    
    const styles = StyleSheet.create({
        contenedor:{
            flex:1,
            backgroundColor: "#FDFDFF",
        },
        container2:{
            flex: 1,
        },
        usuario:{
            padding: 20,
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
            color: "white",
        },
        textoUsuario: {
            fontSize: 40,
            fontWeight: "bold",
        },
        infoUser:{
            fontSize: 25,
        }
    })
   
    

export default PerfilAmigos