import { StyleSheet } from 'react-native';

  export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F141E',
  },
  card: {
    backgroundColor: '0xFF151C27'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow'
  },
  text: {
    color: 'white',
  },
  button: {
    backgroundColor: '050E1C',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  testoBianco: {
    color: "white",
    marginRight: 10,
  },
  testoGrigio: {
    color: "grey",
    marginRight: 10,
    fontWeight: "500",
  },
  testoPiccolo: {
    fontSize: 14,
    fontWeight: "700",
  },
  testoMedio: {
    fontSize: 18,
    fontWeight: "700",
  },
  testoGrande: {
    fontSize: 25,
    fontWeight: "600",
  },
});
