import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as _ from 'lodash';

import Images from './images';
import styles from "./styles";

class Composer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            composerValue: ''
        };
    }

    isValidComment = () => {
        text = this.state.composerValue.trim();
        if (_.isEmpty(text)) {
            return false
        } else {
            return true
        }
    }

    renderComposer = () => {
        if (this.props.enabled) {
            return (
                this.props.user !== null ? (
                    <View style={styles.composerContainer}>
                        <Image source={{ uri: this.props.user.profilePic }} style={styles.ProfilePicture} />
                        <View style={[styles.textInputSection, styles.row, { justifyContent: "space-between", 'maxHeight': 65 }]}>
                            <TextInput
                                style={styles.inputBox}
                                placeholder='Write a comment...'
                                value={this.state.composerValue}
                                onChangeText={(value) => this.setState({ composerValue: value })}
                                multiline
                                autoFocus={this.props.parentId !== null}

                            />
                            {this.isValidComment() &&
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.saveComment(this.state.composerValue, this.props.parentId);
                                        this.setState({ composerValue: '' });
                                        if (this.props.parentId !== null) { this.props.resetCollapsible() }
                                    }}
                                    style={styles.sendBtn}
                                >
                                    <Image
                                        source={Images.send}
                                        style={styles.sendImg} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                ) : <View>
                        <View style={{ paddingBottom: 5, flexDirection: 'row', alignSelf: 'center' }}>
                            <Text>(Please</Text><TouchableOpacity onPress={this.props.onPressLogIn}><Text style={{ fontWeight: 'bold', color: '#ff5a60' }}> login </Text></TouchableOpacity><Text>to post a comment)</Text>
                        </View>
                    </View>
            )
        } else {
            return (
                <Text style={{ textAlign: 'center', paddingBottom: 5, paddingHorizontal: 10, fontWeight: 'bold' }}>(Commenting is disabled)</Text>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderComposer()}
            </View>
        )
    }
}

export { Composer };