import React, { Component } from "react";
import {
    Text,
    View,
    Alert,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Modal from "react-native-modal";

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
                        this.resetCollapsible()
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

    // toggleShowReplies = () => {
    //     if (this.state.collapse) {
    //         this.setState({ isFetchingReplies: true })
    //         this.props.fetchCommentReplies({
    //             page: 1,
    //             onSuccess: () => this.setState({ isFetchingReplies: false }),
    //             onFail: () => this.setState({ isFetchingReplies: false })
    //         })
    //     }
    //     this.setState({
    //         collapse: !this.state.collapse
    //     });
    // }

    onPressReply = () => {
        this.setState({ isReplying: true, isModalVisible: true });
    }

    resetCollapsible = () => {
        let self = this
        this.setState({ collapse: true },
            () => {
                setTimeout(() => {
                    self.setState({ collapse: false })
                }, 0)
            }

        )
    }

    renderParentComment = (comment) => {
        return (
            <CommentCard
                key={comment.commentId}
                enabled={this.props.enabled}
                loggedInUser={this.props.loggedInUser}    // USDERID
                comment={this.props.comment}

                saveComment={this.props.saveComment}
                editComment={this.props.editComment}

                onPressReply={this.onPressReply}
                onPressDelete={this.onPressDelete}
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
                        editComment={this.props.editComment}

                        onPressReply={this.onPressReply}
                        onPressDelete={this.onPressDelete}
                        onPressProfile={this.props.onPressProfile}

                        resetCollapsible={this.resetCollapsible}

                    />
                )
            })
        )
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    renderRepliesModal = () => {
        return (

            <View>
                {this.props.comment.childrenCount > 0 &&
                    <TouchableOpacity
                        style={{ marginLeft: 77 }}
                        onPress={this.toggleModal}>
                        <Text>{`Show ${this.props.comment.childrenCount} ${this.props.comment.childrenCount === 1 ? 'Reply' : 'Replies'}`}</Text>
                    </TouchableOpacity>
                }

                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={() => { this.toggleModal(); this.setState({ isReplying: false }) }}
                    hasBackdrop={false}
                    animationInTiming={400}
                    style={{ margin: 0 }}
                >
                    <Text style={{ textAlign: 'center', padding: 15, backgroundColor: '#ffffff', fontWeight: '500', elevation: 2 }}>Replies</Text>

                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#ffffff' }}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        {/* Render Replies */}
                        {this.renderReplies(this.props.replies)}
                    </ScrollView>

                    {/* Render reply composer */}
                    <View style={{ maxHeight: 95, backgroundColor: '#fff', elevation: 10, paddingVertical: 8 }}>
                        <Composer
                            enabled={this.props.enabled}
                            user={this.props.loggedInUser}
                            saveComment={this.props.saveComment}
                            parentId={this.props.comment.commentId}
                            resetCollapsible={this.resetCollapsible}
                            onPressLogIn={this.props.onPressLogIn}
                            isReplying={this.state.isReplying}
                        />
                    </View>
                </Modal>

            </View>
        )
    }

    // renderRepliesCollapsible = () => {
    //     return (
    //         this.props.comment.childrenCount > 0 &&
    //         <View>
    //             <View style={styles.showRepliesContainer}>

    //                 {/* Show replies button */}
    //                 <View style={styles.showRepliesButton}>
    //                     <TouchableOpacity onPress={() => { this.toggleShowReplies(this.props.comment.commentId) }} >
    //                         <Text style={styles.commentOptionText}>{
    //                             `${this.state.collapse ? 'Show' : 'Hide'} ${this.state.collapse ? this.props.comment.childrenCount : ''} ${this.props.comment.childrenCount === 1 ? 'Reply' : 'Replies'}`
    //                         }</Text>
    //                     </TouchableOpacity>
    //                 </View>

    //                 {/* Show replies loader */}
    //                 {this.state.page === 1 && this.state.isFetchingReplies &&
    //                     < View style={styles.showRepliesLoader}>
    //                         <ActivityIndicator size="small" color={'#d3d3d3'} animating={true} />
    //                     </View>
    //                 }
    //             </View>

    //             <Collapsible
    //                 style={{ flex: 1, paddingTop: 5 }}
    //                 easing="easeOutCubic"
    //                 collapsed={this.state.collapse}
    //             >
    //                 <View style={styles.replyComments}>

    //                     {/* Render Replies */}
    //                     {this.renderReplies(this.props.replies)}

    //                     {/* Render see more replies */}
    //                     <SeeMoreComments
    //                         seeMoreReplies={true}
    //                         fetchComments={() => {
    //                             let nextPage = this.state.page + 1
    //                             this.setState({ page: nextPage, isFetchingReplies: true })
    //                             this.props.fetchCommentReplies({
    //                                 page: nextPage,
    //                                 onSuccess: () => { this.setState({ isFetchingReplies: false }) },
    //                                 onFail: () => { this.setState({ isFetchingReplies: false }) }
    //                             }
    //                             )
    //                         }}
    //                         page={this.state.page}
    //                         hasNextPage={this.props.repliesHasNextPage}
    //                         isFetching={this.state.isFetchingReplies}
    //                         parentId={this.props.comment.commentId}
    //                     />

    //                 </View>
    //             </Collapsible>
    //         </View>

    //     )
    // }

    render() {
        return (
            <View>
                {/* Render Comment */}
                {this.renderParentComment(this.props.comment)}

                {/* Render replies collapsible */}
                {this.renderRepliesModal()}

            </View>
        )
    }
}

export { ParentComment };