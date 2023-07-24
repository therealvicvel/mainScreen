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
    marginBottom: 180,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDFFE8',
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#EDFFE8',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFF',
  },
  button: {
    backgroundColor: '#F65F50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
})

export default styles;
