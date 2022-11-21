import {Text, View } from 'react-native'
import React, {Component} from 'react'
import Posteos from '../../components/Posteos/Posteos'

class PerfilAmigos extends Component {

  constructor(props){
    super(props)
    this.state={
      dataUsuario: {},
      id:'',
      posteos: [],
      loader: true
    }
}

componentDidMount(){
    db.collection('users')
    .where('email', '==', this.props.route.params.email) 
    .onSnapshot(doc => { 
      doc.forEach(doc => this.setState({
        id: doc.id,
        dataUsuario: doc.data()
      })) 
    })
    db.collection('posteos')
    .where('owner', '==', this.props.route.params.email)
    .onSnapshot(docs => { 
      let posts = []
      docs.forEach(doc => {
          posts.push({ 
              id: doc.id,
              data: doc.data()
          })
      })
      console.log(posts)
      this.setState({ 
          posteos: posts,
          loader: false
      })
  })
}


render() {
return (

    this.state.loader ? <Text>Cargando...</Text> 
    
    : 

    <View>

      <View >
        <Text >{this.state.dataUsuario.email}</Text>
        <Text>{this.state.dataUsuario.biografia}</Text>     
        <Text>{this.state.posteos.length}</Text>
      </View>

      <View >
        <Text>Posteos de: {this.state.dataUsuario.email}</Text>
        
        <FlatList 
          data = {this.state.posteos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) => <Posteos data={item.item.data} id={item.item.id} />} 
        />
        
        :
        
        <Text>El ususario no ha publicado aún.</Text>
        
      </View>

    </View>
    
  )
}
}

export default PerfilAmigos