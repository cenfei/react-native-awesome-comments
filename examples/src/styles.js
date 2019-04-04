import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row'
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
    textInputSection: {
        backgroundColor: '#f2f2f2',
        padding: 5,
        borderRadius: 25,
        borderWidth: 0.6,
        borderColor: '#a5a5a5'
    },
    inputBox: {
        flexDirection: "row",
        paddingHorizontal: 13,
        paddingVertical: 0,
        marginVertical: 0,
        flex: 1,
        color: '#474747'
    },
    commentName: {
        fontWeight: 'bold',
        paddingHorizontal: 13,
        color: '#545454'
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
        justifyContent: 'flex-start',
        marginVertical: 0,
        marginTop: 10,
        marginHorizontal: 10
    },
    optionPanel: {
        flexDirection: 'row',
        paddingLeft: 12,
        marginLeft: 5
    },
    commentOption: {
        marginRight: 20,
        marginVertical: 2
    },
    commentOptionText: {
        color: '#7c7c7c',
        fontWeight: '400'
    },
    replyComments: {
        flex: 1,
        paddingLeft: 67
    },


    seeMoreCommentsBtn: {
        paddingLeft: 77
    },
    seeMoreCommentsContainer: {
        flexDirection: 'row',
        marginVertical: 0,
        paddingVertical: 0
    },
    seeMoreCommentsLoader: {
        marginLeft: 10
    },


    showRepliesContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginVertical: 0
    },
    showRepliesButton: {
        paddingLeft: 67,
        marginBottom: 0
    },
    showRepliesLoader: {
        marginLeft: 10
    }
})