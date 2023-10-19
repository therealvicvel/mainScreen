import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 10,
    
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  containerTwo: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  containerAddProd: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 14,

  },
  containerThree: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    minHeight: '100%'
  },
  containerFour: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    minHeight: '100%'
  },
  containerPrueba: {
    backgroundColor: 'green',
    padding: 10,
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
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#FFFFFF",
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#004187',
    margin: 5,
    padding: 10,
    borderRadius: 20,
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
    padding: 10,
  },
  fondoListas: {
    backgroundColor: '#004187',
    padding: 16,
    flexDirection: 'row',
    flexDirection: 'column',
    justifyContent:'center',
    borderRadius: 40,
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
    color: '#FFFFFF',
  },
  infoPedidoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  miniContentText: {
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
  modalTitleInfoAdicional: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FFFFFF',
  },
  modalContent: {
    padding: 16,
    backgroundColor: '#004187',
    borderRadius: 20,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  buttonCerrar: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
  },
  buttonAddProd: {
    backgroundColor: '#004187',
    padding: 10,
    borderRadius: 70,
    marginTop: 20,
    alignSelf: 'center'
  },
  colorTextButtonAddProd: {
    color: "#FFFFFF",
    textAlign: 'center',
  },
  buttonAddCliente: {
    backgroundColor: '#004187',
    padding: 10,
    borderRadius: 70,
    marginTop: 40,
    alignSelf: 'center',
  },
  
  buttonLimpiarCampos: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 70,
    marginTop: 40,
    alignSelf: 'center',
    color: 'white',
  },
  colorTextButtonAddCliente: {
    color: "#FFFFFF",
    textAlign: 'center',
  },
  buttonBuscarProducto: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center'
  },
  colorTextBuscarProducto: {
    color: "#FFFFFF",
    textAlign: 'center',
  
  },

  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#A3C669",
    borderRadius: 70,
  },
  buttonGuardar: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
  },
  colorTextButtonGuardar: {
    color: "#FFFFFF",
    textAlign: 'center'
  },

  colorTextButtonCerrar: {
    color: "#004187",
    textAlign: 'center',
  },

listItem: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#004187',
  borderWidth: 1,
  padding: 10,
  borderRadius: 70,
  fontWeight: 'bold',
},
quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    fontWeight: 'bold',
},
Textimput: {
  marginHorizontal: '20%', marginVertical: '5%', backgroundColor: '#FFFF',
  borderColor: '#A3C669',
  backgroundColor: '#FFFF',
  borderWidth: 1,
  padding: 10,
  flex: 1,
  borderRadius: 10
},
buttonText: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},

picker: {
  color: "#004187",
  borderRadius: 20,
  padding: 8,
  marginTop: 20,
  borderColor: '#004187',
  color: "#004187",
},

itemForBuscarCliente: {
  padding: 10,
  fontSize: 16,
  color: '#004187',
  marginBottom: 20,
  marginLeft: 5,
},
inputFecha: {
  height: 40,
  borderColor: '#004187',
  borderWidth: 1,
  paddingHorizontal: 10,
  borderRadius: 20,
},
invalidInputFecha: {
  borderColor: 'red',
},
categoriaSelector: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 10,
},
label: {
 alignContent: 'center',
 padding: 10,
},
pickerforBuscarProducto: {
  color: "#004187",
  borderRadius: 20,
  padding: 8,
  borderColor: '#004187',
  width: 150,
  backgroundColor: '#FFFFFF',
  alignSelf: 'flex-end',
  marginStart: 80,
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
  borderWidth: 1,
  borderColor: '#004187',
  borderRadius: 20,
  overflow: 'hidden',
},
searchInput: {
  flex: 1,
  padding: 10,
  color: '#004187',
},
searchButton: {
  backgroundColor: '#004187',
  padding: 10,
},
searchButtonText: {
  color: 'white',
},
inputForBuscarCliente: {
  marginTop: 20,
  borderRadius: 20,
  height: 40,
  width: '100%',
  borderColor: '#004187',
  borderWidth: 1,
  paddingHorizontal: 10,
  color: "#004187",
  padding: 10,
  marginBottom: 10,
},
inputForBuscarClienteInd: {
  borderRadius: 20,
  height: 40,
  width: '115%',
  borderColor: '#004187',
  borderWidth: 1,
  color: "#004187",
  padding: 10,
  marginBottom: 5,
  margin: 10,
},
inputForBuscarClienteIndParaPedido: {
  borderRadius: 20,
  height: 40,
  width: '100%',
  borderColor: '#004187',
  borderWidth: 1,
  color: "#004187",
  padding: 10,
  marginBottom: 5,
  marginEnd: 40,
  marginStart: 0.5,
  margin: 10,
},
inputForBuscarProductoInd: {
  borderRadius: 20,
  height: 40,
  width: '115%',
  borderColor: '#004187',
  borderWidth: 1,
  color: "#004187",
  padding: 10,
  marginBottom: 5,
  margin: 10,
},
})
export default styles;
