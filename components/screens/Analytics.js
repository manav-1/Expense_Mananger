/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
    PaddedContainer,
    GradientContainer,
} from '../customComponents/styledComponents';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Analytics = () => {
    const [visible, setVisible] = React.useState(false);
    return (
        <GradientContainer>
            <View
                // colors={['#153759AA', '#fff']}
                style={styles.tabStyles}>
                <Text style={styles.tabBarTitle}>Analytics</Text>
                <TouchableOpacity
                    style={[styles.logoutButton, {paddingLeft: 0}]}
                    onPress={() => setVisible(!visible)}>
                    {!visible ? (
                        <Ionicons name="add" color="#fff" size={25} />
                    ) : (
                        <Ionicons name="close" color="#fff" size={25} />
                    )}
                </TouchableOpacity>
            </View>
            <PaddedContainer>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 600,
                    }}>
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20,
                            fontFamily: 'Karla-Regular',
                        }}>
                        Coming Soon
                    </Text>
                </View>
            </PaddedContainer>
        </GradientContainer>
    );
};

const styles = StyleSheet.create({
    tabBarTitle: {
        fontSize: 25,
        padding: 10,
        margin: 5,
        color: '#fff',
        fontFamily: 'Karla-Regular',
    },
    tabStyles: {
        // borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#181824',
    },
    logoutButton: {
        marginRight: 10,
        paddingLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#494c59',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Analytics;
