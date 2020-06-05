import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, ScrollView, Image, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather as Icon} from '@expo/vector-icons';
import MapView, {Marker} from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';


import api from '../../services/api';

import styles from './styles';

interface Point {
    id: number;
    name: string;
    image: string;
    latitude: number;
    longitude: number; 
}

interface Item{
    id: number;
    title: string;
    image_url: string;
}

interface Params {
    uf: string;
    city: string;
}

const Points = () => {
    const navigation = useNavigation();

    const route  = useRoute();
    const routeParams = route.params as Params;

    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selecteditems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])

    //getLocation
    useEffect(() => {
        async function loadPosition(){
            const {status} = await Location.requestPermissionsAsync();

            if(status !== 'granted'){
                Alert.alert('Oooops...', 'Precisamos da sua permissão para obter a localização');
                return; 
            }

            const location = await Location.getCurrentPositionAsync();
            const {latitude, longitude} = location.coords;
            setInitialPosition([latitude, longitude]);
        }
        loadPosition();
    }, []);

    //getItems
    useEffect(() => {
         api.get('items')
            .then(res => {
                setItems(res.data);    
            });
    }, []);


    useEffect(() =>{

        api.get('points', {
            params:{
                city: routeParams.city,
                uf: routeParams.uf,
                items: selecteditems
            }
        }).then(res => {
            setPoints(res.data);
        });

    },[selecteditems]);




    function handleNavigateBack(){
        navigation.goBack();
    }

    function handleNavigateToDetail(id:number){
        navigation.navigate('Detail', {point_id: id});
    }

    function handleSelectItem(id:number){
        const alreadySelected = selecteditems.findIndex(item => item === id)
        
        if(alreadySelected >= 0){
            const filteredItems = selecteditems.filter(item => item !== id)
            setSelectedItems(filteredItems);
        }else{
            setSelectedItems([...selecteditems, id]);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={32} color="#34cb29"/>
                </TouchableOpacity>

                <Text style={styles.title}>Bem Vindo</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
                
                <View style={styles.mapContainer}>
                    {initialPosition[0] !== 0 && (
                        <MapView 
                        style={styles.map} 
                        initialRegion={{
                            latitude: initialPosition[0],
                            longitude: initialPosition[1],
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014
                        }}
                    >
                        {points.map(point => (
                                <Marker
                                    key={String(point.id)} 
                                    onPress={ () => handleNavigateToDetail(point.id)}
                                    coordinate={{
                                        latitude: point.latitude,
                                        longitude: point.longitude
                                    }}
                                    style={styles.mapMarker}
                                >
                                <View style={styles.mapMarkerContainer}>
                                    <Image 
                                        source={{uri: point.image}}
                                        style={styles.mapMarkerImage}
                                    />
                                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                </View>
                            </Marker>
                        ))}
                        
                    </MapView>
                    )}
                </View>
            </View>



            <View style={styles.itemsContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:20}}
                >
                {
                    items.map(item =>
                        (
                            <TouchableOpacity 
                                key={String(item.id)} 
                                style={[
                                    styles.item,
                                    selecteditems.includes(item.id) ? styles.selectedItem : null
                                ]} 
                                onPress={() => handleSelectItem(item.id)}
                                activeOpacity={0.6}
                            >
                                <SvgUri width={42} height={42} uri={item.image_url}/>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </TouchableOpacity>    
                        )
                    )
                }
                    
                </ScrollView>
            </View>
        
        </>
    );
}

export default Points;