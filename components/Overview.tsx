"use client"
import { Tooltip, AreaChart, Area, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface OverviewProps {
  data: any[]
};

export const Overview: React.FC<OverviewProps> = ({
  data
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
          width={700}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotoneX" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
  )
};
