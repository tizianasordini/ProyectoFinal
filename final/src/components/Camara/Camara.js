// import { Text, View, StyleSheet, Image } from 'react-native'
// import React, { Component } from 'react'
// import {Camera} from 'expo-camera'
// import { TouchableOpacity } from 'react-native-gesture-handler'
// import {storage} from '../../firebase/config'


// class Camara extends Component {
//     constructor(){
//         super()
//         this.usoCamara = null
//         this.state = {
//             showCamara: false,
//             fotoUri: ''
//         }
//     }

//     componentDidMount(){
//         Camera.requestCameraPermissionsAsync()
//         .then(() => {
//             this.setState({
//                 showCamara: true
//             })
//         })
//         .catch(error => console.log(error))
//     }

//     sacarFoto(){
//         this.usoCamara.takePictureAsync()
//         .then(foto => this.setState({
//             fotoUri: foto.uri,
//             showCamara: false
//         }))
//         .catch(error => console.log(error))  
//     }

//     guardarFoto(){
//         fetch(this.state.fotoUri)
//         .then(fotoEnBinario => fotoEnBinario.blob())
//         .then(foto => {
//             const ref = storage.ref(`fotos/${Date.now()}.jpg`)
//             ref.put(foto)
//             .then(() =>{
//                 ref.getDownloadURL()
//                 .then((url)=> this.props.subirFoto(url))
//                 .catch(error => console.log(error))
//             })
//         })
//         .catch(error => console.log(error))
//     }

//     evitarFoto(){

//     }

//     render(){
//         return(
//             <View style={styles.container}>
//                 {
//                     this.state.showCamara ?
//                     <>
//                         <Camara
//                         style= {styles.formatoFoto}
//                         type={Camera.Constants.Type.back}
//                         ref= {uso => this.usoCamara = uso}
//                         />
//                         <TouchableOpacity onPress={() => this.sacarFoto()}>
//                             <Text>Sacar foto</Text>
//                         </TouchableOpacity>
//                     </>
//                     : this.state.showCamara === false && this.state.fotoUri != '' ?
//                     <View>
//                         <Foto 
//                         source={{uri: this.fotoUri}}
//                         style={styles.foto}
//                         />
//                         <TouchableOpacity onPress={() => this.guardarFoto()}>
//                             <Text>
//                                 Aceptar Imagen
//                             </Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => this.evitarFoto()}>
//                             <Text>
//                                 Denegar foto
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                     : <Text> No tiene permitido observar la foto</Text>
//                 }

//             </View>
//         )
//     }

// }

// const style = StyleSheet.create({
//     container:{
//         flex: 1
//     },
//     formatoFoto:{
//         height: 400
//     },
//     foto: {
//         height: 300
//     }
    
// })

// export default Camara



import {Camera} from 'expo-camera';
import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native'
import { storage } from '../../firebase/config';

class Camara extends Component{
    constructor(props){
        super(props)
        this.state={
            usarCamara: false,
            foto: '',
        }
        this.camera;
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                usarCamara: true,
            })
        })
        .catch((error)=> console.log(error))

        Camera.getAvailableCameraTypesAsync()
        .then((res)=> console.log(res))
        .catch((error)=> console.log(error))
    }

    sacarFoto(){
        this.camera.takePictureAsync()
        .then((foto)=>{
            console.log(foto)
            this.setState({
                foto: foto.uri,
            })
        })
        .catch((error)=> console.log(error))
    }

    guardarFoto(){
        console.log('Guardar foto')
        fetch(this.state.foto)
        .then((res)=> res.blob()) // blob hace que la respuesta que me llega se convierta en una imagen que se pueda leer
        .then((image)=> {
            const ref= storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(image) // put es un metodo de firebaseee
            .then(()=>{
                ref.getDownloadURL()
                .then((url)=>{
                    this.props.onImageUpload(url)
                    this.setState({
                        foto: '',
                    })
                });
            })
        })
        .catch((error)=> console.log(error))
    }

    render() {
        return (
          <>
            {this.state.foto ? (
              <>
                <Image
                  style={{ flex: 1, width: "100%" }}    //me parecion mas facil usar los estilos, pero si quieren lo codeo x fuera del render dentro de una variable styles con const
                  source={{ uri: this.state.foto }}
                />
                <View>
                  <TouchableOpacity onPress={() => this.guardarFoto()}>
                    <Text>Aceptar</Text>                  
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>Borrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Camera
                  style={{ flex: 1, width: "100%" }}
                  type={Camera.Constants.Type.front}
                  ref={(cam) => (this.camera = cam)}
                />
                <TouchableOpacity onPress={() => this.sacarFoto()}>
                    <Text> Tome una foto</Text> 
                </TouchableOpacity>
              </>
            )}
          </>
        );
      }
    
}

export default Camara