import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as _ from 'lodash';
import moment from 'moment';

import Images from './images';
import styles from "./styles";



class CommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            composerValue: this.props.comment.message
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

    onPressEdit = () => {
        this.setState({ isEditing: true })
    }

    onPressCancelEdit = () => {
        this.setState({ isEditing: false, composerValue: this.props.comment.message })
    }

    onSubmitEdit = (updatedComment) => {
        this.props.editComment(updatedComment)
        this.setState({ isEditing: false })
    }

    renderReplyButton = () => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => this.props.onPressReply()}>
                <Text>Reply</Text>
            </TouchableOpacity>)
    }

    renderEditButton = (comment) => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => {
                    this.onPressEdit()
                    this.setState({ composerValue: this.props.comment.message })
                    // this.commentTextInput.focus()
                }}>
                <Text>Edit</Text>
            </TouchableOpacity>)
    }

    renderCancelEditButton = () => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => {
                    this.onPressCancelEdit();
                    this.setState({ composerValue: this.props.comment.message })
                }}>
                <Text>Cancel</Text>
            </TouchableOpacity>)
    }

    renderDeleteButton = (comment) => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => this.props.deleteComment(comment)}>
                <Text>Delete</Text>
            </TouchableOpacity>)
    }

    renderTimeStamp = (createdAt) => {
        return (
            <TouchableOpacity
                style={styles.commentOption}>
                <Text>{moment(new Date(createdAt)).fromNow(true)}</Text>
            </TouchableOpacity>)
    }

    renderParentOptionPanel = (comment) => {
        if (this.props.loggedInUser.userId === comment.userId) {
            return (
                <View style={styles.optionPanel}>
                    {this.renderReplyButton(comment)}
                    {this.renderEditButton(comment)}
                    {this.renderDeleteButton(comment)}
                    {this.renderTimeStamp(comment.createdAt)}
                </View>
            )
        } else {
            return (
                <View>
                    {this.renderReplyButton(comment)}
                    {this.renderTimeStamp(comment.createdAt)}
                </View>
            )
        }
    }

    renderChildOptionPanel = (comment) => {
        if (this.props.loggedInUser.userId === comment.userId) {
            return (<View style={styles.optionPanel}>
                {this.renderEditButton(comment)}
                {this.renderDeleteButton(comment)}
                {this.renderTimeStamp(comment.createdAt)}
            </View>
            )
        }
        else {
            return (
                <View>
                    {this.renderTimeStamp(comment.createdAt)}
                </View>
            )
        }
    }

    renderComment = (comment) => {
        let isEditing = this.state.isEditing;
        return (
            <View key={comment.commentId} style={styles.commentCard}>

                <TouchableOpacity onPress={() => this.props.onPressProfile(comment.userId)}>
                    <Image source={{ uri: comment.profilePic }} style={styles.ProfilePicture} />
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <View style={styles.textSection}>
                            <TouchableOpacity onPress={() => this.props.onPressProfile(comment.userId)}>
                                <Text style={styles.commentName}>
                                    {comment.name}
                                </Text>
                            </TouchableOpacity>
                            <View>
                                <TextInput
                                    style={[{ color: '#000', padding: 0 }, { borderWidth: isEditing ? 1 : 0 }]}
                                    editable={isEditing}
                                    ref={input => (this.commentTextInput = input)}

                                    placeholder='Write a comment...'
                                    value={this.state.composerValue}
                                    onChangeText={(value) => this.setState({ composerValue: value })}
                                    multiline
                                />
                            </View>
                        </View>

                        {this.isValidComment(this.state.composerValue) && isEditing &&
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.onSubmitEdit({ ...comment, message: this.state.composerValue })}
                                    style={styles.sendBtn}
                                >
                                    <Image
                                        source={Images.send}
                                        style={styles.sendImg} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    {!isEditing && this.props.enabled && !_.isEmpty(this.props.loggedInUser) && (comment.isParent ? this.renderParentOptionPanel(comment) : this.renderChildOptionPanel(comment))}
                    {isEditing && this.renderCancelEditButton()}
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderComment(this.props.comment)}
            </View>
        )
    }
}

export default CommentCard;