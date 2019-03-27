import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as _ from 'lodash';
import moment from 'moment';

import Images from './images';
import styles from "./styles";



class CommentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            isValidReply: false,
            isValidEdit: false,
            replyingComposerValue: '',
            editingComposerValue: ''
        };
    }

    validateComment = (isReply = false) => {

        let text = '';

        if (isReply) {
            text = this.state.replyingComposerValue.trim();

            if (!_.isEmpty(text)) {
                this.setState({ isValidReply: true })
            } else {
                this.setState({ isValidReply: false })
            }
        }
        else {

            text = this.state.editingComposerValue.trim();

            if (!_.isEmpty(text)) {
                this.setState({ isValidEdit: true })
            } else {
                this.setState({ isValidEdit: false })
            }
        }

    }

    toggle = (parentId) => {
        this.setState({
            collapse: !this.state.collapse
        });
        if (!this.state.collapse) {
            this.props.onPressShowReplies(parentId);
            this.props.fetchCommentReplies(parentId, 1, this.props.jobId);
        }

    }

    onPressReply = (commentId) => {
        this.props.onPressReply(commentId)
        this.setState({
            collapse: false
        });
    }

    seeMoreReplies = (parentId) => {
        this.props.fetchCommentReplies(parentId, this.props.replyPage + 1, this.props.jobId);
    }

    renderReplyButton = (comment) => <TouchableOpacity style={styles.commentOption} onPress={() => this.onPressReply(comment.commentId)}><Text>Reply</Text></TouchableOpacity>
    renderEditButton = (comment) => <TouchableOpacity style={styles.commentOption}
        onPress={() => {
            this.props.onPressEdit(comment.commentId)
            this.commentTextInput.focus()
        }}
    ><Text>Edit</Text></TouchableOpacity>
    renderCancelEditButton = (comment) => <TouchableOpacity style={styles.commentOption} onPress={() => this.props.onPressCancelEdit()}><Text>Cancel</Text></TouchableOpacity>
    renderDeleteButton = (comment) => <TouchableOpacity style={styles.commentOption} onPress={() => this.props.deleteComment(comment)}><Text>Delete</Text></TouchableOpacity>
    renderTimeStamp = (createdAt) => <TouchableOpacity style={styles.commentOption}><Text>{moment(new Date(createdAt)).fromNow(true)}</Text></TouchableOpacity>

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

    renderCommentReplying = () => {
        if (this.props.isReplying && (this.props.comment.commentId === this.props.replyingCommentId)) {
            return (
                < View style={styles.replyCommentComposer}>
                    <View style={styles.commentCard}>
                        {/* TODO: check why image is not rendering */}
                        <Image source={{ uri: this.props.loggedInUser.profilePic }} style={styles.ProfilePicture} />
                        <TextInput
                            style={styles.composerTextInput}
                            rows='1'
                            placeholder='Write a comment...'
                            value={this.state.replyingComposerValue}
                            onChangeText={(value) => { this.setState({ replyingComposerValue: value }, () => this.validateComment(true)) }}
                            multiline
                            autoFocus
                        />
                        {this.state.isValidReply &&
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.saveComment(this.state.replyingComposerValue, this.props.comment.commentId);
                                        this.setState({ replyingComposerValue: '', isValidReply: false })
                                        this.setState({ collapse: true }, () => this.setState({ collapse: false }))

                                    }}
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
            )
        }
    }

    renderComment = (comment) => {
        let isEditingComment = this.props.isEditing && (this.props.editingCommentId === comment.commentId)
        return (
            <View key={comment.commentId}
                style={styles.commentCard}>

                {/* TODO: Link profile pic to profile */}
                <Image source={{ uri: comment.profilePic }} style={styles.ProfilePicture} />

                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <View style={styles.textSection}>
                            <Text style={styles.commentName}>
                                {comment.name}
                            </Text>
                            <View>
                                <TextInput
                                    style={{ color: '#000', }}
                                    editable={isEditingComment}
                                    ref={input => (this.commentTextInput = input)}

                                    placeholder='Write a comment...'
                                    defaultValue={comment.message}
                                    onChangeText={(value) => { this.setState({ editingComposerValue: value }, () => this.validateComment()) }}
                                    multiline
                                />

                            </View>

                        </View>

                        {this.state.isValidEdit &&
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.props.editComment({ ...comment, message: this.state.editingComposerValue })}
                                    style={styles.sendBtn}
                                >
                                    <Image
                                        source={Images.send}
                                        style={styles.sendImg} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>


                    {!isEditingComment && this.props.enabled && this.props.isLoggedIn && (comment.isParent ? this.renderParentOptionPanel(comment) : this.renderChildOptionPanel(comment))}

                    {isEditingComment && this.renderCancelEditButton()}



                </View>
            </View>
        )

    }

    render() {
        console.log(this.state.collapse)
        return (
            <View
                style={{ flex: 1 }}>
                {this.renderComment(this.props.comment)}

                {/* Child comments */}
                {this.props.comment.childrenCount > 0 ?
                    <View>
                        <View style={styles.seeMoreReplies}>
                            {/* toggle switch */}
                            <View style={styles.showReplies}>
                                <TouchableOpacity onPress={() => { this.toggle(this.props.comment.commentId) }} disabled={this.props.isFetchingReplies}>
                                    <Text>{
                                        `${this.state.collapse ? 'Show' : 'Hide'} ${this.state.collapse ? this.props.comment.childrenCount : ''} ${this.props.comment.childrenCount === 1 ? 'Reply' : 'Replies'}`
                                    }</Text>
                                </TouchableOpacity>
                            </View>

                            {/* spinner for show replies */}
                            {this.props.isFetchingReplies && this.props.replyPage === 1 && this.props.isThisFetchingComments &&
                                < View style={styles.seeMoreRepliesLoader}>
                                    <ActivityIndicator size="small" color={'#d3d3d3'} animating={true} />
                                </View>
                            }
                        </View>

                        <Collapsible
                            style={{ flex: 1 }}
                            easing="easeOutCubic"
                            collapsed={this.state.collapse}>

                            <View style={styles.replyComments}>
                                {this.props.replies.map((reply) => this.renderComment(reply))}

                                <View style={styles.seeMoreReplies}>

                                    {this.props.repliesHasNextPage &&
                                        <View>
                                            <TouchableOpacity onPress={() => this.seeMoreReplies(this.props.comment.commentId)} disabled={this.props.isFetchingReplies}>
                                                <Text>See more replies</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }


                                    {this.props.repliesHasNextPage && this.props.isFetchingReplies && this.props.replyPage !== 1 && this.props.isThisFetchingComments &&
                                        < View style={styles.seeMoreRepliesLoader}>
                                            <ActivityIndicator size="small" color={'#d3d3d3'} animating={true} />
                                        </View>
                                    }
                                </View>

                            </View>
                        </Collapsible>

                        <View>
                            {this.renderCommentReplying()}
                        </View>

                    </View>
                    :
                    <View>{this.renderCommentReplying()}</View>
                }

            </View>
        )
    }
}

export default CommentCard;