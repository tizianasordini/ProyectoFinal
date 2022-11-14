import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {db} from '../../firebase/config'

export default class ProfileFriends extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            mailFriend:props.route.params.email,
            postsFriend:[]
        }
    }

    componentDidMount(){
        db
        .collection('posteos')
        .where('owner', '==', this.state.mailFriend)
        .onSnapshot(docs => {
            let posteos = []
            docs.forEach(doc => posteos.push({
                id:doc.id,
                data: doc.data()
            }))
            this.setState({
                posteosFriend: posteos
            }, ()=> console.log(this.state.postesFriend))
        })
    }
  render() {
    return (
      <View>
        <Text>Perfil de amigos</Text>
      </View>
    )
  }
}