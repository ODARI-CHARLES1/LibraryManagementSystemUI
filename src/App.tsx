import Dashboard from "./Pages/Dashboard";
if (localStorage.getItem("sideActive")) { ;
} else {
  const sideActiveInitial: number = 0;
  localStorage.setItem("sideActive", JSON.stringify(sideActiveInitial));
}
if(localStorage.getItem("Period")){
  ;
}
else{
  localStorage.setItem("Period","select Period")
}
const App = () => {
  return (
    <div className="bg-gray-100">
      <Dashboard/>
    </div>
  );
};

export default App;
