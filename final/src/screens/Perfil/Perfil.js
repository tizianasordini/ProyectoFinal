import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import { FlatList } from 'react-native-gesture-handler'
import Posteos from '../../components/Posteos/Posteos'

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
    
    render() { 
        return(
            <View>
                
                {
                    this.state.user.data ?
                        <Text >{this.state.user.data.username}</Text>
                        : ""
                }
                {
                    this.state.user.data ?
                        <Text >{this.state.user.data.email}</Text>
                        : ""
                }
                {
                    this.state.user.data ?
                        <Text >{this.state.user.data.bio}</Text>
                        : ""
                }
                {
                    this.state.user.data ?
                        <Text >Posteos: {this.state.allPosts.length}</Text>
                        : ""
                }
                {
                    this.state.user.data ?
                        <FlatList
                            data = {this.state.allPosts}
                            keyExtractor = { item => item.id.toString()}
                            renderItem = {({item}) => <Posteos data={item.data}/>}
                        />
                        : ""
                }

                <TouchableOpacity
                onPress={() => this.signOut()}
                style = {styles.button}
                >
                    <Text>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
      padding:10,
      borderColor:'blue',
      borderWidth: 1
   } })

export default Perfil