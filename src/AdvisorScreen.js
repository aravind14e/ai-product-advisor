import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  TextInput,
  Button,
  Title,
  Paragraph,
  Card,
  Chip,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PRODUCT_CATALOG } from './catalog';
import ProductCard from './components/ProductCard';

const AdvisorScreen = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Mock AI API call - In a real app, this would call Google Gemini or similar
  const callAI = async (userQuery) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Analyze user query to provide relevant recommendations
    const query = userQuery.toLowerCase();
    let recommendations = [];
    let explanation = "";
    
    if (query.includes('travel') || query.includes('lightweight') || query.includes('portable')) {
      if (query.includes('budget') || query.includes('cheap') || query.includes('affordable')) {
        recommendations = [
          { productId: 7, reason: "Very lightweight at 2.6 lbs with good battery life (11 hours) and affordable price point. Perfect for budget-conscious travelers.", score: 92 },
          { productId: 19, reason: "Affordable option with good portability (3.6 lbs) and decent battery life (9 hours). Great value for money.", score: 85 },
          { productId: 14, reason: "Ultra-thin design at 2.6 lbs with excellent portability and premium features at a reasonable price.", score: 83 }
        ];
        explanation = "For budget-conscious travelers, I've selected affordable laptops that prioritize portability and battery life. The Acer Swift 3 offers the best combination of weight and value.";
      } else {
        recommendations = [
          { productId: 1, reason: "Perfect for travel due to its lightweight design (2.7 lbs) and excellent battery life (18 hours). The M2 chip provides great performance.", score: 95 },
          { productId: 20, reason: "Latest MacBook Air with M3 chip, excellent portability (2.7 lbs) and 18-hour battery life. Perfect for professionals on the go.", score: 93 },
          { productId: 3, reason: "Excellent portability (2.5 lbs) with long battery life (15 hours). Premium build quality perfect for business travel.", score: 90 }
        ];
        explanation = "For travel and portability, I've selected laptops that excel in both weight and battery life. The MacBook Air models lead with the best combination of portability and performance.";
      }
    } else if (query.includes('gaming') || query.includes('game')) {
      if (query.includes('budget') || query.includes('affordable')) {
        recommendations = [
          { productId: 16, reason: "Affordable gaming laptop with RTX 3060 graphics and 144Hz display. Great performance for gaming on a budget.", score: 88 },
          { productId: 4, reason: "Powerful gaming laptop with AMD Ryzen 9 and RTX 4060. Excellent performance for gaming and content creation.", score: 85 },
          { productId: 10, reason: "Sleek gaming laptop with good performance and portability. Great for gamers who need to travel.", score: 82 }
        ];
        explanation = "For budget gaming, I've selected laptops that offer excellent gaming performance without breaking the bank. The Acer Predator Helios 300 provides the best value for gaming.";
      } else {
        recommendations = [
          { productId: 8, reason: "Premium gaming laptop with RTX 4070 graphics and 240Hz display. Ultimate gaming performance with RGB lighting.", score: 95 },
          { productId: 18, reason: "Ultra-thin gaming laptop with RTX 4060. Premium build quality perfect for portable gaming.", score: 92 },
          { productId: 4, reason: "Powerful gaming laptop with AMD Ryzen 9 processor. Excellent for both gaming and content creation.", score: 90 }
        ];
        explanation = "For premium gaming, I've selected high-end laptops with powerful graphics cards and fast refresh rates. The Razer Blade 15 offers the ultimate gaming experience.";
      }
    } else if (query.includes('professional') || query.includes('work') || query.includes('business')) {
      recommendations = [
        { productId: 11, reason: "Professional-grade laptop with M3 Pro chip for demanding creative and development work. Excellent performance and battery life.", score: 95 },
        { productId: 12, reason: "Mobile workstation with professional-grade graphics for CAD and 3D work. Perfect for engineers and architects.", score: 93 },
        { productId: 3, reason: "Business-focused laptop with exceptional durability and security features. Ideal for corporate environments.", score: 90 }
      ];
      explanation = "For professional work, I've selected laptops that offer high performance, reliability, and security features. The MacBook Pro 14 M3 leads with exceptional performance for creative and development work.";
         } else if (query.includes('student') || query.includes('college') || query.includes('university')) {
       if (query.includes('budget') || query.includes('affordable') || query.includes('cheap')) {
         recommendations = [
           { productId: 21, reason: "Excellent budget Chromebook with 13-hour battery life and touch screen. Perfect for online learning and note-taking.", score: 95 },
           { productId: 22, reason: "Great value laptop with 11-hour battery life and good performance. Ideal for students on a tight budget.", score: 93 },
           { productId: 23, reason: "Ultra-affordable Chromebook with 12-hour battery life. Perfect for basic student needs and web browsing.", score: 90 }
         ];
         explanation = "For budget-conscious students, I've selected affordable laptops with excellent battery life. The Lenovo Chromebook Flex 5 offers the best combination of features, battery life, and value for student needs.";
       } else {
         recommendations = [
           { productId: 7, reason: "Lightweight and affordable laptop with good battery life. Perfect for students who need portability and value.", score: 92 },
           { productId: 20, reason: "Latest MacBook Air with excellent battery life and performance. Great for students in the Apple ecosystem.", score: 90 },
           { productId: 25, reason: "Lightweight student laptop with 12-hour battery life and modern design. Great for portable computing and note-taking.", score: 88 }
         ];
         explanation = "For students, I've selected laptops that offer good performance, portability, and value. The Acer Swift 3 provides the best combination of features for student needs.";
              }
     } else if (query.includes('study') || query.includes('battery') || query.includes('long battery')) {
       if (query.includes('budget') || query.includes('affordable') || query.includes('cheap')) {
         recommendations = [
           { productId: 21, reason: "Perfect for studying with 13-hour battery life and touch screen for note-taking. Very affordable at $399.", score: 96 },
           { productId: 22, reason: "Excellent study laptop with 11-hour battery life and good performance. Great value for budget-conscious students.", score: 94 },
           { productId: 25, reason: "Lightweight study laptop with 12-hour battery life. Perfect for long study sessions and portable computing.", score: 92 }
         ];
         explanation = "For budget-friendly study laptops with long battery life, I've selected affordable options that excel in battery performance. The Lenovo Chromebook Flex 5 leads with 13-hour battery life and touch screen functionality perfect for note-taking.";
       } else {
         recommendations = [
           { productId: 1, reason: "Excellent for studying with 18-hour battery life and lightweight design. Perfect for long study sessions.", score: 95 },
           { productId: 20, reason: "Latest MacBook Air with 18-hour battery life. Ideal for students who need all-day battery life for studying.", score: 94 },
           { productId: 3, reason: "Business-grade laptop with 15-hour battery life. Great for serious students who need reliability.", score: 92 }
         ];
         explanation = "For study laptops with long battery life, I've selected options that excel in battery performance. The MacBook Air models lead with 18-hour battery life, perfect for extended study sessions.";
       }
     } else {
       // Default recommendations for general use
      recommendations = [
        { productId: 1, reason: "Excellent all-around laptop with great performance, portability, and battery life. Perfect for most users.", score: 90 },
        { productId: 2, reason: "Premium Windows laptop with excellent build quality and performance. Great for Windows users.", score: 88 },
        { productId: 20, reason: "Latest MacBook Air with M3 chip offers excellent performance and battery life. Perfect for Apple ecosystem users.", score: 87 }
      ];
      explanation = "For general use, I've selected versatile laptops that offer good performance, portability, and battery life. These laptops work well for most everyday tasks and use cases.";
    }
    
    return { recommendations, explanation };
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter your requirements');
      return;
    }

    setLoading(true);
    try {
      const response = await callAI(query);
      
      // Get the actual product objects from the catalog
      const recommendedProducts = response.recommendations.map(rec => {
        const product = PRODUCT_CATALOG.find(p => p.id === rec.productId);
        return { ...product, reason: rec.reason, score: rec.score };
      });

      setRecommendations(recommendedProducts);
      setAiResponse(response.explanation);
    } catch (error) {
      Alert.alert('Error', 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product) => {
    Alert.alert(
      product.name,
      `Price: $${product.price}\n\n${product.description}\n\nFeatures:\n${product.features.join('\n')}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>AI Product Advisor</Title>
        <Paragraph style={styles.headerSubtitle}>
          Describe your needs and get personalized laptop recommendations
        </Paragraph>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.inputCard}>
          <Card.Content>
            <Title style={styles.inputTitle}>What are you looking for?</Title>
            <Paragraph style={styles.inputSubtitle}>
              Describe your needs in plain English (e.g., "I need a lightweight laptop for travel with long battery life")
            </Paragraph>
            
            <TextInput
              mode="outlined"
              label="Your requirements"
              value={query}
              onChangeText={setQuery}
              multiline
              numberOfLines={3}
              style={styles.textInput}
              placeholder="Tell us about your needs..."
            />
            
            <Button
              mode="contained"
              onPress={handleSearch}
              loading={loading}
              disabled={loading}
              style={styles.searchButton}
              contentStyle={styles.searchButtonContent}
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </Button>
          </Card.Content>
        </Card>

        {loading && (
          <Card style={styles.loadingCard}>
            <Card.Content style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#667eea" />
              <Paragraph style={styles.loadingText}>
                Analyzing your requirements and finding the best matches...
              </Paragraph>
            </Card.Content>
          </Card>
        )}

        {aiResponse && !loading && (
          <Card style={styles.explanationCard}>
            <Card.Content>
              <Title style={styles.explanationTitle}>AI Analysis</Title>
              <Paragraph style={styles.explanationText}>{aiResponse}</Paragraph>
            </Card.Content>
          </Card>
        )}

        {recommendations.length > 0 && !loading && (
          <View style={styles.recommendationsContainer}>
            <Title style={styles.recommendationsTitle}>
              Recommended Products ({recommendations.length})
            </Title>
            
            {recommendations.map((product, index) => (
              <View key={product.id} style={styles.recommendationItem}>
                <View style={styles.scoreContainer}>
                  <Chip style={styles.scoreChip}>
                    {product.score}% Match
                  </Chip>
                </View>
                
                <ProductCard 
                  product={product} 
                  onPress={() => handleProductPress(product)}
                />
                
                <Card style={styles.reasonCard}>
                  <Card.Content>
                    <Title style={styles.reasonTitle}>Why this product?</Title>
                    <Paragraph style={styles.reasonText}>{product.reason}</Paragraph>
                  </Card.Content>
                </Card>
                
                {index < recommendations.length - 1 && <Divider style={styles.divider} />}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#667eea',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  inputCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  inputSubtitle: {
    color: '#666',
    marginBottom: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  searchButton: {
    borderRadius: 8,
    marginTop: 8,
  },
  searchButtonContent: {
    paddingVertical: 8,
  },
  loadingCard: {
    margin: 16,
    borderRadius: 12,
  },
  loadingContent: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  explanationCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#e3f2fd',
  },
  explanationTitle: {
    fontSize: 18,
    color: '#1976d2',
    marginBottom: 8,
  },
  explanationText: {
    color: '#424242',
    lineHeight: 20,
  },
  recommendationsContainer: {
    margin: 16,
    marginTop: 8,
  },
  recommendationsTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
  },
  recommendationItem: {
    marginBottom: 24,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  scoreChip: {
    backgroundColor: '#4CAF50',
  },
  reasonCard: {
    marginTop: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  reasonTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  reasonText: {
    color: '#666',
    lineHeight: 18,
  },
  divider: {
    marginTop: 24,
    marginBottom: 8,
  },
});

export default AdvisorScreen;
