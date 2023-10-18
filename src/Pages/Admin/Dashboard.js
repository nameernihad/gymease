import StatusCard from '../../Components/admin/Home/DashBoard/StatusCard';
import ChartBar from '../../Components/admin/Home/DashBoard/ChartBar';
import PageVisitsCard from '../../Components/admin/Home/DashBoard/PageVisitCard';
import TrafficCard from '../../Components/admin/Home/DashBoard/TraficCard';
import ChartPie from '../../Components/admin/Home/DashBoard/ChartPie';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PollIcon from '@mui/icons-material/Poll';
import { useEffect } from 'react';

import adminAxios from "../../Axios/adminAxios";
import { useState } from 'react';


export default function Dashboard() {
  const [User, setUser] = useState([])
  const [Payment, setPayment] = useState()
  const [Trainer, setTrainer] = useState([])
  const [Workout, setWorkout] = useState([])
  const [SubData, setSubData] = useState([])


  const chartBarData = [
    { name: "Users", value: User.length },
    { name: "Trainers", value: Trainer.length },
    { name: "Workout", value: Workout.length },
  ];

  const chartPieData =[
    { name: "Users", value: User.length },
    { name: "Trainers", value: Trainer.length },
    { name: "Workout", value: Workout.length },
  ];

  useEffect(() => {
    try {
       adminAxios.get("/getAllUsers").then((res)=>{
      setUser(res.data.userList)
    })

   
    adminAxios.get("/getAllTrainer").then((res)=>{
      setTrainer(res.data.Trainerdetails)
    })
    adminAxios.get("/getAllWorkouts").then((res)=>{
      setWorkout(res.data.workout)
    })
    adminAxios.get("/totalPayments").then((res)=>{
      setPayment(res.data.totalAmount)
    })
    adminAxios.get("/getAllSubscriptions").then((res)=>{
      console.log(res.data.subData);
      setSubData(res.data.subData)
    })
    } catch (error) {
      console.log(error.message)
    }
   

  }, [])


  

  return (
    <>
      <div className="bg-light-blue-500 px-3 md:px-8 h-5" />
      <div className="px-3 md:px-8">
        <div className="container mx-auto max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
        <StatusCard
          icon={<AssignmentIndIcon />}  
          title="Trainer"
          amount={Trainer.length}
          
        />
        <StatusCard
          icon={<GroupIcon />}
          title="New Users"
          amount={User.length}
          
        />
        <StatusCard
          icon={<AttachMoneyIcon />} 
          title="Sales"
          amount={Payment}
          
        />
        <StatusCard
          color="white"
          icon={<FitnessCenterIcon />}  
          title="Workout"
          amount={Workout.length}
          
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
        <PageVisitsCard SubData={SubData} />
      </div>
    </div>
  </div>
</div>

    </>
  );
}
