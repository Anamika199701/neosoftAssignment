import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from "./styles";
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native';


export default function Home() {

    const navigation = useNavigation();
    const [value, setValue] = useState("");
    const [apiResponse, setApiResponse] = useState([]);
    const [allData, setAllData] = useState([]);
    const [currentPage, setCurrentPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    let numColumns = 3;

    const getAllImage = () => {
        const url_data = [];
        setIsLoading(true);
        axios.get('https://api.flickr.com/services/rest/?%20method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&nojsoncallback=%201&text=tesla&format=json')
            .then((response) => {
                const result = JSON.stringify(response.data.photos.photo);
                const res = JSON.parse(result);
                setAllData(res);
                res.slice(0, currentPage).map((photo) => {
                    let url = `https://farm1.static.flickr.com/${photo.server}/${photo.id}_${photo.secret
                        }`;
                    url += '.jpg';
                    url_data.push({ url: url, id: photo.id, title: photo.title });
                })
                setApiResponse(url_data);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
    }



    const handleSearch = (value) => {
        if (value) {
            navigation.navigate("Search", { value });
        } else {
            Alert.alert("Please Type Keyword To Search")
        }
    }

    useEffect(() => {
        getAllImage();
    }, []);

    const renderLoader = () => {
        return (
            isLoading ? <View>
                <ActivityIndicator size="large" color="black" />
            </View> : null
        )
    };

    const loadMoreItem = () => {
        const url_data = [];
        let limitData = currentPage + 5;
        setCurrentPage(limitData);
        allData.slice(0, limitData).map((photo) => {
            let url = `https://farm1.static.flickr.com/${photo.server}/${photo.id}_${photo.secret
                }`;
            url += '.jpg';
            url_data.push({ url: url, id: photo.id, title: photo.title });
        });
        setApiResponse(url_data);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.childContainer}>
                    {/* <Image style={{ width: 100, height: 180,resizeMode: 'stretch', }} source={{ uri: item.url }} /> */}
                    <FastImage style={{ width: 100, height: 180 }}
                        source={{ uri: item.url, priority: FastImage.priority.normal, }} />
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.parentContainer}>
                <TextInput style={styles.inputBox} placeholder="Search Keyword" onChangeText={(e) => setValue(e)} />
                <TouchableOpacity onPress={() => { handleSearch(value) }}>
                    <Image source={require("../../assets/images/search.png")} style={styles.imgBtn} />
                </TouchableOpacity>
            </View>
            <View style={[styles.parentContainer, {}]}>
                {apiResponse &&
                    <FlatList
                        data={apiResponse}
                        numColumns={numColumns}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id}
                        ListFooterComponent={renderLoader}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={1}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

