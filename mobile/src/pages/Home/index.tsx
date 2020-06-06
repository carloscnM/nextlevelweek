import React, {useState, useEffect} from 'react';
import { Feather as Icon} from '@expo/vector-icons'
import {View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const Home = () =>{
    const navigation = useNavigation();

    const [uf, setUf] = useState('0');
    const [city, setCity] = useState('0');
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);


    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(res => {
                const ufInitials = res.data.map(uf => uf.sigla);
                setUfs(ufInitials);  
            });
    }, []);

    useEffect(() => {
        if(uf === ''){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
            .then(res =>{
                const cityNames = res.data.map(city => city.nome);
                setCities(cityNames);
            });
    }, [uf]);



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
                    

                    
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione a UF'
                        }}
                        value={uf}
                        onValueChange={setUf}
                        items={ ufs?.map(uf =>({
                            label: uf,
                            value: uf
                        }))}
                    />
                    
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione a cidade'
                        }}
                        value={city}
                        onValueChange={setCity}
                        items={cities?.map(city =>({
                            label: city,
                            value: city
                        }))}
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