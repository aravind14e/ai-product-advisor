import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';

const ProductCard = ({ product, onPress }) => {
  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Very High': return '#4CAF50';
      case 'High': return '#8BC34A';
      case 'Medium': return '#FFC107';
      case 'Low': return '#FF5722';
      default: return '#9E9E9E';
    }
  };

  const getPortabilityColor = (portability) => {
    switch (portability) {
      case 'Excellent': return '#4CAF50';
      case 'Good': return '#8BC34A';
      case 'Fair': return '#FFC107';
      case 'Poor': return '#FF5722';
      default: return '#9E9E9E';
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content style={styles.content}>
        <Title style={styles.title}>{product.name}</Title>
        <Paragraph style={styles.price}>${product.price}</Paragraph>
        <Paragraph style={styles.description} numberOfLines={2}>
          {product.description}
        </Paragraph>
        
        <View style={styles.chipContainer}>
          <Chip 
            style={[styles.chip, { backgroundColor: getPerformanceColor(product.performance) }]}
            textStyle={styles.chipText}
          >
            {product.performance} Performance
          </Chip>
          <Chip 
            style={[styles.chip, { backgroundColor: getPortabilityColor(product.portability) }]}
            textStyle={styles.chipText}
          >
            {product.portability} Portability
          </Chip>
        </View>

        <View style={styles.specsContainer}>
          <View style={styles.spec}>
            <Paragraph style={styles.specLabel}>Weight:</Paragraph>
            <Paragraph style={styles.specValue}>{product.weight}</Paragraph>
          </View>
          <View style={styles.spec}>
            <Paragraph style={styles.specLabel}>Battery:</Paragraph>
            <Paragraph style={styles.specValue}>{product.batteryLife}</Paragraph>
          </View>
        </View>

        <View style={styles.bestForContainer}>
          <Paragraph style={styles.bestForLabel}>Best for:</Paragraph>
          <View style={styles.bestForChips}>
            {product.bestFor.slice(0, 3).map((useCase, index) => (
              <Chip key={index} style={styles.bestForChip} textStyle={styles.bestForChipText}>
                {useCase}
              </Chip>
            ))}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#667eea',
  },
  content: {
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: 'white',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  chipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  specsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginRight: 4,
  },
  specValue: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bestForContainer: {
    marginTop: 8,
  },
  bestForLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 8,
  },
  bestForChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bestForChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 24,
  },
  bestForChipText: {
    color: 'white',
    fontSize: 10,
  },
});

export default ProductCard;
