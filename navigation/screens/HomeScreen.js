import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, TouchableOpacity} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import styles from '../../utilidades/styles';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://viramsoftapi.onrender.com/ventas_por_semana');
        if (!response.ok) {
          throw new Error('La solicitud no se completó correctamente');
        }

        const data = await response.json();

        const updatedChartData = {
          labels: data.labels,
          datasets: [
            {
              data: data.data,
            },
          ],
        };
        setChartData(updatedChartData);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        setChartData(null);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {

    backgroundGradientFrom: 'lightgray',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `#004187`,
    fontSize: 20,
  };

  // Ajusta el ancho y el alto del gráfico según tus preferencias
  const chartWidth = 400; // Por ejemplo, el 90% del ancho de la vista
  const chartHeight = 250; // Altura fija+

  return (
    <View>
      <View style={{ height:'25%', alignItems:'center',borderRadius:10, borderColor:'#004187',color:'#8DD8F9'}}>
        <Text> GANACIAS:(AQUI VA UN NUMERO)</Text>
      </View>
      <View style={{padding:20, flexDirection:'row' }}>
        <TouchableOpacity style={styles.buttonAddProd}>
          <Text style={{color: 'white'}}>Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAddProd}>
          <Text style={{color: 'white'}}>3 Semana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAddProd}>
          <Text style={{color: 'white'}}> 1 Mes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAddProd}>
          <Text style={{color: 'white'}}>3 Meses</Text>
        </TouchableOpacity>
        
      </View>
      <View >
        {chartData ? (
        <BarChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={20}
        />
      ) : (
        <Text>Error al cargar la tabla</Text>
      )}
        </View>
    </View>
  );
};

export default BarChartComponent;
