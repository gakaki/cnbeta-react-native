import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    ListView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

// import sale from './sale';
// import filmInfo from './ArticleDetail'
import {ToolbarHome} from "./Toolbar";
import ApiReq from './ApiReq'

export default class ArticleList extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ToolbarHome />
                <List navigator={this.props.navigator} />
            </View>
        )
    }
}


// listView
class List extends Component {
    constructor(props) {
        super(props);
        let d = 2;
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }

    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {

        let url = ApiReq.urlArticles();

        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data.result)
                })
            })

    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderArticle.bind(this)}
                style={styles.ListView}
                />
        )
    }

    // getFilmInfo(id, name) {
    //     this.props.navigator.push({
    //         name: "filmInfo",
    //         component: filmInfo,
    //         params:{
    //             id:id,
    //             name:name
    //         }
    //     });
    // }

    sale(){
        Alert.alert("提示","没有API,暂无购票能使用！")
    }

    renderArticle(article) {
        var verText = article.ver.replace(/[\u4e00-\u9fa5]+/g, '').replace(/\/$/, '');
        var wishOrSc = article.preSale ? article.wish + "人想看" : article.sc + "分";
        var showInfo = article.preSale ? article.rt : article.showInfo;
        return (
            <TouchableOpacity onPress={() => this.getFilmInfo(article.id,article.nm)}>
                <View style={styles.nav}>
                    <Image source={{ uri: article.img }} style={styles.filmCover}></Image>
                    <View style={styles.info}>
                        <View style={styles.nameView}>
                            <Text style={styles.nm}>{article.nm}</Text>
                            <View style={styles.verView}>
                                <Text style={styles.verText}>{verText}</Text>
                            </View>
                        </View>
                        <Text>{article.cat}</Text>
                        <Text>{article.scm}</Text>
                        <Text style={styles.showInfo}>{showInfo}</Text>
                        <View style={styles.saleView}>
                            <Text style={styles.sc}>{wishOrSc}</Text>
                            <TouchableOpacity style={article.preSale ? styles.preSale : styles.sale}  onPress={() => this.sale()}>
                                <Text style={article.preSale ? styles.preSaleText : styles.saleText}>{article.preSale ? "预售" : "购票"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolbar: {
        height: 40,
        backgroundColor: "#df2d2d"
    },
    filmCover: {
        width: 80,
        height: 110,
        borderRadius: 2
    },
    nav: {
        padding: 6,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
    },
    nm: {
        color: "#333",
        fontSize: 16,
    },
    info: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: 'column',
    },
    nameView: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: "center",
    },
    showInfo: {
        fontSize: 12
    },
    verView: {
        justifyContent: 'center',
        backgroundColor: "#2895db",
        borderRadius: 2,
        paddingLeft: 5,
        paddingRight: 5
    },
    verText: {
        color: "#fff",
        fontSize: 10
    },
    sc: {
        color: "#ff9a00"
    },
    saleView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    preSale: {
        borderWidth: 1,
        borderColor: '#159df1',
        borderRadius: 2,
        paddingLeft: 10,
        paddingRight: 10
    },
    sale: {
        borderWidth: 1,
        borderColor: '#49d95d',
        borderRadius: 2,
        paddingLeft: 10,
        paddingRight: 10
    },
    preSaleText: {
        color: '#159df1',
    },
    saleText: {
        color: '#49d95d',
    }
})
