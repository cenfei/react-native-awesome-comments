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
import CommentCard from './CommentCard';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            editingCommentId: '',

            isReplying: false,
            replyingCommentId: '',

            fetchingRepliesParentId: '',

            parentComposerValue: '',
        };
    }

    componentWillMount() {
        this.props.fetchComments(this.props.jobId, 1);
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
        this.setState({ parentComposerValue: '', isReplying: false })
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

    onPressReply = (replyingCommentId) => {
        this.setState({ replyingCommentId, isReplying: true, isEditing: false });
    }

    onPressShowReplies = (id) => {
        this.setState({ fetchingRepliesParentId: id })
    }

    onPressEdit = (editingCommentId) => {
        this.setState({ editingCommentId, isEditing: true, isReplying: false });
    }

    onSubmitEdit = (comment) => {
        this.props.updateComment(comment)
        this.setState({ editingCommentId: '', isEditing: false });
    }

    onPressCancelEdit = () => {
        this.setState({ editingCommentId: '', isEditing: false });
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

    renderCommentsList = (comments) => {
        if (_.isEmpty(comments)) {
            return <View />
        } else {
            return comments.map((comment) => {
                let replies = _.get(this.props.replies, `${comment.commentId}`, []);
                return (
                    <CommentCard
                        enabled={this.props.enabled}
                        key={comment.commentId}
                        jobId={this.props.jobId}

                        isLoggedIn={this.props.isLoggedIn}
                        loggedInUser={this.props.user}

                        isEditing={this.state.isEditing}
                        editingCommentId={this.state.editingCommentId}

                        saveComment={this.saveComment}
                        deleteComment={this.deleteComment}
                        onPressReply={this.onPressReply}
                        onPressEdit={this.onPressEdit}
                        editComment={this.onSubmitEdit}
                        onPressCancelEdit={this.onPressCancelEdit}
                        onPressShowReplies={this.onPressShowReplies}
                        fetchCommentReplies={this.props.fetchCommentReplies}

                        replyPage={comment.replyPage}
                        isReplying={this.state.isReplying}
                        replyingCommentId={this.state.replyingCommentId}
                        repliesHasNextPage={comment.repliesHasNextPage}
                        isFetchingReplies={this.props.isFetchingReplies}
                        isThisFetchingComments={this.state.fetchingRepliesParentId === comment.commentId}

                        replies={replies}
                        comment={comment}
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

                {this.renderComposer()}
                {this.renderCommentsList(comments)}

                {this.renderSeeMoreComments(comments)}
                {this.props.commentPage === 1 && this.props.isFetchingComments &&
                    <ActivityIndicator size="large" color={'#d3d3d3'} animating={true} />
                }

            </ScrollView>
        )
    }
}

export { Comments };