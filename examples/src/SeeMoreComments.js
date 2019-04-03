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
        this.props.fetchCommentReplies(parentId);
    }

    render() {
        return (
            <View style={styles.seeMoreCommentsContainer}>
                {this.props.hasNextPage &&
                    <TouchableOpacity
                        style={styles.seeMoreCommentsBtn}
                        onPress={this.props.fetchComments}
                        disabled={this.props.isFetching}>
                        <Text style={styles.commentOptionText}>{`See more ${this.props.seeMoreReplies ? 'replies' : 'comments'}`}</Text>
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