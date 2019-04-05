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
                    <View style={{ minHeight: 40, flexDirection: 'row', marginHorizontal: 10 }}>
                        <Image source={{ uri: this.props.user.profilePic }} style={[styles.ProfilePicture, { alignSelf: 'center' }]} />
                        <View style={[styles.textInputSection, styles.row, { justifyContent: "space-between" }]}>
                            <TextInput
                                style={[styles.inputBox, { flex: 1 }]}
                                placeholder={`Write a ${this.props.parentId !== null ? 'reply' : 'comment'}...`}
                                value={this.state.composerValue}
                                onChangeText={(value) => this.setState({ composerValue: value })}
                                multiline
                                autoFocus={this.props.isReplying}
                            />
                            {this.isValidComment() &&
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.saveComment(this.state.composerValue, this.props.parentId);
                                        this.setState({ composerValue: '' });
                                        if (this.props.parentId !== null) { this.props.scrollReplyView() }
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

            this.renderComposer()

        )
    }
}

export { Composer };