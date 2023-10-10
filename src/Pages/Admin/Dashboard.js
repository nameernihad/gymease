import StatusCard from '../../Components/admin/Home/DashBoard/StatusCard';
import ChartBar from '../../Components/admin/Home/DashBoard/ChartBar';
import PageVisitsCard from '../../Components/admin/Home/DashBoard/PageVisitCard';
import TrafficCard from '../../Components/admin/Home/DashBoard/TraficCard';
import ChartPie from '../../Components/admin/Home/DashBoard/ChartPie';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PollIcon from '@mui/icons-material/Poll';
import { useEffect } from 'react';

import adminAxios from "../../Axios/adminAxios";
import { useState } from 'react';


export default function Dashboard() {
  const [User, setUser] = useState([])
  const chartBarData = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 150 },
    { name: 'D', value: 300 },
    { name: 'E', value: 100 },
    { name: 'F', value: 125 },
  ];

  const chartPieData =[
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 100 },
  ];

  useEffect(() => {
    adminAxios.get("/getAllUsers").then((res)=>{
      console.log(res.data);
      setUser(res.data.userList)
    })
  }, [])
  

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-5" />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
        <StatusCard
          icon={<TrendingUpIcon />}  
          title="Traffic"
          amount="350,897"
          
        />
        <StatusCard
          icon={<GroupIcon />}
          title="New Users"
          amount="2,356"
          
        />
        <StatusCard
          icon={<AttachMoneyIcon />} 
          title="Sales"
          amount="924"
          
        />
        <StatusCard
          color="white"
          icon={<PollIcon />}  
          title="Performance"
          amount="49.65%"
          
        />
      </div>

        </div>
      </div>

      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5 mb-14">
          <div className="xl:col-span-3 px-4 mb-14">
  
    <ChartPie data={chartPieData} />
 
</div>

            <div className="xl:col-span-2 px-4 mb-14">
              <ChartBar data={chartBarData} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 xl:grid-cols-5">
            <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
              <PageVisitsCard />
            </div>
            <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
              <TrafficCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
