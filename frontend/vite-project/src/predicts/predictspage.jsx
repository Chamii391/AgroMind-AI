import { Link, Route, Routes } from "react-router-dom";
import Prediction from "./prediction";
import YieldPage from "./yieldpredict";
import Header from "../componenets/header";
import Disease from "./disease";




export default function PredictPage() {
    return (
        <>
        <Header />
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] flex flex-col ">
               
                <Link to ="/predict-page/crop-predict" className="hover:text-gray-400">Crop Predictions</Link>
                <Link to ="/predict-page/yield-predict" className="hover:text-gray-400">Yield Predictions</Link>
                 <Link to ="/predict-page/disease-predict" className="hover:text-gray-400">Disease Predictions</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)]">

                <Routes pathe ="/*">
                    
                    <Route path="/crop-predict" element={<Prediction/>} />
                    <Route path="/yield-predict" element={<YieldPage/>} />
                     <Route path="/disease-predict" element={<Disease/>} />
                  
                </Routes>
            </div>

        </div>
        </>
    );
}