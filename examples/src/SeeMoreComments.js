import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import * as _ from 'lodash';

import styles from "./styles";

/*Props
comments
jobId
hasNextPage
fetchComments()
page
isFetching
parentId
*/

class SeeMoreComments extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    seeMoreReplies = (parentId) => {
        this.props.fetchCommentReplies(parentId, this.props.replyPage + 1, this.props.jobId);
    }

    render() {
        const comments = _.get(this.props.comments, `[${this.props.jobId}]`, []);
        return (
            <View style={styles.seeMoreCommentsContainer}>
                {!_.isEmpty(comments) && (this.props.hasNextPage) &&
                    <TouchableOpacity
                        style={styles.seeMoreCommentsBtn}
                        onPress={() => this.props.fetchComments(this.props.jobId, this.props.page + 1, this.props.parentId)}
                        disabled={this.props.isFetching}>
                        <Text>See more comments</Text>
                    </TouchableOpacity>
                }

                {this.props.isFetching && this.props.page !== 1 &&
                    <ActivityIndicator style={styles.seeMoreCommentsLoader} size="small" color={'#d3d3d3'} animating={true} />
                }
            </View>
        )
    }
}

export { SeeMoreComments };