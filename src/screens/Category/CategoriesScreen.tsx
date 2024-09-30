import React, {  } from 'react';
import { FlatList, ListRenderItemInfo, View, StyleSheet } from 'react-native';
import { CATEGORIES } from '../../data/dummy-data';
import CategoryGridItem from '../../components/Category/CategoryGridItem';
import Category from '../../models/category';
import HeaderComponent from '../../components/UI/HeaderComponnet';

// renderCategoryItem fonksiyonu
const renderCategoryItem = ({ item }: ListRenderItemInfo<Category>) => {
  return (
    <CategoryGridItem
      title={item.title}
      description={item.description}
      color={item.color}
    />
  );
};

// Kampanyalar Ekranı bileşeni
function CategoryScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent title='Uçuş Kampanyaları' />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CategoryScreen;
