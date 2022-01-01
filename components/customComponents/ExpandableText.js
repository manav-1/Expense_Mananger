import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ExpandableText = ({text, customStyle}) => {
    const [nLines, setNLines] = React.useState(false);
    return (
        <Text
            style={[styles.noteText, customStyle]}
            numberOfLines={nLines ? 0 : 1}
            onPress={() => setNLines(!nLines)}>
            {text.toString()}
        </Text>
    );
};
const styles = StyleSheet.create({
    noteText: {
        fontFamily: 'NotoSansMono-Regular',
        fontSize: 18,
        color: '#fff',
        marginVertical: 15,
        marginHorizontal: 5,
        padding: 7,
    },
});

export default ExpandableText;
