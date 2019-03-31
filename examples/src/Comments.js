import React, { Component } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, ScrollView, Image,
    Alert
} from 'react-native';
import * as _ from 'lodash';

import Images from './images';
import styles from "./styles";
import ParentComment from './ParentComment';
import Composer from './Composer';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        //this.props.fetchComments(this.props.jobId, 1);
    }

    saveComment = (text, parentId) => {

        let comment = {
            jobId: this.props.jobId,
            parentId: null,
            commentId: new Date().getTime().toString(),
            name: this.props.user.name,
            message: text,
            createdAt: (new Date()).toISOString(),
            userId: this.props.user.userId,
            isParent: false,
            profilePic: this.props.user.profilePic
        }

        if (!parentId) {
            comment.isParent = true
            comment.childrenCount = 0
        } else {
            comment.parentId = parentId
        }
        this.props.saveComment(comment)
        this.setState({ parentComposerValue: '', replyingCommentId: null })
    }

    deleteComment = (comment) => {
        Alert.alert(
            'Deleting Comment',
            'Are you sure you want to delete this comment?',
            [
                { text: 'DELETE', onPress: () => this.props.deleteComment(comment) },
                {
                    text: 'CANCEL',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: true },
        );

    }

    onPressReply = (commentId) => {
        this.setState({ replyingCommentId: commentId, editingCommentId: null });
    }

    onPressShowReplies = (id) => {
        this.setState({ fetchingRepliesParentId: id })
    }

    onPressEdit = (commentId) => {
        this.setState({ editingCommentId: commentId, replyingCommentId: null });
    }

    onSubmitEdit = (comment) => {
        this.props.updateComment(comment)
        this.setState({ editingCommentId: null });
    }

    onPressCancelEdit = () => {
        this.setState({ editingCommentId: null });
    }

    renderSeeMoreComments = (comments) => {
        return (
            <View style={styles.seeMoreCommentsContainer}>
                {!_.isEmpty(comments) && (this.props.commentsHasNextPage) &&
                    <TouchableOpacity
                        style={styles.seeMoreCommentsBtn}
                        onPress={() => this.props.fetchComments(this.props.jobId, this.props.commentPage + 1)}
                        disabled={this.props.isFetchingComments}>
                        <Text>See more comments</Text>
                    </TouchableOpacity>
                }

                {this.props.isFetchingComments && this.props.commentPage !== 1 &&
                    <ActivityIndicator style={styles.seeMoreCommentsLoader} size="small" color={'#d3d3d3'} animating={true} />
                }
            </View>
        )
    }

    isValidParentComment = () => {
        const text = this.state.parentComposerValue.trim()
        if (_.isEmpty(text)) {
            return false
        } else {
            return true
        }
    }

    renderComposer = () => {
        if (this.props.enabled) {
            return (
                this.props.isLoggedIn ? (
                    <View style={styles.composerContainer}>
                        <Image source={{ uri: this.props.user.profilePic }} style={styles.ProfilePicture} />
                        <TextInput
                            style={styles.composerTextInput}
                            rows='1'
                            placeholder='Write a comment...'
                            defaultValue=''
                            value={this.state.parentComposerValue}
                            onChangeText={(value) => this.setState({ parentComposerValue: value })}
                            multiline

                        />
                        {this.isValidParentComment() &&
                            <TouchableOpacity
                                onPress={() => { this.saveComment(this.state.parentComposerValue, null) }}
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

    renderComments = (comments) => {
        if (_.isEmpty(comments)) {
            return <View />
        } else {
            return comments.map((comment) => {
                let replies = _.get(this.props.replies, `${comment.commentId}`, []);
                return (
                    <ParentComment
                        key={comment.commentId}
                        enabled={this.props.enabled}
                        loggedInUser={this.props.user}
                        comment={comment}
                        replies={replies}

                        saveComment={this.saveComment}
                        deleteComment={this.deleteComment}
                        onPressReply={this.onPressReply}
                        onPressEdit={this.onPressEdit}
                        editComment={this.onSubmitEdit}
                        onPressCancelEdit={this.onPressCancelEdit}
                        onPressShowReplies={this.onPressShowReplies}
                        fetchCommentReplies={this.props.fetchCommentReplies}
                        onPressProfile={this.props.onPressProfile}

                        replyPage={comment.replyPage}
                        replyingCommentId={this.state.replyingCommentId}
                        repliesHasNextPage={comment.repliesHasNextPage}


                        fetchingRepliesParentId={this.props.fetchingRepliesParentId}
                    />
                )
            })
        }
    }

    render() {
        const comments = _.get(this.props.comments, `[${this.props.jobId}]`, []);
        return (
            <ScrollView style={styles.container} >
                <Text style={styles.commentSectionTitle}>Comments</Text>

                {/* Render Composer */}
                <Composer />

                {/* Render comments */}
                {this.renderComments(comments)}

                {/* Render see more comments */}
                {this.renderSeeMoreComments(comments)}

                {/* Fetch comments loader */}

            </ScrollView>
        )
    }
}

export { Comments };