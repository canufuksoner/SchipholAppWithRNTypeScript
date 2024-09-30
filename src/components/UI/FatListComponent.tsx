import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

interface FlatListComponentProps {
    loading: boolean;
    error: string | null | undefined;
    data: any[];
    renderItem: ({ item }: any) => JSX.Element;
    keyExtractor: (item: any) => string;
}

const FlatListComponent: React.FC<FlatListComponentProps> = ({
    loading,
    error,
    data,
    renderItem,
    keyExtractor
}) => {
    if (loading) {
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={<Text>{"Kayıt Bulunamadı!"}</Text>}
        />
    );
};

const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default FlatListComponent;
