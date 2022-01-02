/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {Title} from './styledComponents';
import {PieChart, ContributionGraph} from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import {groupBy} from 'lodash';

const Analytics = ({expenses, contributionData, yearlyExpenses}) => {
    const [heatmapSelectedValue, setHeatmapSelectedValue] = React.useState({});
    const [visible, setVisible] = React.useState(false);

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
    const contributionDataFunc = () => {
        let arr = [];
        let obj = groupBy(
            yearlyExpenses.filter(expense => expense.type === 'Debit'),
            'date',
        );
        Object.keys(obj).forEach(key => {
            let aobj = {
                date: key,
                count: obj[key].reduce(
                    (prev, cur) => Number(prev) + Number(cur.value),
                    0,
                ),
            };
            arr.push(aobj);
        });
        return arr;
    };

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
                {contributionData ? (
                    <>
                        <Title style={{fontSize: 20, color: '#fff'}}>
                            Expenses Heatmap
                        </Title>
                        <ScrollView
                            horizontal
                            style={{
                                width: screenWidth + 50,
                                height: 190,
                                marginTop: -10,
                            }}>
                            <ContributionGraph
                                values={contributionDataFunc()}
                                endDate={
                                    new Date(
                                        new Date(
                                            expenses[0].date,
                                        ).getFullYear(),
                                        11,
                                        31,
                                    )
                                }
                                width={900}
                                height={190}
                                numDays={365}
                                horizontal={true}
                                squareSize={15}
                                chartConfig={{
                                    ...chartConfig,
                                    color: (opacity = 1) =>
                                        `rgba(255, 255, 255, ${
                                            isNaN(opacity) ? 1 : opacity
                                        })`,
                                    labelColor: (opacity = 1) =>
                                        `rgba(255, 255, 255, ${
                                            isNaN(opacity) ? 1 : opacity
                                        })`,
                                }}
                                onDayPress={date => {
                                    setVisible(true);
                                    setHeatmapSelectedValue(date);
                                }}
                                backgroundColor={'white'}
                            />
                        </ScrollView>
                        {visible ? (
                            <View
                                style={{
                                    width: 150,
                                    height: 45,
                                    backgroundColor: '#FFFFFF',
                                    color: '#000',
                                    borderRadius: 5,
                                    marginBottom: 10,
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: 'Karla-Regular',
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}>
                                    Money Spent on{' '}
                                </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: 'Karla-Regular',
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}>
                                    {new Date(
                                        heatmapSelectedValue.date,
                                    ).toDateString()}
                                </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontFamily: 'Karla-Regular',
                                        fontSize: 12,
                                        textAlign: 'center',
                                    }}>
                                    {heatmapSelectedValue.count}
                                </Text>
                            </View>
                        ) : null}
                    </>
                ) : null}
                <View>
                    <Title style={{fontSize: 20, color: '#fff'}}>
                        Transactions
                    </Title>
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
                    <Title style={{fontSize: 20, color: '#fff'}}>
                        Expenses by Way
                    </Title>

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
