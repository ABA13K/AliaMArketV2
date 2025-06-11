import Image from "next/image";
import Laptopimage from '@/public/ll.jpg';
interface Laptopppros
    { 
        name:string
        logo:string
        color:string

    }

export default function LaptopCard(props:Laptopppros)

{
    console.log(`text-2xl font-bold text-${props.color}`)
    return(
        
        <div className=" rounded-md bg-white-300 mt-10 px-8 py-3 w-full shadow-lg shadow-violet-500 hover:scale-90 duration-300 flex justify-center items-center flex-col" key={props.name}>
            <Image src={Laptopimage} alt="Laptop" className="flex justify-center"/>
            <h1  className={`text-2xl font-bold ${props.color}`    }>{
                
            props.name}</h1>

          </div>
        
    );
}