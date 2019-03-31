import React, { Component } from "react";
import {
    Text,
    View
} from 'react-native';

import CommentCard from './CommentCard';

class ParentComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            isFetchingReplies: false,
            isReplying: false
        };
    }

    renderParentComment = (comment) => {
        return (
            <CommentCard
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
    }

    renderReplies = (replies) => {
        return (
            replies.map((reply) => {
                return (
                    <CommentCard
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
        )
    }

    render() {
        return (
            <View>
                <Text>ParentComment</Text>

                {/* Render Comment */}
                {this.renderParentComment(this.props.comment)}

                {/* Render Replies */}
                {this.renderReplies(this.props.replies)}

            </View>
        )
    }
}

export { ParentComment };