/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Chip} from 'react-native-paper';
import PropTypes from 'prop-types';

const CustomExpense = ({expense, deleteItem, editItem}) => {
    const getWayIcon = way => {
        switch (way) {
            case 'Cash':
                return (
                    <FontAwesome5
                        name="money-bill-wave"
                        size={10}
                        color="#000"
                    />
                );
            case 'Card':
                return (
                    <FontAwesome5 name="credit-card" size={10} color="#000" />
                );
            case 'Bank Transfer':
                return <FontAwesome5 name="building" size={10} color="#000" />;
            case 'UPI':
                return (
                    <FontAwesome5 name="funnel-dollar" size={10} color="#000" />
                );
            case 'Cheque':
                return (
                    <FontAwesome5
                        name="money-check-alt"
                        size={10}
                        color="#000"
                    />
                );
            case 'Net Banking':
                return (
                    <FontAwesome5 name="network-wired" size={10} color="#000" />
                );

            default:
                return null;
        }
    };
    const getExpenseType = type =>
        type === 'Debit' ? (
            <Ionicons name="trending-down-outline" size={20} color="#000" />
        ) : (
            <Ionicons name="trending-up-outline" size={20} color="#000" />
        );

    return (
        <View
            style={[
                styles.mainContainer,
                {
                    backgroundColor:
                        expense.type === 'Debit' ? '#C46e5c88' : '#A6CF9855',
                    borderColor:
                        expense.type === 'Debit' ? '#DB7A67' : '#709E60',
                },
            ]}>
            <View style={{alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text numberOfLines={1} style={styles.expenseName}>
                        {expense.description}
                    </Text>
                    <Text style={styles.money}>₹ {expense.value} </Text>
                </View>

                <View style={{flexDirection: 'row', marginVertical: 10}}>
                    <Chip
                        mode="outlined"
                        style={[styles.chipStyle]}
                        icon={() => getExpenseType(expense.type)}>
                        <Text style={styles.chipText}>{expense.type}</Text>
                    </Chip>
                    <Chip
                        mode="outlined"
                        style={styles.chipStyle}
                        icon={() => getWayIcon(expense.way)}>
                        <Text style={styles.chipText}>{expense.way}</Text>
                    </Chip>
                </View>
                <Text style={[styles.expenseName, {fontSize: 14}]}>
                    {expense.date}
                </Text>
            </View>
            {deleteItem && (
                <>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={deleteItem}>
                        <FontAwesome5
                            name="times-circle"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deleteButton, {right: 30, top: 6}]}
                        onPress={editItem}>
                        <FontAwesome5 name="edit" size={16} color="#fff" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    expenseName: {
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Karla-Regular',
        color: '#fff',
    },
    money: {
        fontSize: 15,
        fontFamily: 'Karla-Regular',
        color: '#fff',
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        margin: 5,
        marginBottom: 10,
        padding: 30,
        width: 170,
        borderWidth: 1.2,
        borderColor: '#e1f8ff',
        backgroundColor: '#1e1e2d',
        borderRadius: 15,
    },
    chipStyle: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 1,
        backgroundColor: '#e1f7ff',
    },
    chipText: {
        fontSize: 9,
        color: '#000',
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
});

CustomExpense.propTypes = {
    expense: PropTypes.object.isRequired,
    deleteItem: PropTypes.func,
    editItem: PropTypes.func,
};

export default CustomExpense;
