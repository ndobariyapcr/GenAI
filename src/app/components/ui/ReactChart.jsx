import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ReactChart = ({ options }) => {
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default ReactChart;
