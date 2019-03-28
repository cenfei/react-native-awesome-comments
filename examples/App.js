/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import * as _ from 'lodash';
import moment from 'moment';

import { Comments } from './src';

const configRelTime_Posted = {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY'
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "Raptor",
        userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
        profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png"
      },
      comments: {
        'initial': [],
        '5c6e4ba530972c31b294c429': [
          {
            childrenCount: 1,
            commentId: "5c8b6af797da8f43664235ac",
            createdAt: "2019-03-15T09:05:59.731Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "Lorem ipsum dolor siti",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            repliesHasNextPage: true,
            replyPage: 1,
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8b6af797da8f43664235ac",
          },
          {

            childrenCount: 0,
            commentId: "5c8a08183e3c5a5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "tempor incididunt ut labore et",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c5a5ccb264d5f"
          },
          {

            childrenCount: 0,
            commentId: "5c8a08183e3c555ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "tempor incididunt ut labore et",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c5a5ccb264d5f"
          },
          {

            childrenCount: 0,
            commentId: "5c8a08fg83e3c5a5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "tempor incididunt ut  sdfgsdfg dsgds gsdgds gdsgsg gsdfg sdgdfgdggggggggglabore et",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c5a5ccb264d5f"
          },
          {

            childrenCount: 0,
            commentId: "5c8a08183e3ca5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "tempor incididunt ut labore et",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c5a5ccb264d5f"
          },
          {
            childrenCount: 0,
            commentId: "5c8a08163e3c5a64e1264d5e",
            createdAt: "2019-03-11T07:51:50.153Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "Ut enim ad minim veniam",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08163e3c5a64e1264d5e"
          }
        ]
      },
      replies: {
        'initial': [],
        '5c8b6af797da8f43664235ac': [
          {
            commentId: "5c94ea5074395ce7198652fb",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "First reply",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5074395ce7198652fb"
          }
        ]
      },

      commentPage: 1,
      isFetchingComments: false,
      commentsHasNextPage: true,

      fetchingRepliesParentId: null,

      pageSize: 5
    };

    moment.locale('en', configRelTime_Posted);
  }

  fetchComments = (jobId, page) => {
    console.log(jobId, page)
  }

  fetchCommentReplies = (parentId, page, jobId) => {
    this.setState({ fetchingRepliesParentId: parentId })
    console.log(parentId, jobId, page)
    setTimeout(() => { this.setState({ fetchingRepliesParentId: null }) }, 2000)
  }

  saveComment = (comment) => {
    if (comment.isParent) {
      this.setState({ comments: { ...this.state.comments, [comment.jobId]: [comment, ...this.state.comments[comment.jobId]] } })
    }
    else {
      let clone = [...this.state.comments[comment.jobId]];
      let pIndex = _.findIndex(clone, { commentId: comment.parentId });
      clone[pIndex].childrenCount = clone[pIndex].childrenCount + 1
      this.setState({
        comments: {
          ...this.state.comments,
          [comment.jobId]: clone
        },
        replies: {
          ...this.state.replies,
          [comment.parentId]: [..._.get(this.state.replies, `[${comment.parentId}]`, []), comment]
        }
      })
    }
  }

  deleteComment = (comment) => {
    if (comment.isParent) {
      const rest = _.filter(this.state.comments[comment.jobId], (cmt) => cmt.commentId !== comment.commentId);
      this.setState({
        comments: { ...this.state.comments, [comment.jobId]: rest }
      })
    }
    else {
      let parentId = comment.parentId;
      let repliesForParent = [...this.state.replies[parentId]];
      const replyCommentIndex = _.findIndex(repliesForParent, { commentId: comment.commentId });
      repliesForParent.splice(replyCommentIndex, 1);

      //Update Reply count
      let clone = [...this.state.comments[comment.jobId]]
      let pIndex = _.findIndex(clone, { commentId: parentId });
      clone[pIndex].childrenCount = clone[pIndex].childrenCount - 1

      this.setState({
        comments: {
          ...this.state.comments,
          [comment.jobId]: clone
        },
        replies: { ...this.state.replies, [parentId]: repliesForParent }
      });
    }
  }

  updateComment = (comment) => {
    if (comment.isParent) {
      let clone = [...this.state.comments[comment.jobId]];
      const updatedCommentIndex = _.findIndex(this.state.comments[comment.jobId], { commentId: comment.commentId })
      clone.splice(updatedCommentIndex, 1, comment);
      this.setState({
        comments: { ...this.state.comments, [comment.jobId]: clone }
      })
    }
    else {
      let parentId = comment.parentId;
      let repliesForParent = [...this.state.replies[parentId]];

      const replyIndex = _.findIndex(repliesForParent, { commentId: comment.commentId });
      repliesForParent.splice(replyIndex, 1, comment)

      this.setState({
        replies: { ...this.state.replies, [parentId]: repliesForParent }
      })
    }
  }
  onPressProfile = (userId) => {
    Alert.alert(userId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Comments
          //Passed as props
          enabled={true}
          isLoggedIn={true}
          jobId={'5c6e4ba530972c31b294c429'}
          //location={this.props.location} TODO

          //mapStateToProps
          user={this.state.user}
          comments={this.state.comments}
          commentPage={this.state.commentPage}
          isFetchingComments={this.state.isFetchingComments}
          commentsHasNextPage={this.state.commentsHasNextPage}

          replies={this.state.replies}
          fetchingRepliesParentId={this.state.fetchingRepliesParentId}

          //Methods
          fetchComments={this.fetchComments}
          saveComment={this.saveComment}
          updateComment={this.updateComment}
          deleteComment={this.deleteComment}
          fetchCommentReplies={this.fetchCommentReplies}
          onPressProfile={this.onPressProfile}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textInputView: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top'
  },
  textInputButton: {
    flexShrink: 1,
  }
});
