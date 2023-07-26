import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  containerAddCliente: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  titleContainer: {
    marginBottom: 20,
  },
  miniTitle: {
    backgroundColor: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputForModal: {
    borderRadius: 20,
    height: 40,
    width: '100%',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#FFFFFF"
  },
  input: {
    marginTop: 20,
    borderRadius: 20,
    height: 40,
    width: '100%',
    borderColor: '#004187',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#004187",
  },
  fondoListas: {
    backgroundColor: '#004187',
    padding: 16,
    flexDirection: 'column',
    justifyContent:'center',
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
    marginLeft: 13,
    color: '#FFFFFF',
  },
  buttonRemoveProd: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 55,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FFFFFF',
  },
  modalSubTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FFFFFF',
    marginTop: 20
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#004187',
    borderRadius: 20,
  },
  buttonConfirm: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonCerrar: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonAddProd: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center'
  },
  colorTextButtonAddProd: {
    color: "#FFFFFF",
    textAlign: 'center',
  },
  buttonAddCliente: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center'
  },
  colorTextButtonAddCliente: {
    color: "#FFFFFF",
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#A3C669",
    borderRadius: 5,
  },
  buttonGuardar: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  colorTextButtonGuardar: {
    color: "#FFFFFF",
    textAlign: 'center'
  },
  colorTextButtonCerrar: {
    color: "#004187",
    textAlign: 'center',
  }
})

export default styles;
