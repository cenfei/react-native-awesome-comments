import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as _ from 'lodash';
import moment from 'moment';
import { Dimensions } from "react-native";

import Images from './images';
import styles from "./styles";

const screenWidth = Math.round(Dimensions.get('window').width);

const childWidth = screenWidth - 176

class CommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            composerValue: this.props.comment.message,
            isEditing: false
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
                <Text style={styles.commentOptionText}>Reply</Text>
            </TouchableOpacity>)
    }

    renderEditButton = (comment) => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => {
                    this.onPressEdit()
                    this.setState({ composerValue: this.props.comment.message })
                    this.commentTextInput.focus()
                }}>
                <Text style={styles.commentOptionText}>Edit</Text>
            </TouchableOpacity>)
    }

    renderCancelEditButton = () => {
        return (
            <View style={styles.optionPanel}>
                <TouchableOpacity
                    style={styles.commentOption}
                    onPress={() => {
                        this.onPressCancelEdit();
                        this.setState({ composerValue: this.props.comment.message })
                    }}>
                    <Text style={styles.commentOptionText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderDeleteButton = (comment) => {
        return (
            <TouchableOpacity
                style={styles.commentOption}
                onPress={() => this.props.onPressDelete(comment)}>
                <Text style={styles.commentOptionText}>Delete</Text>
            </TouchableOpacity>)
    }

    renderTimeStamp = (createdAt) => {
        return (
            <Text style={[styles.commentOption, { color: '#aaaaaa', fontWeight: '300' }]}>{moment(new Date(createdAt)).fromNow(true)}</Text>
        )
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

                <View style={{ backgroundColor: 'green', flex: comment.isParent ? 1 : 0, width: comment.isParent ? 'auto' : childWidth }}>
                    <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'aqua' }}>
                        <View style={[styles.textInputSection, { borderWidth: isEditing ? 0.6 : 0, flex: 1, backgroundColor: 'blue' }]}>
                            <TouchableOpacity onPress={() => this.props.onPressProfile(comment.userId)}>
                                <Text style={styles.commentName}>
                                    {comment.name}
                                </Text>
                            </TouchableOpacity>

                            <View style={[styles.row, { justifyContent: 'space-between', backgroundColor: 'pink' }]}>

                                <TextInput
                                    style={styles.inputBox}
                                    editable={isEditing}
                                    ref={input => (this.commentTextInput = input)}

                                    placeholder='Write a comment...'
                                    value={this.state.composerValue}
                                    onChangeText={(value) => this.setState({ composerValue: value })}
                                    multiline
                                />


                                {this.isValidComment(this.state.composerValue) && isEditing &&
                                    <View style={{ alignSelf: 'flex-start' }}>
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
                        </View>
                    </View>

                    {!isEditing && this.props.enabled && !_.isEmpty(this.props.loggedInUser) && (comment.isParent ? this.renderParentOptionPanel(comment) : this.renderChildOptionPanel(comment))}
                    {isEditing && this.renderCancelEditButton()}
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                {this.renderComment(this.props.comment)}
            </View>
        )
    }
}

export default CommentCard;