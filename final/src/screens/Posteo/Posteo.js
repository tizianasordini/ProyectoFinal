// import {Text, View, TextInput, TouchableOpacity, StyleSheet, PushNotificationIOS} from 'react-native'
// import React, {Component} from 'react'
// import { auth, db } from '../../firebase/config'
// import Camara from '../../components/Camara/Camara'

// class Posteo extends Component {

//     constructor(){
//         super()
//         this.state={
//             description:'',
//             showCamara: true,
//             url: ''
//         }
//     }

//     mandarPosteo(description){
//         db.collection('posteo').add({
//             owner:auth.currentUser.email,
//             createdAt: Date.now(),
//             description: description,
//             likes: [],
//             comentarios: [],
//             foto: this.state.url

//         })
//         .then(resp=> console.log('realizo un posteo'))
//         .catch(error => console.log(error))
//     }
    
//     subirFoto(url){
//         this.setState({
//             showCamara: false,
//             url:url
//         })
//     }


//     render(){
//         return(
//             <View style = {styles.container}>
//             {
//                 this.state.showCamara ?
//                 <Camara subirFoto = {(url)=> this.subirFoto(url)} />
//                 :
//              <View>
//                 <TextInput
//                     keyboardType='default'
//                     onChangeText={text => this.setState({description:text})}
//                     value={this.state.description}
//                     style={styles.input}
//                     placeholder='Inserta tu descripcion'
//                 />
//                 <TouchableOpacity
//                 onPress={() => this.mandarPosteo(this.state.description)}
//                 >
//                     <Text>Mandar Posteo</Text>
//                 </TouchableOpacity>
//              </View>
//             }
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     input:{
//         borderWidth: 2,
//         height: 50
//     },
//     container:{
//         flex:1
//     },
// })

// export default Posteo





import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity, } from "react-native";
import {auth, db} from '../../firebase/config';
import Camara from "../../components/Camara/Camara";

class Posteo extends Component {
    constructor(){
        super();
        this.state = {
            titulo: '',
            description: '',
            url: '',
            mostrarCamara: true,
        }
    }

    subirPosteo(){
        db.collection('posteos').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            titulo: this.state.titulo,
            description: this.state.description,
            likes: [],
            comentarios: [],
            foto: this.state.url,
        })
        .then(() => {
            console.log('Creo un posteo');
            this.setState({
                titulo:'',
                description: ''
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        console.log(this.props);
        return this.state.showCamera ? 
        (<Camara onImageUpload={(url)=> this.onImageUpload(url)}/>) :(
            <View >
                <TextInput 
                    placeholder="Título"
                    keyboardType="default"
                    onChangeText={ text => this.setState({ titulo: text }) }
                    value={this.state.titulo}
                />
                <TextInput 
                    
                    placeholder="Descripción"
                    keyboardType="default"
                    onChangeText={ text => this.setState({ description: text }) }
                    value={this.state.description}
                    multiline={true}
                />

                <TouchableOpacity  onPress={() => this.subirPosteo()}>
                    <Text >Postear</Text>
                </TouchableOpacity>
            </View> 
        )
    }
}

export default Posteo