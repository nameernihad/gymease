import StatusCard from '../../Components/admin/Home/DashBoard/StatusCard';
import ChartBar from '../../Components/admin/Home/DashBoard/ChartBar';
import ChartPie from '../../Components/admin/Home/DashBoard/ChartPie';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PollIcon from '@mui/icons-material/Poll';
import { useEffect } from 'react';
import trainerAxios from "../../Axios/trainerAxios";
import { useState } from 'react';
import PageVisitsCard from '../../Components/Trainer/Home/PageVisitCard';


export default function Dashboard() {
  const [subData, setsubData] = useState([])
  const [totalAmount, setTotalAmount] = useState([])
  const [duration, setDuration] = useState([])

  useEffect(() => {
    try {
      trainerAxios.get("/getSubscription").then((res) => {
        console.log(res.data.subscription)
        setsubData(res.data.subscription)
      })

      trainerAxios.get("/totalSubAmount").then((res) => {
        console.log(res.data.calculatedAmount)
        setTotalAmount(res.data.calculatedAmount)
      })

      trainerAxios.get("/durationCount").then((res) => {
        console.log(res.data.collectedData)
        setDuration(res.data.collectedData)
      })
    } catch (error) {
      console.log(error.message)
    }


  }, [])
  const chartBarData = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 150 },
    { name: 'D', value: 300 },
  ];

  const chartPieData = [
    { name: "OneMonth", value: duration.oneMonth },
    { name: "SixMonth", value: duration.sixMonths },
    { name: "OneYear", value: duration.oneYear },
  ];

  return (
    <>
      <div className="bg-light-blue-500 px-3 mt-16 md:px-8 h-5" />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
            <StatusCard
              icon={<TrendingUpIcon />}
              title="Total Sale"
              amount={totalAmount}
            />
            <StatusCard
              icon={<GroupIcon />}
              title="Subscribed User"
              amount={subData.length}


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
          <div className="grid grid-cols-1">
            <div className="xl:col-start-1 xl:col-end-2 px-4 mb-14">
              <PageVisitsCard subData={subData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
