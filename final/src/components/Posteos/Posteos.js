import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native'


class Posteos extends Component {
    constructor(props){
        super(props)
        this.state = {
            likesCount: props.data.likes.length,
            comentariosCount: props.data.comentarios.length,
            miLike: false
        }
    }
    render(){
        return(
            <View>
                <Text>{this.props.data.description}</Text>

                {
                    this.setState.miLike ?
                        <TouchableOpacity>
                            <Text>Like</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <Text>BorrarLike</Text>
                        </TouchableOpacity>
                        
                }
                
            </View>
        )
    }
}

export default Posteos