import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Image, Text, SafeAreaView, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather as Icon, FontAwesome} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer';
 
import api from '../../services/api';


import styles from './styles';

interface Params {
    point_id: number;
}

interface Data {
    point: {
        image: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: { 
        title: string;
    }[]
}


const Detail = () => {
    const navigation = useNavigation();

    const [data, setData] = useState<Data>({} as Data);

    const route  = useRoute();
    const routeParams = route.params as Params;

    useEffect(()=>{

        api.get(`points/${routeParams.point_id}`)
            .then(res => {
                setData(res.data);
            });

    }, []);


    function handleNavigateBack(){
        navigation.goBack();
    }

    function handleWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=+55${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos, poderia passar mais informações?`);
    }

    function handleComposeMail(){
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos.',
            recipients: [data.point.email],
        })
    }

    if(!data.point){
        return null;
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                        <Icon name="arrow-left" size={32} color="#34cb29"/>
                </TouchableOpacity>

                <Image 
                    style={styles.pointImage}
                    source={{uri: data.point.image}}
                />
                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{`${data.point.city}, ${data.point.uf}`}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton 
                    style={styles.button} 
                    onPress={handleWhatsapp}
                >
                   <FontAwesome name="whatsapp" size={20} color="#FFF"/>
                   <Text style={styles.buttonText}>WhatsApp</Text>     
                </RectButton>

                <RectButton 
                    style={styles.button} 
                    onPress={handleComposeMail}
                >
                   <Icon name="mail" size={20} color="#FFF"/>
                   <Text style={styles.buttonText}>E-mail</Text>     
                </RectButton>
                

            </View>
        </SafeAreaView>
    )
}

export default Detail;