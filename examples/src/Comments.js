import React, { Component } from "react";
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import * as _ from 'lodash';

import styles from "./styles";
import { ParentComment } from './ParentComment';
import { Composer } from './Composer';
import { SeeMoreComments } from './SeeMoreComments'
class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.fetchComments(1);
    }

    saveComment = (text, parentId) => {

        let comment = {
            jobId: this.props.jobId,
            commentId: new Date().getTime().toString(),
            name: this.props.user.name,
            message: text,
            createdAt: (new Date()).toISOString(),
            userId: this.props.user.userId,
            profilePic: this.props.user.profilePic,

            // TODO: refactor
            parentId: null,
            isParent: false
        }

        if (!parentId) {
            comment.isParent = true
            comment.childrenCount = 0
        } else {
            comment.parentId = parentId
        }
        this.props.saveComment(comment)
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
                        deleteComment={this.props.deleteComment}
                        editComment={this.props.updateComment}


                        fetchCommentReplies={({ page, onSuccess, onFail }) => this.props.fetchCommentReplies({ page, parentId: comment.commentId, onSuccess, onFail })}
                        onPressProfile={this.props.onPressProfile}
                        onPressLogIn={this.props.onPressLogIn}

                        replyPage={comment.replyPage}
                        repliesHasNextPage={comment.repliesHasNextPage}
                        isFetchingReplies={comment.isFetchingReplies}
                    />
                )
            })
        }
    }

    render() {
        return (
            <ScrollView style={[styles.container, this.props.style]} >
                {this.props.title && <Text style={styles.commentSectionTitle}>{this.props.title}</Text>}

                {/* Render Composer */}
                <Composer
                    enabled={this.props.enabled}
                    user={this.props.user}
                    saveComment={this.saveComment}
                    parentId={null}
                    onPressLogIn={this.props.onPressLogIn}
                />

                {/* Render comments */}
                {this.renderComments(this.props.comments)}

                {/* Render see more comments */}
                {!_.isEmpty(this.props.comments) &&
                    <View>
                        <SeeMoreComments
                            seeMoreReplies={false}
                            fetchComments={() => this.props.fetchComments(this.props.commentPage + 1)}
                            hasNextPage={this.props.commentsHasNextPage}
                            page={this.props.commentPage}
                            isFetching={this.props.isFetchingComments}
                        />

                        {/* Fetch comments loader */}
                        {this.props.isFetchingComments && this.props.commentPage === 1 &&
                            <ActivityIndicator style={styles.seeMoreCommentsLoader} size="small" color={'#d3d3d3'} animating={true} />
                        }
                    </View>
                }

                <View style={{ height: 50 }} />

            </ScrollView>
        )
    }
}

export { Comments };