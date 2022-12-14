import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import Posteos from '../../components/Posteos/Posteos'
import firebase from 'firebase'
// import { getAuth, deleteUser } from "firebase/auth";

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state ={
        allPosts: [],
        user: []
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
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs) => {
            let post = [];
            docs.forEach((doc) => {
                post.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
    
            this.setState({
                allPosts: post
            }, ()=> console.log(this.state))
        }
      )
    
    }

    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    
    /*eliminarUsuario(){
        db.collection('users')
        .doc(auth.currentUser.id)
        .update({
            user: firebase.FieldValue.arrayRemove('id')
        })
        this.props.navigation.navigate('Login')
    }*/
    

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
                            <Text style={styles.infoUser}>{this.state.user.data.bio}</Text>
                            : ""
                    }
                    {
                        this.state.user.data ?
                            <Text style={styles.infoUser}>{this.state.user.data.email}</Text>
                            : ""
                    }
                    {
                        this.state.user.data ?
                            <Text style={styles.infoUser}>Posteos: {this.state.allPosts.length}</Text>
                            : ""
                    }
                </View>

                <View style={styles.container2}>
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
                        <Text style = {styles.textoBoton}>Cerrar sesi??n</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                    onPress={() => this.eliminarUsuario()}
                    style = {styles.boton}
                    >
                        <Text style = {styles.textoBoton}>Eliminar usuario</Text>
                    </TouchableOpacity>
                </View>
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

export default Perfil