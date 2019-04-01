import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    container: {
        flex: 1
    },
    commentSectionTitle: {
        margin: 5,
        fontWeight: 'bold'
    },
    composerContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        paddingHorizontal: 10,
        elevation: 2
    },
    composerTextInput: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 18,
        borderRadius: 18,
        textAlign: 'left',
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        borderBottomWidth: 5,
        borderColor: '#fff'
    },
    sendBtn: {
        justifyContent: 'center',
        marginHorizontal: 5
    },
    sendImg: {
        width: 30,
        height: 30
    },
    ProfilePicture: {
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 10
    },
    commentCard: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10
    },
    textSection: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 9,
        paddingHorizontal: 18,
        borderRadius: 25,
        borderColor: '#a5a5a5'
    },
    commentName: {
        marginRight: 10,
        fontWeight: 'bold'
    },
    optionPanel: {
        flexDirection: 'row',
        paddingLeft: 12
    },
    commentOption: {
        marginHorizontal: 5,
        marginVertical: 2
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    cancelCommentEdit: {
        paddingLeft: 16
    },
    replyCommentComposer: {
        paddingLeft: 67
    },
    replyComments: {
        flex: 1,
        paddingLeft: 67
    },


    seeMoreCommentsBtn: {
        paddingLeft: 77
    },
    seeMoreCommentsContainer: {
        flexDirection: 'row'
    },
    seeMoreCommentsLoader: {
        marginLeft: 10
    },


    showRepliesContainer: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    showRepliesButton: {
        paddingLeft: 67
    },
    showRepliesLoader: {
        marginLeft: 10
    },

    seeMoreRepliesContainer: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    seeMoreRepliesLoader: {
        marginLeft: 10
    }
})