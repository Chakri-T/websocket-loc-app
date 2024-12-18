import { Card, Grid2 } from "@mui/material";
import GaugeChart from "react-gauge-chart";
import "../styles/gaugeChart.css";

const GaugeMeter = ({ data }) => {
  const co2Data = data;
  return (
    <Grid2>
      <Card className="gauge-chart" sx={{ width: "100%", borderRadius: 5 }}>
        <GaugeChart
          className="gauge-meter"
          id="co2-gauge"
          nrOfLevels={3}
          percent={co2Data / 2000}
          colors={["#00FF00", "#FFA500", "#FF0000"]}
          needleColor="#a3acee"
          arcWidth={0.2}
        />
      </Card>
    </Grid2>
  );
};

export default GaugeMeter;
