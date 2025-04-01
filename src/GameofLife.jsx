import { useState } from "react";
import manImage from "/src/assets/man.png"; 
import luxuryTravel from "/src/assets/luxury-travel.png";
import newCar from "/src/assets/new-car.png";
import latestGadgets from "/src/assets/latest-gadgets.png";
import weddingHoneymoon from "/src/assets/wedding-honeymoon.webp";
import luxuryApartment from "/src/assets/luxury-apartment.png";
import designerClothes from "/src/assets/designer-clothes.png";
import privateSchool from "/src/assets/private-school.png";
import exoticCar from "/src/assets/exotic-car.png";
import homeRenovation from "/src/assets/home-renovation.png";
import vacationHome from "/src/assets/vacation-home.png";
import worldTour from "/src/assets/world-tour.png";
import golfClub from "/src/assets/golf-club.png";
import luxuryRetirement from "/src/assets/luxury-retirement.png";
import grandkidsCollege from "/src/assets/grandkids-college.png";
import yacht from "/src/assets/yacht.png";

const spendingOptions = {
  20: [
    { name: "Florida Vacation", imgSrc: luxuryTravel, position: { top: "210px", left: "300px" }, size: "400px", zIndex: 1 },
    { name: "Nice Car", imgSrc: newCar, position: { top: "10px", left: "10px" }, size: "250px", zIndex: 1 },
    { name: "Gaming PC", imgSrc: latestGadgets, position: { top: "30px", left: "30px" }, size: "150px", zIndex: 1 }
  ],
  30: [
    { name: "Get Married", imgSrc: weddingHoneymoon, position: { bottom: "0px", left: "550px" }, size: "70px", zIndex: 1 },
    { name: "Luxury Apartment", imgSrc: luxuryApartment, position: { top: "20px", left: "270px" }, size: "180px", zIndex: 1 },
    { name: "Designer Clothes", imgSrc: designerClothes, position: { top: "268px", left: "441px" }, size: "120px", zIndex: 10 }
  ],
  40: [
    { name: "Private School for Kids", imgSrc: privateSchool, position: { top: "30px", left: "500px" }, size: "200px", zIndex: 1 },
    { name: "Exotic Car", imgSrc: exoticCar, position: { top: "30px", left: "500px" }, size: "200px", zIndex: 1 },
    { name: "Home Renovation", imgSrc: homeRenovation, position: { bottom: "180px", left: "330px" }, size: "170px", zIndex: 1 }
  ],
  50: [
    { name: "Vacation Home", imgSrc: vacationHome, position: { top: "4px", right: "50px" }, size: "240px", zIndex: 1 },
    { name: "World Tour", imgSrc: worldTour, position: { top: "45px", right: "55px" }, size: "160px", zIndex: 1 },
    { name: "Golf Club Membership", imgSrc: golfClub, position: { bottom: "10px", left: "470px" }, size: "80px", zIndex: 1 }
  ],
  60: [
    { name: "Classic Car", imgSrc: luxuryRetirement, position: { bottom: "70px", right: "30px" }, size: "200px", zIndex: 1 },
    { name: "Helping Grandkids with College", imgSrc: grandkidsCollege, position: { bottom: "70px", right: "30px" }, size: "200px", zIndex: 1 },
    { name: "Yacht", imgSrc: yacht, position: { bottom: "50px", left: "265px" }, size: "200px", zIndex: 1 }
  ]
};

const calculateDecadeGrowth = (principal, decades) => {
  return principal * Math.pow(1.1, decades * 10);
};

export default function GameOfLife() {
  const [round, setRound] = useState(0);
  const [wealth, setWealth] = useState(10_000);
  const [savings, setSavings] = useState(0); 
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [clickCount, setClickCount] = useState(0); 
  const [investments, setInvestments] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  const rounds = [20, 30, 40, 50, 60];

  const handleChoice = (choice, item) => {
    if (clickCount >= 5) return; 

    let newInvestments = [...investments];
    let newSavings = savings;
    let newPurchases = [...purchasedItems];
    
    if (choice === "invest") {
      newInvestments.push({
        decade: round,
        amount: 10_000 
      });
    } else if (choice === "save") {
      newSavings += 10_000; 
    } else if (choice === "spend") {
      newPurchases.push(item);
    }
    
    let newWealth = 0;
    
    newInvestments.forEach(investment => {
      const decadesGrowing = round + 1 - investment.decade;
      newWealth += calculateDecadeGrowth(investment.amount, decadesGrowing);
    });
    
    newWealth += newSavings;
    newWealth = Math.round(newWealth);
    
    setWealth(newWealth); 
    setSavings(newSavings);
    setPurchasedItems(newPurchases);
    setInvestments(newInvestments);
    setClickCount(clickCount + 1);
    
    if (round < 4) {
      setRound(round + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setRound(0);
    setWealth(10_000);
    setSavings(0);
    setPurchasedItems([]);
    setClickCount(0);
    setInvestments([]);
    setGameEnded(false);
  };
  
  return (
    <div className="game-container">
      {clickCount === 0 && (
        <>
          <h1>The Game Of Life</h1>
          <h4>You will receive $10,000 per decade in extra money. Decide how to spend your money each decade until age 70</h4>
        </>
      )}

      {!gameEnded ? (
        <div className="card">
          <h2>Total Wealth: ${wealth.toLocaleString()}</h2>
          <h2>Age {rounds[round]}</h2>
          <p>You have $10,000 to allocate every decade</p>
          <div className="choices">
            <button onClick={() => handleChoice("invest")} disabled={clickCount >= 5}>
              Invest
            </button>
            <button onClick={() => handleChoice("save")} disabled={clickCount >= 5}>
              Save
            </button>
            {spendingOptions[rounds[round]].map((option, index) => (
              <button key={index} onClick={() => handleChoice("spend", option)} disabled={clickCount >= 5}>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card end-card">
          <h2>Game Over - Life Complete!</h2>
          <p>You accumulated <strong>${wealth.toLocaleString()}</strong> by age 70</p>
          <p>Investments: ${Math.round(wealth - savings).toLocaleString()}</p>
          <p>Savings: ${savings.toLocaleString()}</p>
          <p>Purchases: {purchasedItems.length > 0 ? 
            purchasedItems.map(item => item.name).join(", ") : 
            "None"}</p>
          <p>Percentage of total possible wealth: {Math.round((wealth / 1_894_208) * 100)}%</p>
          <button onClick={resetGame} >Restart</button>
        </div>
      )}

      <div className="character-container">
        <img 
          src={manImage} 
          alt="Player Character" 
          className="character" 
          style={{ 
            zIndex: 2, 
            position: 'absolute', 
            bottom: '0px', 
            left: '50%', 
            transform: 'translateX(-50%)'
          }} 
        />

        {purchasedItems.map((item, index) => (
          <img 
            key={index} 
            src={item.imgSrc} 
            alt={item.name} 
            className="purchase" 
            style={{ 
              ...item.position, 
              width: item.size, 
              zIndex: item.zIndex || 1 
            }} 
          />
        ))}
      </div>
    </div>
  );
}
