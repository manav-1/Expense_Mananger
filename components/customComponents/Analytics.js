/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Title} from './styledComponents';
import {PieChart} from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import {groupBy} from 'lodash';

const Analytics = ({expenses}) => {
    const wayChartColors = [
        '#FFA290',
        '#FFB290',
        '#FFC290',
        '#FFD290',
        '#FFE290',
        '#FFF290',
    ];
    const typeChartColors = ['#F3BDA1', '#F38DA1', '#FFC500', '#FFD500'];
    const groupedByWay = Object.keys(groupBy(expenses, 'way')).map(
        (key, index) => ({
            name: key,
            value: groupBy(expenses, 'way')[key].length,
            color: wayChartColors[index],
            legendFontColor: '#F0E9D2',
            legendFontSize: 10,
        }),
    );
    const groupedByType = Object.keys(groupBy(expenses, 'type')).map(
        (key, index) => ({
            name: key,
            value: groupBy(expenses, 'type')[key].length,
            color: typeChartColors[index],
            legendFontColor: '#F0E9D2',
            legendFontSize: 12,
        }),
    );

    const chartConfig = {
        backgroundGradientFrom: '#e1f8ff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#ffc290',
        backgroundGradientToOpacity: 0,
        color: () => '#000', // optional
        strokeWidth: 1.5, // optional
        propsForBackgroundLines: {
            strokeWidth: 1.5, // optional
            strokeDasharray: '', // solid background lines with no dashes
        },
    };

    const screenWidth =
        Dimensions.get('screen').width / 2 < 300
            ? 300
            : Dimensions.get('screen').width / 2;
    return (
        <View style={{marginVertical: 10}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <View>
                    <Title style={{fontSize: 20}}>Number of Transactions</Title>
                    <PieChart
                        data={groupedByType}
                        width={screenWidth}
                        height={180}
                        chartConfig={chartConfig}
                        accessor={'value'}
                        backgroundColor={'transparent'}
                        hasLegend
                        avoidFalseZero
                    />
                </View>
                <View>
                    <Title style={{fontSize: 20}}>Expenses by Way</Title>

                    <PieChart
                        data={groupedByWay}
                        width={screenWidth}
                        height={180}
                        chartConfig={chartConfig}
                        accessor={'value'}
                        backgroundColor={'transparent'}
                        hasLegend
                        avoidFalseZero
                    />
                </View>
            </ScrollView>
        </View>
    );
};
Analytics.propTypes = {
    expenses: PropTypes.array.isRequired,
};

export default Analytics;
