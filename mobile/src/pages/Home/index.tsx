import React, {useState} from 'react';
import { Feather as Icon} from '@expo/vector-icons'
import {View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import styles from './styles';



const Home = () =>{
    const navigation = useNavigation();

    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    function handleNavigateToPoints(){
        navigation.navigate('Points', {uf, city});
    }



    return (
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground  
                source={require('../../assets/home-background.png')} 
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>

                <View style={styles.footer}>

                    <TextInput 
                        style={styles.input}
                        placeholder="Digite a UF"
                        value={uf}
                        maxLength={2}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        onChangeText={setUf}  //equivale text => setUf(text)
                    />

                    <TextInput 
                        style={styles.input}
                        placeholder="Digite a Cidade"
                        autoCorrect={false}
                        value={city}
                        onChangeText={setCity}      
                    />

                    <RectButton 
                        style={styles.button} 
                        onPress={handleNavigateToPoints}
                    > 
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="#FFF" size={32}></Icon>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>

            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

export default Home;