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
import { styles } from "../home/styles";
import FastImage from 'react-native-fast-image'

export default function Search(props) {
    const [value, setValue] = useState(props.route.params.value);
    const [apiResponse, setApiResponse] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allFilteredData, setAllFilteredData] = useState([]);
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
                let filter_data = res.filter(ele => ele.title.indexOf(value) > -1);
                filter_data.slice(0, currentPage).map((photo) => {
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
        if (value) {
            let filter_data = allData.filter(ele => ele.title.indexOf(value) > -1);
            setAllFilteredData(filter_data);
            filter_data.slice(0, currentPage).map((photo) => {
                let url = `https://farm1.static.flickr.com/${photo.server}/${photo.id}_${photo.secret
                    }`;
                url += '.jpg';
                url_data.push({ url: url, id: photo.id, title: photo.title });
            });
        }
        setApiResponse(url_data);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.childContainer}>
                    <FastImage style={{ width: 100, height: 180 }}
                        source={{ uri: item.url, priority: FastImage.priority.normal, }} />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.rootContainer}>
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