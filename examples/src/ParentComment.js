import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import { Composer } from './Composer';
import { SeeMoreComments } from './SeeMoreComments'
import CommentCard from './CommentCard';
import styles from "./styles";

class ParentComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            isFetchingReplies: false,
            isReplying: false
        };
    }

    toggleShowReplies = (parentId) => {
        if (this.state.collapse) {
            this.props.fetchCommentReplies(parentId, 1, this.props.jobId);
        }
        this.setState({
            collapse: !this.state.collapse
        });
    }

    onPressReply = () => {
        this.setState({ isReplying: true });
    }

    renderParentComment = (comment) => {
        return (
            <CommentCard
                key={comment.commentId}
                enabled={this.props.enabled}
                loggedInUser={this.props.loggedInUser}
                comment={this.props.comment}

                saveComment={this.props.saveComment}
                deleteComment={this.props.deleteComment}
                editComment={this.props.editComment}

                onPressReply={this.onPressReply}

                fetchCommentReplies={this.props.fetchCommentReplies}
                onPressProfile={this.props.onPressProfile}

                replyPage={comment.replyPage}
                repliesHasNextPage={comment.repliesHasNextPage}

            />
        )
    }

    renderReplies = (replies) => {
        return (
            replies.map((reply) => {
                return (
                    <CommentCard
                        key={reply.commentId}
                        enabled={this.props.enabled}
                        loggedInUser={this.props.loggedInUser}
                        comment={reply}

                        saveComment={this.props.saveComment}
                        deleteComment={this.props.deleteComment}
                        editComment={this.props.editComment}

                        onPressReply={this.onPressReply}

                        fetchCommentReplies={this.props.fetchCommentReplies}
                        onPressProfile={this.props.onPressProfile}

                        replyPage={reply.replyPage}
                        repliesHasNextPage={reply.repliesHasNextPage}

                    />
                )
            })
        )
    }

    renderRepliesCollapsible = () => {
        return (
            this.props.comment.childrenCount > 0 &&
            <View>
                <View style={styles.showRepliesContainer}>

                    {/* Show replies button */}
                    <View style={styles.showRepliesButton}>
                        <TouchableOpacity onPress={() => { this.toggleShowReplies(this.props.comment.commentId) }} >
                            <Text>{
                                `${this.state.collapse ? 'Show' : 'Hide'} ${this.state.collapse ? this.props.comment.childrenCount : ''} ${this.props.comment.childrenCount === 1 ? 'Reply' : 'Replies'}`
                            }</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Show replies loader */}
                    {this.props.replyPage === 1 && this.state.isFetchingReplies &&
                        < View style={styles.showRepliesLoader}>
                            <ActivityIndicator size="small" color={'#d3d3d3'} animating={true} />
                        </View>
                    }
                </View>

                <Collapsible
                    style={{ flex: 1 }}
                    easing="easeOutCubic"
                    collapsed={this.state.collapse}
                >
                    <View style={styles.replyComments}>

                        {/* Render Replies */}
                        {this.renderReplies(this.props.replies)}

                        {/* Render see more replies */}
                        <SeeMoreComments
                            comments={this.props.replies}
                            jobId={this.props.jobId}
                            hasNextPage={this.props.repliesHasNextPage}
                            fetchComments={this.props.fetchCommentReplies}
                            page={this.props.replyPage}
                            isFetching={this.props.isFetchingReplies}
                            parentId={this.props.comment.commentId}
                        />

                    </View>
                </Collapsible>
            </View>

        )
    }

    render() {
        return (
            <View>

                {/* Render Comment */}
                {this.renderParentComment(this.props.comment)}

                {/* Render replies collapsible */}
                {this.renderRepliesCollapsible()}

                {/* Render reply composer */}
                {this.state.isReplying &&
                    <Composer
                        enabled={true}
                        user={this.props.loggedInUser}
                        saveComment={this.props.saveComment}
                        parentId={this.props.comment.commentId}
                    />}

            </View>
        )
    }
}

export { ParentComment };