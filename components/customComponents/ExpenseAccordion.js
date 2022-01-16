/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import CustomExpense from './CustomExpense';
import PropTypes from 'prop-types';

const ExpenseAccordion = ({title, expenses, deleteExpenses, editItem}) => {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <View style={styles.accordionContainer}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => setExpanded(!expanded)}
                style={styles.accordionButton}>
                <Text style={styles.accordionTitle}>{title}</Text>

                <Ionicons
                    color="#fff"
                    size={24}
                    name={expanded ? 'chevron-up' : 'chevron-down'}
                />
            </TouchableOpacity>
            {expanded ? (
                <FlatList
                    data={expenses}
                    numColumns={2}
                    renderItem={({item}) => (
                        <CustomExpense
                            expense={item}
                            editItem={() => editItem(item)}
                            deleteItem={() => deleteExpenses(item.index)}
                        />
                    )}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    accordionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitle: {
        color: '#fff',
        fontFamily: 'Karla-Regular',
        fontSize: 20,
        marginBottom: 10,
    },
    accordionExpenseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    accordionContainer: {
        marginVertical: 20,
    },
});

ExpenseAccordion.propTypes = {
    title: PropTypes.string,
    expenses: PropTypes.array,
    deleteExpenses: PropTypes.func,
    editItem: PropTypes.func,
};

export default ExpenseAccordion;
