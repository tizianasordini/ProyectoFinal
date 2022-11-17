import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import { FlatList } from 'react-native-gesture-handler'
import Posteos from '../../components/Posteos/Posteos'
// import { getAuth, deleteUser } from "firebase/auth";

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state ={
        allPosts: [],
        user: {}
      }
    }

    componentDidMount(){
        db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
            let usersDb = [];
            docs.forEach((doc) => {
                usersDb.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
    
            this.setState({
                user: usersDb[0]
            }, ()=> console.log(this.state))
        }
      )
    
      db.collection('posteos')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
            let posteoAmigo = [];
            docs.forEach((doc) => {
                posteoAmigo.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
    
            this.setState({
                allPosts: posteoAmigo
            }, ()=> console.log(this.state))
        }
      )
    
    }

    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    
    /*
    Eliminar un usuario (ejercicio adicional) 
    delete(user).then(() => {
    //la colección tenemos que borrar
    })
    .catch((error)=> console.log(error))

    deleteUser(user).then(() => {
    auth.currentUser
    })
    .catch((error)=> console.log(error))
    */

    render() { 
        return(
            <View style={styles.contenedor}>
                <View style={styles.usuario}>
                    {
                        this.state.user.data ?
                            <Text style={styles.textoUsuario}>{this.state.user.data.username}</Text>
                            : ""
                    }
                    {
                        this.state.user.data ?
                            <Text >{this.state.user.data.bio}</Text>
                            : ""
                    }
                    {
                        this.state.user.data ?
                            <Text >{this.state.user.data.email}</Text>
                            : ""
                    }
                    {
                        this.state.user.data ?
                            <Text >Posteos: {this.state.allPosts.length}</Text>
                            : ""
                    }
                </View>

                <View>
                    {
                        this.state.user.data ?
                            <FlatList
                                data = {this.state.allPosts}
                                keyExtractor = { item => item.id.toString()}
                                renderItem = {({item}) => <Posteos data={item.data}/>}
                            />
                            : ""
                    }
                </View>

                <View>
                    <TouchableOpacity
                    onPress={() => this.signOut()}
                    style = {styles.boton}
                    >
                        <Text style = {styles.textoBoton}>Cerrar sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        paddingHorizontal: "7%",
        backgroundColor: "#FDFDFF",
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
    textoUsuario: {
        fontSize: 30,
        fontWeight: "bold",
    }
})

export default Perfil