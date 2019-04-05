import React, { Component } from "react";
import {
    Text,
    View,
    Alert,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Modal from "react-native-modal";

import Images from './images';
import { Composer } from './Composer';
import { SeeMoreComments } from './SeeMoreComments'
import CommentCard from './CommentCard';
import styles from "./styles";

class ParentComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReplying: false,
            page: 1,
            isFetchingReplies: false,
            isModalVisible: false
        };
    }

    onPressDelete = (comment) => {
        Alert.alert(
            'Deleting Comment',
            'Are you sure you want to delete this comment?',
            [
                {
                    text: 'DELETE', onPress: () => {
                        this.props.deleteComment(comment);
                    }
                },
                {
                    text: 'CANCEL',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            { cancelable: true },
        );

    }

    onPressReply = () => {
        this.setState({ isReplying: true, isModalVisible: true });
    }

    renderParentComment = (comment) => {
        return (
            <CommentCard
                key={comment.commentId}
                enabled={this.props.enabled}
                loggedInUser={this.props.loggedInUser}    // USDERID
                comment={this.props.comment}

                editComment={this.props.editComment}

                onPressReply={this.onPressReply}
                onPressDelete={this.onPressDelete}
                onPressProfile={this.props.onPressProfile}

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

                        editComment={this.props.editComment}

                        onPressReply={this.onPressReply}
                        onPressDelete={this.onPressDelete}
                        onPressProfile={this.props.onPressProfile}

                    />
                )
            })
        )
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    scrollReplyView = () => {
        setTimeout(() => { this.replyViewScroll.scrollToEnd({ animated: true }) }, 1000)
    }

    renderRepliesModal = () => {

        let parentComment = this.props.comment;

        return (

            <View>
                {parentComment.childrenCount > 0 &&
                    <TouchableOpacity
                        style={{ marginLeft: 77 }}
                        onPress={this.toggleModal}>
                        <Text style={styles.commentOptionText}>{`Show ${parentComment.childrenCount} ${parentComment.childrenCount === 1 ? 'Reply' : 'Replies'}`}</Text>
                    </TouchableOpacity>
                }

                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => { this.toggleModal(); this.setState({ isReplying: false }) }}
                    hasBackdrop={false}
                    animationInTiming={500}
                    style={{ margin: 0 }}
                >
                    <View style={{ padding: 15, backgroundColor: '#ffffff', elevation: 2, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '500', flex: 1, height: 20 }}>Replies</Text>
                        <TouchableOpacity
                            onPress={() => { this.toggleModal() }}
                            style={{ height: 20, paddingRight: 3 }}
                        >
                            <Image
                                source={Images.cancel}
                                style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        keyboardShouldPersistTaps={'handled'}
                        ref={ref => this.replyViewScroll = ref}
                    >

                        {/* Render parent comment inside replies modal*/}
                        <CommentCard
                            key={parentComment.commentId}
                            enabled={this.props.enabled}
                            loggedInUser={null}    // USDERID
                            comment={parentComment}

                            onPressProfile={this.props.onPressProfile}

                        />

                        {/* Render Replies */}
                        <View style={{ paddingLeft: 50 }}>

                            {/* Fetching replies initial loader */}
                            {
                                this.state.page === 1 && this.state.isFetchingReplies &&
                                < View style={{ margin: 10 }}>
                                    <ActivityIndicator size="large" color={'#d3d3d3'} animating={true} />
                                </View>
                            }

                            {this.renderReplies(this.props.replies)}

                            {/* Render see more replies */}
                            <SeeMoreComments
                                seeMoreReplies={true}
                                fetchComments={() => {
                                    let nextPage = this.state.page + 1
                                    this.setState({ page: nextPage, isFetchingReplies: true })
                                    this.props.fetchCommentReplies({
                                        page: nextPage,
                                        onSuccess: () => { this.setState({ isFetchingReplies: false }) },
                                        onFail: () => { this.setState({ isFetchingReplies: false }) }
                                    }
                                    )
                                }}
                                page={this.state.page}
                                hasNextPage={this.props.repliesHasNextPage}
                                isFetching={this.state.isFetchingReplies}
                                parentId={parentComment.commentId}
                            />
                        </View>

                    </ScrollView>

                    {/* Render reply composer */}
                    <View style={{ maxHeight: 100, backgroundColor: '#fff', elevation: 10, paddingVertical: 8, borderTopWidth: 0.5, borderTopColor: '#aaaaaa' }}>
                        <Composer
                            enabled={this.props.enabled}
                            user={this.props.loggedInUser}
                            saveComment={this.props.saveComment}
                            parentId={parentComment.commentId}
                            onPressLogIn={this.props.onPressLogIn}
                            isReplying={this.state.isReplying}
                            scrollReplyView={this.scrollReplyView}
                        />
                    </View>
                </Modal>

            </View>
        )
    }

    render() {
        return (
            <View>
                {/* Render Comment */}
                {this.renderParentComment(this.props.comment)}

                {/* Render replies */}
                {this.renderRepliesModal()}

            </View>
        )
    }
}

export { ParentComment };