import React, { useState } from "react";
import Header from "./UI/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/Results/ResultsTable";
import { Investment } from "./models/investment";

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<Investment>();

  const calculateHandler = (userInput: Investment) => {
    setUserInput(userInput);
  };

  const yearlyData = []; // per-year results
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />

      {!userInput && <p style={{textAlign: "center"}}>No investment calculated yet.</p>}
      {userInput && (
        <ResultsTable
          data={yearlyData}
          initialInvestment={userInput["current-savings"]}
        />
      )}
    </div>
  );
};

export default App;
