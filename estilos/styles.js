import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDFFE8',
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  miniTitle: {
    backgroundColor: '#EDFFE8',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 40,
  },
  input: {
    borderRadius: 20,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonAdd: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 55,
  },
  buttonList: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 55,
  },
  fondoListas: {
    backgroundColor: '#D2FDC5',
    padding: 16,
    borderRadius: 60,
    marginBottom: 12,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemSeparador: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  clienteText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 13,
  },
  fondito:{
    backgroundColor: '#EDFFE8'
  },
  buttonAddProd: {
    alignSelf: 'center',
    fontSize: 55,
  },
  buttonRemoveProd: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 55,
  },
})

export default styles;