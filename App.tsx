import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [dishes, setDishes] = useState<string[]>([]);
  const [dishDetails, setDishDetails] = useState({ name: '', description: '', course: '', price: '' });

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setDishes(course === 'Starters' ? ['kebabs', 'sandwiches'] : course === 'Main Course' ? ['Burgers', 'Meat '] : ['Malva Pudding', 'Tarts']);
    setCurrentScreen('Menu');
  };

  const handleDishSelect = (dish: string) => {
    setDishDetails({ name: dish, description: '', course: selectedCourse || '', price: '' });
    setCurrentScreen('Details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return (
          <ImageBackground
            source={require('./assets/icon.png')}
            style={styles.backgroundImage}
          >
            <Image source={require('./assets/icon.png')} style={styles.logoImage} />
            <Text style={styles.welcomeText}>WELCOME TO CHRISTOFFEL’S KITCHEN</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => setCurrentScreen('CourseSelection')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      case 'CourseSelection':
        return (
          <ImageBackground
            source={require('./assets/icon.png')}
            style={styles.backgroundImage}
          >
            <Text style={styles.headerText}>Select a Course</Text>
            {['Starters', 'Main Course', 'Desert'].map((course) => (
              <TouchableOpacity key={course} style={styles.courseButton} onPress={() => handleCourseSelect(course)}>
                <Text style={styles.courseText}>{course}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Home')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      case 'Menu':
        return (
          <View style={styles.container}>
            <Text style={styles.headerText}>Select a Dish</Text>
            {dishes.map((dish) => (
              <TouchableOpacity key={dish} style={styles.dishItem} onPress={() => handleDishSelect(dish)}>
                <Text style={styles.dishText}>{dish}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('CourseSelection')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Details':
        return (
          <View style={styles.container}>
            <Image source={require('./assets/icon.png')} style={styles.dishImage} />
            <TextInput
              placeholder="Dish Name"
              value={dishDetails.name}
              onChangeText={(text) => setDishDetails({ ...dishDetails, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={dishDetails.description}
              onChangeText={(text) => setDishDetails({ ...dishDetails, description: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={dishDetails.price}
              onChangeText={(text) => setDishDetails({ ...dishDetails, price: text })}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={() => setCurrentScreen('Confirmation')}>
                <Text style={styles.buttonText}>Add Dish</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setCurrentScreen('Menu')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'Confirmation':
        return (
          <View style={styles.container}>
            <Image source={require('./assets/icon.png')} style={styles.confirmationImage} />
            <Text style={styles.confirmationText}>Dish Added Successfully!</Text>
            <TouchableOpacity style={styles.doneButton} onPress={() => setCurrentScreen('CourseSelection')}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <Text>Unknown Screen</Text>;
    }
  };

  return <View style={styles.appContainer}>{renderScreen()}</View>;
};

// Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  courseButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  courseText: {
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF4500',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dishItem: {
    marginVertical: 10,
  },
  dishText: {
    fontSize: 18,
    color: 'blue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
  },
  dishImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  confirmationImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
  },
  doneButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
  },
});

export default App;

         