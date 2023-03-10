import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import stylesFind from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

function Find(props) {
    const [search, setSearch] = useState('');

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = props.masterDataSource.filter(function (item) {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const tourDestination = item?.tourDestination ? item?.tourDestination.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                const tour = item?.tour;
                const customer = item?.customer;
                if (tour != undefined && customer != undefined) {
                    return (
                        tour.name.toUpperCase().indexOf(textData) > -1 ||
                        tour.tourDestination.toUpperCase().indexOf(textData) > -1 ||
                        customer.email.toUpperCase().indexOf(textData) > -1 ||
                        customer.phoneNumber.toUpperCase().indexOf(textData) > -1 ||
                        customer.name.toUpperCase().indexOf(textData) > -1
                    );
                }

                return itemData.indexOf(textData) > -1 || tourDestination.indexOf(textData) > -1;
            });
            props.setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            props.setFilteredDataSource(props.masterDataSource);
            setSearch(text);
        }
    };

    return (
        <View style={stylesFind.view}>
            <View style={stylesFind.first_component}>
                <Icon name="search" size={25} color="#021A5A" />
                <TextInput
                    style={stylesFind.input}
                    placeholder="Bạn đang muốn tìm gì ..."
                    onChangeText={(text) => searchFilterFunction(text)}
                    autoFocus={props.isFind}
                />
            </View>
            {/* <Icon name="filter" size={25} color="#021A5A" /> */}
        </View>
    );
}

export default Find;
