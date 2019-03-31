import React, { Component } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';


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
                            defaultValue=''
                            value={this.state.composerValue}
                            onChangeText={(value) => this.setState({ composerValue: value })}
                            multiline
                        />
                        {this.isValidComment() &&
                            <TouchableOpacity
                                onPress={() => { this.props.saveComment(this.state.composerValue, this.props.parentId) }}
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
                <Text>Composer</Text>
            </View>
        )
    }
}

export { Composer };