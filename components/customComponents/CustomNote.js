import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {capitalize} from 'lodash';
import ExpandableText from './ExpandableText';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomNote = ({note, deleteNote}) => {
    const {note: noteText, date} = note;
    return (
        <View style={styles.note}>
            <View>
                <ExpandableText text={capitalize(noteText)} />
                <Text style={styles.dateText}>
                    {new Date(date).toDateString()}
                </Text>
            </View>
            <Text style={styles.iconButton} onPress={deleteNote}>
                <Ionicons
                    name="close-circle-outline"
                    size={22}
                    color="#F05454"
                />
            </Text>
        </View>
    );
};

export default CustomNote;

const styles = StyleSheet.create({
    note: {
        backgroundColor: '#1e1e2d',
        borderColor: '#f2f2f2',
        borderWidth: 1.5,
        borderRadius: 5,
        marginVertical: 5,
        // padding: 10
    },
    dateText: {
        fontFamily: 'NotoSansMono-Regular',
        fontSize: 13,
        color: '#fff',
        position: 'absolute',
        bottom: 3,
        right: 5,
    },
    iconButton: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
});

CustomNote.propTypes = {
    note: PropTypes.object.isRequired,
    deleteNote: PropTypes.func,
};
ExpandableText.propTypes = {
    note: PropTypes.string,
};
