import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EventCategory } from '@/types/event';

interface Props {
  categories: EventCategory[];
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const handleSelect = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    onSelectCategory(newCategory);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedCategory === null && styles.selectedItem,
          ]}
          onPress={() => handleSelect('')}
        >
          <View style={[
            styles.iconContainer,
            selectedCategory === null ? styles.selectedIcon : null
          ]}>
            <MaterialIcons
              name="all-inclusive"
              size={24}
              color={selectedCategory === null ? '#fff' : '#666'}
            />
          </View>
          <Text style={[
            styles.categoryText,
            selectedCategory === null ? styles.selectedText : null
          ]}>
            Все
          </Text>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.selectedItem,
            ]}
            onPress={() => handleSelect(category.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedCategory === category.id ? styles.selectedIcon : null
            ]}>
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={selectedCategory === category.id ? '#fff' : category.color}
              />
            </View>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id ? styles.selectedText : null
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedIcon: {
    backgroundColor: '#4A6FA5',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  selectedItem: {
    // Этот стиль применяется к TouchableOpacity, оставляем пустым или добавляем нужные стили
  },
  selectedText: {
    color: '#4A6FA5',
    fontWeight: '600',
  },
});

export default CategoryFilter;