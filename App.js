/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, NativeModules,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import  ShareUtil from './ShareUtil';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var BGNativeExampleModule = NativeModules.BGNativeExampleModule;
import ImagePickerModule from './ImagePickerModule';
// import {NativeModules} from 'react-native';
export default class App extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            global: 'nihao'
        }
    }


    componentDidMount() {

        ImagePickerModule.pickImage()
            .then((msg) => {
                //此处为成功之后回调的信息（指的是：uri.toString() 的值 ）
                alert(msg);
            })
            .catch((err) => {
                //此处为失败之后回调的信息
                alert(err);
            });

        BGNativeExampleModule.testPromises(false)
            .then(result => {
                console.log("result is ", result);
            })
            .catch(result => {
                console.log("result = ", result);
            });

        console.log(BGNativeExampleModule);


        BGNativeExampleModule.testPrint("Jack", {
            height: '1.78m',
            weight: '7kg'
        });

        console.log("BGModuleName const value = ", BGNativeExampleModule.BGModuleName);
        console.log("BGModuleName const value = ", BGNativeExampleModule.TestEventName);


        BGNativeExampleModule.getNativeClass(name => {
            console.log("nativeClass: ", name);
        });


        //接收事件
        DeviceEventEmitter.addListener(BGNativeExampleModule.TestEventName, data => {
            console.log(data);
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {

                    BGNativeExampleModule.getNativeClass((result) => {
                        this.setState({
                            global: result
                        });
                    })

                }}>

                    <Text style={styles.welcome}>
                        显示信息
                    </Text>
                </TouchableOpacity>
                <Text style={styles.instructions}>
                    {this.state.global}
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    // ShareUtil.share("share",'www.baidu.png','http://www.baidu.com','第一次分享',0,
                    //     (result)=>{
                    //         console.log(result);
                    //     })
                }}>
                    <Text style={styles.instructions}>
                        Share
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
