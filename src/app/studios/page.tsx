
import { IStudio } from "@/type/StudioType";

import ExploredStudiosSectionFitering from "@/components/ExploredStudiosSectionFitering";
import { notFound } from "next/navigation";



const StudiosPage = async () => {
  const res = await fetch("http://localhost:8000/studios");

  if (!res.ok) {
notFound()
  }

  const studios:IStudio[] = await res.json();
  const filter = studios.filter(studio=>studio.category==='Workshop')
  console.log('filter by:',filter);

 
  return (

   <div>

     <ExploredStudiosSectionFitering studios={studios}/>
   </div>
  );
};

export default StudiosPage;
