
import { IStudio } from "@/type/StudioType";

import ExploredStudiosSectionFitering from "@/components/ExploredStudiosSectionFitering";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getrTokenFromServer";




const StudiosPage = async () => {
  const token = await getTokenFromServer()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  });

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
