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
                        <TextInput
                            style={styles.composerTextInput}
                            placeholder='Write a comment...'
                            value={this.state.composerValue}
                            onChangeText={(value) => this.setState({ composerValue: value })}
                            multiline
                        />
                        {this.isValidComment() &&
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.saveComment(this.state.composerValue, this.props.parentId);
                                    this.setState({ composerValue: '' });
                                    if (this.props.isReply) { this.props.resetCollapsible() }
                                }}
                                style={styles.sendBtn}
                            >
                                <Image
                                    source={Images.send}
                                    style={styles.sendImg} />
                            </TouchableOpacity>
                        }
                    </View>
                ) : <View>
                        <View>
                            {/* TODO: Add link */}
                            <Text>Please login to post a comment</Text>
                        </View>
                    </View>
            )
        } else {
            return (
                <Text>(Commenting is disabled)</Text>
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