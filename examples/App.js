/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
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
            childrenCount: 7,
            commentId: "5c8b6af797da8f43664235ac",
            createdAt: "2019-03-15T09:05:59.731Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            repliesHasNextPage: true,
            replyPage: 1,
            isFetchingReplies: false,
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8b6af797da8f43664235ac",
          },
          {

            childrenCount: 0,
            commentId: "5c8a08183e3c5a5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c5a5ccb264d5f"
          },
          {

            childrenCount: 1,
            commentId: "5c8a08183e3c555ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "et quasi architecto beatae vitae dicta sunt explicabo",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3c555ccb264d5f"
          },
          {

            childrenCount: 0,
            commentId: "5c8a08fg83e3c5a5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08fg83e3c5a5ccb264d5f"
          },
          {

            childrenCount: 0,
            commentId: "5c8a08183e3ca5ccb264d5f",
            createdAt: "2019-03-14T07:51:52.716Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "sed quia non numquam",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08183e3ca5ccb264d5f"
          },
          {
            childrenCount: 0,
            commentId: "5c8a08163e3c5a64e1264d5e",
            createdAt: "2019-03-11T07:51:50.153Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "Quis autem vel eum iure reprehenderit qui in",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08163e3c5a64e1264d5e"
          },
          {
            childrenCount: 0,
            commentId: "5c8a08163e3c5a64e1264d6e",
            createdAt: "2019-02-11T07:51:50.153Z",
            isParent: true,
            jobId: "5c6e4ba530972c31b294c429",
            message: "ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur",
            name: "Raptor",
            parentId: null,
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c8a08163e3c5a64e1264d6e"
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
            message: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5074395ce7198652fb"
          },
          {
            commentId: "5c94ea5074395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "deleniti atque corrupti quos dolores ",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5074395ce71986523b"
          },
          {
            commentId: "5c94ea5071395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "deleniti laudantium, totam rem aperiam, atque corrupti quos dolores aperiam, atque corrupti quos deleniti laudantium, totam",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5071395ce71986523b"
          },
          {
            commentId: "5c2fea5074395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "deleniti atque corrupti quos dolores ",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c2fea5074395ce71986523b"
          },
          {
            commentId: "5c94ea5f64395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5f64395ce71986523b"
          },
          {
            commentId: "5c948uh074395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "quidem rerum facilis est et expedita distinctio.",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c948uh074395ce71986523b"
          },
          {
            commentId: "5c94ea5gx4395ce71986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "deleniti atque corrupti quos dolores delectus, ut aut reiciendis voluptatibus maiores",
            name: "Raptor",
            parentId: "5c8b6af797da8f43664235ac",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea5gx4395ce71986523b"
          }
        ],
        '5c8a08183e3c555ccb264d5f': [
          {
            commentId: "5c94ea50743952371986523b",
            createdAt: "2019-03-22T13:59:44.070Z",
            isParent: false,
            jobId: "5c6e4ba530972c31b294c429",
            message: "et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus",
            name: "Raptor",
            parentId: "5c8a08183e3c555ccb264d5f",
            profilePic: "https://s3-ap-southeast-1.amazonaws.com/onawadak-userfiles/public/1550171141570-shot-59-skullbeardgaming.png",
            userId: "829c26f6-f845-4d87-8ba5-c57aab91a84c",
            _id: "5c94ea50743952371986523b"
          }
        ]
      },

      commentPage: 2,
      isFetchingComments: false,
      commentsHasNextPage: true,

      pageSize: 5
    };

    moment.locale('en', configRelTime_Posted);
  }

  fetchComments = (jobId, page) => {
    this.setState({ isFetchingComments: true })
    console.log(jobId, page);
    setTimeout(() => { this.setState({ isFetchingComments: false }) }, 5000)

  }

  fetchCommentReplies = ({ page, parentId, onSuccess, onFail }) => {
    console.log(parentId, page)
    setTimeout(() => { onSuccess() }, 3000)
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

  onPressLogIn = () => {
    Alert.alert("Pressed LogIn")
  }

  render() {
    return (
      <View style={styles.container}>
        <Comments
          //Passed as props
          enabled={true}
          jobId={'5c6e4ba530972c31b294c429'}
          //location={this.props.location} TODO

          //mapStateToProps
          user={this.state.user}
          comments={this.state.comments['5c6e4ba530972c31b294c429']}
          commentPage={this.state.commentPage}
          isFetchingComments={this.state.isFetchingComments}
          commentsHasNextPage={this.state.commentsHasNextPage}

          replies={this.state.replies}

          //Methods
          fetchComments={(page) => this.fetchComments('5c6e4ba530972c31b294c429', page)}
          saveComment={this.saveComment}
          updateComment={this.updateComment}
          deleteComment={this.deleteComment}
          fetchCommentReplies={this.fetchCommentReplies}

          onPressProfile={this.onPressProfile}
          onPressLogIn={this.onPressLogIn}

          style={{ padding: 20 }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});
